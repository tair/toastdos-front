"use strict";

import AuthModule from 'modules/authentication';
import { getSubmission, submitSubmission } from 'lib/api';
import * as validation from 'lib/validation';
import * as actions from './actionTypes';
import * as pubActions from 'domain/publication/actions';
import * as geneActions from 'domain/gene/actions';
import * as annotationActions from 'domain/annotation/actions';
import {
    annotationFormats,
    annotationType,
    annotationTypeData,
} from 'domain/annotation/constants';
import {
    submissionSelector,
    submissionBodySelector,
    publicationLocalId,
    annotationOrder,
    geneOrder,
} from './selectors';

export function addGene(geneLocalId, geneData) {
    return (dispatch, getState) => {
        // Create the new gene
        let newGene = geneActions.addNew(geneLocalId);
        dispatch(newGene);

        if (geneData) {
            dispatch(geneActions.updateGeneData(newGene.localId, geneData));
        }
        // Link the newly created gene to the submission
        dispatch(addToGeneOrder(newGene.localId))
    };
}

export function removeGene(geneLocalId) {
    return (dispatch, getState) => {
        // Delete the gene
        dispatch(geneActions.removeGene(geneLocalId));

        // Remove the link to the gene
        dispatch(removeFromGeneOrder(geneLocalId))
    };
}

export function addToGeneOrder(geneLocalId) {
    return {
        type: actions.ADD_GENE,
        geneLocalId,
    };
}

export function removeFromGeneOrder(geneLocalId) {
    return {
        type: actions.REMOVE_GENE,
        geneLocalId,
    };
}

export function addAnnotation(annotationLocalId, annotationType, annotationData) {
    return (dispatch, getState) => {
        // Create the new annotation
        let newAnnotation = annotationActions.addNew(annotationLocalId, annotationType)(dispatch, getState);

        if (annotationData) {
            dispatch(annotationActions.updateAnnotationData(newAnnotation.localId, annotationData));
        }

        // Link the newly created annotation to the submission
        dispatch(addToAnnotationOrder(newAnnotation.localId))
    };
}

export function removeAnnotation(annotationLocalId) {
    return (dispatch, getState) => {
        // Delete the annotation
        dispatch(annotationActions.remove(annotationLocalId));

        // Remove the link to the annotation
        dispatch(removeFromAnnotationOrder(annotationLocalId))
    };
}

export function addToAnnotationOrder(annotationLocalId) {
    return {
        type: actions.ADD_ANNOTATION,
        annotationLocalId,
    };
}

export function removeFromAnnotationOrder(annotationLocalId) {
    return {
        type: actions.REMOVE_ANNOTATION,
        annotationLocalId,
    };
}

export function setPublication(publicationLocalId) {
    return {
        type: actions.SET_PUBLICATION,
        publicationLocalId,
    };
}

function submitSuccess(response) {
    return {
        type: actions.SUBMIT_SUCCESS,
        data: response
    };
}

function submitFail(error) {
    return {
        type: actions.SUBMIT_FAIL,
        error
    };
}

export function attemptSubmit() {
    return (dispatch, getState) => {

        const currState = getState();

        const submissionBody = submissionBodySelector(currState);

        dispatch({
            type: actions.ATTEMPT_SUBMIT
        });

        const token = AuthModule.selectors.rawJwtSelector(currState);
        submitSubmission(submissionBody, token, (err, data) => {
            if(err) {
                return dispatch(submitFail(err));
            }
            return dispatch(submitSuccess(data));
        });
    };
}

export function resetSubmission() {
    return (dispatch, getState) => {
        const currState = getState();
        const submission = submissionSelector(currState);

        // Delete the publication
        dispatch(pubActions.remove(publicationLocalId(currState)));

        // Delete the annotations
        dispatch(annotationActions.removeAnnotations(annotationOrder(currState)));

        // Delete the genes
        dispatch(geneActions.removeGenes(geneOrder(currState)));

        // Reset the submission
        return dispatch({
            type: actions.RESET_SUBMISSION
        });
    };
}

export function preview() {
    return {
        type: actions.PREVIEW,
    };
}

export function edit() {
    return {
        type: actions.EDIT,
    };
}

export function loadSubmission(submission) {
    return (dispatch, getState) => {
        let loaded = dispatch({
            type: actions.LOAD_SUBMISSION,
            submission,
        });

        // Reset the curation submission
        dispatch(resetSubmission());

        // Create publication for submission
        let newPub = pubActions.addNew();
        dispatch(newPub);

        // Link the newly created publication to the submission
        dispatch(setPublication(newPub.localId))

        // Set the publication id value
        dispatch(pubActions.update(newPub.localId, submission.publicationId))

        let locusMap = {};

        // Create each gene and record the localId used in locusMap
        for (let gene of submission.genes) {
            let id = "remote_gene_" + gene.id;
            locusMap[gene.locusName] = id;

            dispatch(addGene(id, {
                finalizedLocusName: gene.locusName,
                finalizedGeneSymbol: gene.geneSymbol || "",
                finalizedFullName: gene.fullName || "",
                ...validation.getValid(),
            }));
        }

        // Create each annotation
        for (let annotation of submission.annotations) {
            let id = "remote_annotation_" + annotation.id;

            let annotationData;
            switch(annotationTypeData[annotation.type].format) {
                case annotationFormats.GENE_TERM:
                    annotationData = {
                        geneLocalId: locusMap[annotation.data.locusName],
                        keywordName: annotation.data.keyword.name,
                        keywordId: annotation.data.keyword.id,
                        keywordExternalId: annotation.data.keyword.externalId || "",
                        methodName: annotation.data.method.name,
                        methodId: annotation.data.method.id,
                        methodExternalId: annotation.data.method.externalId || "",
                        methodEvidenceCode: annotation.data.method.evidenceCode || null,
                        evidenceWithOrder: [],
                    };
                    break;
                case annotationFormats.GENE_GENE:
                    annotationData = {
                        gene1LocalId: locusMap[annotation.data.locusName],
                        gene2LocalId: locusMap[annotation.data.locusName2],
                        methodName: annotation.data.method.name,
                        methodId: annotation.data.method.id,
                        methodExternalId: annotation.data.method.externalId || "",
                        methodEvidenceCode: annotation.data.method.evidenceCode || null
                    };
                    break;
                case annotationFormats.COMMENT:
                    annotationData = {
                        geneLocalId: locusMap[annotation.data.locusName],
                        comment: annotation.data.text
                    };
                    break;
            }

            dispatch(addAnnotation(id, annotation.type, annotationData));
        }

        return loaded;
    };
}

export function requestSubmission(submissionId) {
    return (dispatch, getState) => {

        const state = getState();
        const jwt = AuthModule.selectors.rawJwtSelector(state);

        dispatch({
            type: actions.REQUEST_SUBMISSION,
        });

        return getSubmission(submissionId, jwt, (err, data) => {
            if(err) {
                return dispatch(failSubmission(err));
            }
            return dispatch(loadSubmission(data));
        });
    };
}

function failSubmission(error) {
    return {
        type: actions.FAIL_SUBMISSION,
        error,
    };
}