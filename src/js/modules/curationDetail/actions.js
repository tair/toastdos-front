"use strict";

import AuthModule from 'modules/authentication';
import {
    getSubmission,
    submitCurationSubmission,
} from 'lib/api';
import * as validation from 'lib/validation';
import * as actions from './actionTypes';
import * as pubActions from 'domain/publication/actions';
import * as geneActions from 'domain/gene/actions';
import * as annotationActions from 'domain/annotation/actions';
import * as geneTermActions from 'domain/geneTermAnnotation/actions';
import * as evidenceWithActions from 'domain/evidenceWith/actions';
import {
    annotationFormats,
    annotationTypeData,
} from 'domain/annotation/constants';
import {
    submissionBodySelector,
    submissionId,
    publicationLocalId,
    annotationOrder,
    geneOrder,
} from './selectors';


export function reviewValidatedFields() {
    return {
        type: actions.SET_REVIEW_VALIDATED,
    };
}

export function addGene(geneLocalId, geneData) {
    return dispatch => {
        // Create the new gene
        let newGene = geneActions.addNew(geneLocalId);
        dispatch(newGene);

        if (geneData) {
            dispatch(geneActions.updateGeneData(newGene.localId, geneData));
        }
        // Link the newly created gene to the submission
        dispatch(addToGeneOrder(newGene.localId));
    };
}

export function removeGene(geneLocalId) {
    return dispatch => {
        // Delete the gene
        dispatch(geneActions.removeGene(geneLocalId));

        // Remove the link to the gene
        dispatch(removeFromGeneOrder(geneLocalId));
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

export function addAnnotation(annotationLocalId, annotationData) {
    return (dispatch, getState) => {

        // Create the new annotation
        let newAnnotation = annotationActions.addNew(
            annotationLocalId,
            annotationData
        )(dispatch, getState);

        if (annotationData) {
            dispatch(annotationActions.updateAnnotationData(
                newAnnotation.localId,
                annotationData.annotationFormatData
            ));
        }

        // Link the newly created annotation to the submission
        dispatch(addToAnnotationOrder(newAnnotation.localId));
    };
}

export function removeAnnotation(annotationLocalId) {
    return dispatch => {
        // Delete the annotation
        dispatch(annotationActions.remove(annotationLocalId));

        // Remove the link to the annotation
        dispatch(removeFromAnnotationOrder(annotationLocalId));
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
        submitCurationSubmission(
            submissionId(currState), submissionBody,
            token, (err, data) => {
                if(err) {
                    return dispatch(submitFail(err));
                }
                return dispatch(submitSuccess(data));
            }
        );
    };
}

export function resetSubmission() {
    return (dispatch, getState) => {
        const currState = getState();

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
    return dispatch => {
        let loaded = dispatch({
            type: actions.LOAD_SUBMISSION,
            submission,
        });

        // Reset the curation submission
        dispatch(resetSubmission());

        // Record static submisison info
        dispatch({
            type: actions.SET_ID,
            submissionId: submission.id,
        });

        dispatch({
            type: actions.SET_SUBMITTER,
            submitter: submission.submitter
        });

        dispatch({
            type: actions.SET_SUBMITTED_AT,
            submittedAt: submission.submitted_at
        });

        // Create publication for submission
        let newPub = pubActions.addNew();
        dispatch(newPub);

        // Link the newly created publication to the submission
        dispatch(setPublication(newPub.localId));

        // Set the publication id value
        dispatch(pubActions.update(newPub.localId, submission.publicationId));

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
            let localId = "remote_annotation_" + annotation.id;

            let annotationFormatData, ewOrder, ewRelation;
            switch(annotationTypeData[annotation.type].format) {
            case annotationFormats.GENE_TERM:
                ewOrder = [];
                ewRelation = "";
                if (annotation.data.evidenceWith) {
                    // Create each evidence with and record the localId
                    for (let ew of annotation.data.evidenceWith) {
                        let newEw = evidenceWithActions.addNew();

                        // create an evidence with
                        dispatch(newEw);

                        // update its data
                        dispatch(
                            evidenceWithActions.updateEvidenceWith(
                                newEw.evidenceWithId, {
                                    ...validation.getValid(),
                                    locusName: ew,
                                }
                            )
                        );

                        // add id to order
                        ewOrder.push(newEw.evidenceWithId);
                    }

                    if (annotation.data.isEvidenceWithOr == true) {
                        ewRelation = "OR";
                    } else if (annotation.data.isEvidenceWithOr == false) {
                        ewRelation = "AND";
                    }

                    // update Evidence With Relation on annotation
                    dispatch(
                        geneTermActions.updateEvidenceWithRelation(localId, ewRelation)
                    );
                }

                annotationFormatData = {
                    geneLocalId: locusMap[annotation.data.locusName],
                    keywordName: annotation.data.keyword.name,
                    keywordId: annotation.data.keyword.id,
                    keywordExternalId: annotation.data.keyword.externalId || "",
                    methodName: annotation.data.method.name,
                    methodId: annotation.data.method.id,
                    methodExternalId: annotation.data.method.externalId || "",
                    methodEvidenceCode: annotation.data.method.evidenceCode || null,
                    evidenceWithOrder: ewOrder,
                    evidenceWithRelation: ewRelation,
                };
                break;
            case annotationFormats.GENE_GENE:
                annotationFormatData = {
                    gene1LocalId: locusMap[annotation.data.locusName],
                    gene2LocalId: locusMap[annotation.data.locusName2],
                    methodName: annotation.data.method.name,
                    methodId: annotation.data.method.id,
                    methodExternalId: annotation.data.method.externalId || "",
                    methodEvidenceCode: annotation.data.method.evidenceCode || null
                };
                break;
            case annotationFormats.COMMENT:
                annotationFormatData = {
                    geneLocalId: locusMap[annotation.data.locusName],
                    comment: annotation.data.text
                };
                break;
            }

            let annotationData = {
                annotationId: annotation.id,
                annotationStatus: annotation.status,
                annotationType: annotation.type,
                annotationFormatData: annotationFormatData,
            };

            dispatch(addAnnotation(localId, annotationData));
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
