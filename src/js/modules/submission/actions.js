"use strict";

import AuthModule from 'modules/authentication';
import {
    validateGene,
    validatePublication,
    submitSubmission,
    searchKeywords
} from 'lib/api';
import * as actions from './actionTypes';
import { name } from './constants';
import { submissionBodySelector } from './selectors';

export function changePublicationId(value) {
    return {
        type: actions.PUBLICATION_ID_CHANGED,
        value: value
    };
}

export function addNewGene(localId) {
    return {
        type: actions.ADD_NEW_GENE,
        localId: localId
    };
}

export function removeGene(localId) {
    return {
        type: actions.REMOVE_GENE,
        localId: localId
    };
}

export function attemptValidatePublication(publicationId) {
    return (dispatch, getState) => {
        const currState = getState();
        const token = AuthModule.selectors.rawJwtSelector(currState);

        dispatch({
            type: actions.ATTEMPT_VALIDATE_PUBLICATION
        });

        if (publicationId.length > 0 && publicationId !== '0') {
            validatePublication(publicationId, token, (err, data) => { if(err) {
                    if(err.error === 'NOT_FOUND') {
                        return dispatch(validatePublicationFail("Publication Not Found"));
                    }
                    return dispatch(validatePublicationFail("Error Validating Publication"));
                }
                return dispatch(validatePublicationSuccess(publicationId, data));
            });
        } else {
            return dispatch(validatePublicationFail("Publication ID is empty"));
        }
    };
}

function validatePublicationSuccess(publicationId, data) {
    return {
        type: actions.VALIDATE_PUBLICATION_SUCCESS,
        publicationId: publicationId,
        data: data
    };
}

function validatePublicationFail(error) {
    return {
        type: actions.VALIDATE_PUBLICATION_FAIL,
        error: error
    };
}

export function attemptValidateGene(localId, locusName) {
    return (dispatch, getState) => {
        const currState = getState();
        const token = AuthModule.selectors.rawJwtSelector(currState);

        dispatch({
            type: actions.ATTEMPT_VALIDATE_GENE,
            localId: localId
        });

        // make sure we didn't add gene already
        for(var gi in currState[name].geneIndex) {
            // console.log(gi)
            if(`${gi}` === `${localId}`) continue;
            if(currState[name].geneIndex[gi].finalizedLocusName === locusName) {
                return dispatch(validateGeneFail(localId, 'Locus already added'));
            }
        }

        validateGene(locusName, token, (err, data) => {
            if(err) {
                if(err.error === 'NOT_FOUND') {
                    return dispatch(validateGeneFail(localId, "Locus Not Found"));
                }
                return dispatch(validateGeneFail(localId, "Error Validating Locus"));
            }
            return dispatch(validateGeneSuccess(localId, locusName));
        });
    };
}

function validateGeneSuccess(localId, locusName) {
    return {
        type: actions.VALIDATE_GENE_SUCCESS,
        localId: localId,
        locusName
    };
}

function validateGeneFail(localId, error) {
    return {
        type: actions.VALIDATE_GENE_FAIL,
        localId: localId,
        error: error
    };
}

export function validateEvidenceWith(annotationId, evidenceWithId, locusName) {
    return (dispatch, getState) => {
        const currState = getState();
        const token = AuthModule.selectors.rawJwtSelector(currState);

        dispatch({
            type: actions.ATTEMPT_VALIDATE_EVIDENCE_WITH,
            annotationId,
            evidenceWithId,
        });

        validateGene(locusName, token, (err, data) => {
            if(err) {
                if(err.error === 'NOT_FOUND') {
                    return dispatch(validateEvidenceWithFail(annotationId, evidenceWithId, "Locus Not Found"));
                }
                return dispatch(validateEvidenceWithFail(annotationId, evidenceWithId, "Error Validating Locus"));
            }
            return dispatch(validateEvidenceWithSuccess(annotationId, evidenceWithId, locusName));
        });
    };
}

function validateEvidenceWithFail(annotationId, evidenceWithId, error) {
    return {
        type: actions.VALIDATE_EVIDENCE_WITH_FAIL,
        annotationId,
        error,
        evidenceWithId
    };
}

function validateEvidenceWithSuccess(annotationId, evidenceWithId, locusName) {
    return {
        type: actions.VALIDATE_EVIDENCE_WITH_SUCCESS,
        annotationId,
        evidenceWithId,
        locusName
    };
}

export function updateGeneData(localId, geneData) {
    return {
        type: actions.UPDATE_GENE_DATA,
        localId,
        geneData
    };
}

export function addNewAnnotation(localId) {
    return {
        type: actions.ADD_NEW_ANNOTATION,
        localId: localId
    };
}

export function removeAnnotation(localId) {
    return {
        type: actions.REMOVE_ANNOTATION,
        localId: localId
    };
}

export function changeAnnotationType(localId, newType) {
    return {
        type: actions.CHANGE_ANNOTATION_TYPE,
        localId: localId,
        newAnnotationType: newType
    };
}

export function updateAnnotationData(localId, data) {
    return {
        type: actions.UPDATE_ANNOTATION_DATA,
        localId: localId,
        data: data
    };
}

export function addEvidenceWith(annotationId, newEvidenceWithId) {
    return {
        type: actions.ADD_EVIDENCE_WITH,
        annotationId,
        newEvidenceWithId
    };
}

function submitSuccess(response) {
    return {
        type: actions.SUBMIT_SUCCESS,
        data: response
    };
}

function submitFail(error) {
    // console.log(error);
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
    return {
        type: actions.RESET_SUBMISSION
    };
}

function keywordSearchSuccess(results) {
    return {
        type: actions.KEYWORD_SEARCH_SUCCESS,
        results
    };
}

function keywordSearchFail(error) {
    console.error(error);
    return {
        type: actions.KEYWORD_SEARCH_FAIL,
        error
    };
}

export function attemptKeywordSearch(searchTerm, keywordScope) {
    return (dispatch, getState) => {

        const currState = getState();

        dispatch({
            type: actions.ATTEMPT_KEYWORD_SEARCH
        });

        const token = AuthModule.selectors.rawJwtSelector(currState);
        searchKeywords(searchTerm, keywordScope, token, (err, data) => {
            if(err) {
                return dispatch(keywordSearchFail(err));
            }
            return dispatch(keywordSearchSuccess(data));
        });
    };
}

export function clearKeywordSearch() {
    return {
        type: actions.CLEAR_KEYWORD_SEARCH
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