"use strict";

import AuthModule from 'modules/authentication';
import { submitSubmission, createDraft, getDraft } from 'lib/api';
import * as validation from 'lib/validation';
import * as actions from './actionTypes';
import * as publicationActions from 'domain/publication/actions';
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
    publicationLocalId,
    annotationOrder,
    geneOrder,
} from './selectors';

export function reviewValidatedFields() {
    return {
        type: actions.SET_REVIEW_VALIDATED,
    };
}

let lastDraft = null;

export function saveDraft() {
    return (dispatch, getState) => {

        const currState = getState();

        if (currState.submission.submitting || currState.submission.submitted) {
            return;
        }

        const newDraft = JSON.stringify({wip_state: submissionBodySelector(currState, true)});
        if (newDraft == lastDraft) {
            return;
        }
        lastDraft = newDraft;
        const token = AuthModule.selectors.rawJwtSelector(currState);
        createDraft(newDraft, token, (err) => {
            if (!err) {
                dispatch(draftSaved());
            }
        });
    };
}

function draftSaved() {
    return {
        type: actions.DRAFT_SAVED
    };
}

// The number of draft loads that have taken place to keep the ids unique
let loadDraftId = 0;

export function loadDraft(skipDraftIfExists) {
    return (dispatch, getState) => {

        const currState = getState();
        const token = AuthModule.selectors.rawJwtSelector(currState);
        getDraft(token, (err, body) => {
            if (!err && !skipDraftIfExists) {
                // make sure each draft loading creates new ids.
                loadDraftId++;

                // The draft now exists in the body var, load it.

                // Set the publication id value
                let newPub = publicationActions.addNew();
                dispatch(newPub);
                // Link the newly created publication to the submission
                dispatch(setPublication(newPub.localId));
                dispatch(publicationActions.update(
                    newPub.localId, body['publicationId']));

                if (body['genes'].length == 0) {
                    // Add a default gene.
                    dispatch(addGene());
                }

                let locusMap = {};
                for (let i = 0; i < body['genes'].length; i++) {
                    let gene = body['genes'][i];
                    let id = "draft_" + loadDraftId + "_gene_" + gene.locusName;
                    locusMap[gene.locusName] = id;

                    let geneData = {
                        finalizedLocusName: gene.locusName,
                        finalizedGeneSymbol: gene.geneSymbol || "",
                        finalizedFullName: gene.fullName || "",
                        ...validation.getValid(),
                    };

                    // add the remaining genes
                    dispatch(addGene(id, geneData));
                }


                for (let i = 0; i < body.annotations.length; i++) {
                    let annotation = body.annotations[i];
                    let localId = "draft_" + loadDraftId + "_annotation_" + i;

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

            } else {
                // There are no drafts.
                // Create publication for submission
                let newPub = publicationActions.addNew();
                dispatch(newPub);

                // Link the newly created publication to the submission
                dispatch(setPublication(newPub.localId));

                // Create gene for submission
                dispatch(addGene());
            }
        });
    };
}

export function initialize(skipDraft) {
    return dispatch => {
        dispatch(clearSubmission());
        dispatch(loadDraft(skipDraft));
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
        // Remove the link to the gene
        dispatch(removeFromGeneOrder(geneLocalId));

        // Delete the gene
        dispatch(geneActions.removeGene(geneLocalId));
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
        // Remove the link to the annotation
        dispatch(removeFromAnnotationOrder(annotationLocalId));

        // Delete the annotation
        dispatch(annotationActions.remove(annotationLocalId));
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
            lastDraft = null;
            return dispatch(submitSuccess(data));
        });
    };
}

function clearSubmission() {
    return (dispatch, getState) => {
        const currState = getState();

        // Delete the publication
        dispatch(publicationActions.remove(publicationLocalId(currState)));

        // Delete the annotations
        dispatch(annotationActions.removeAnnotations(annotationOrder(currState)));

        // Delete the genes
        dispatch(geneActions.removeGenes(geneOrder(currState)));

        // Reset the submission
        dispatch({
            type: actions.RESET_SUBMISSION
        });

    };
}

export function resetSubmission() {
    return (dispatch) => {
        // Initialize the submission
        dispatch(initialize(true));
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
    return {
        type: actions.LOAD_SUBMISSION,
        submission,
    };
}
