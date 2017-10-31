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

import { AsyncAction } from 'lib/asyncActionManager';

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

export class AttemptValidatePublicationAsync extends AsyncAction {
    constructor(publicationId) {
        super(actions.ATTEMPT_VALIDATE_PUBLICATION);
        this.publicationId = publicationId;
    }
    
    execute(dispatch, getState) {
        const currState = getState();
        const token = AuthModule.selectors.rawJwtSelector(currState);

        dispatch({
            type: actions.ATTEMPT_VALIDATE_PUBLICATION
        });

        if (this.publicationId.length > 0 && this.publicationId !== '0') {
            this.request = validatePublication(this.publicationId, token, (err, data) => { 
                if(err) {
                    if(err.error === 'NOT_FOUND') {
                        return dispatch(validatePublicationFail("Publication Not Found"));
                    }
                    return dispatch(validatePublicationError("Error Validating Publication"));
                }
                return dispatch(validatePublicationSuccess(this.publicationId, data));
            });
        } else {
            return dispatch(validatePublicationFail("Publication ID is empty"));
        }
    }
}

function validatePublicationSuccess(publicationId, data) {
    return {
        type: actions.VALIDATE_PUBLICATION_SUCCESS,
        publicationId: publicationId,
        data: data
    };
}

function validatePublicationFail(message) {
    return {
        type: actions.VALIDATE_PUBLICATION_FAIL,
        message,
    };
}

function validatePublicationError(message) {
    return {
        type: actions.VALIDATE_PUBLICATION_ERROR,
        message,
    };
}

export class AttemptValidateGeneAsync extends AsyncAction {
    constructor(localId, locusName) {
        super(actions.ATTEMPT_VALIDATE_GENE);
        this.localId = localId;
        this.locusName = locusName;
    }

    execute (dispatch, getState) {
        const currState = getState();
        const token = AuthModule.selectors.rawJwtSelector(currState);

        dispatch({
            type: actions.ATTEMPT_VALIDATE_GENE,
            localId: this.localId
        });

        // make sure we didn't add gene already
        for(var gi in currState[name].geneIndex) {
            // console.log(gi)
            if(`${gi}` === `${this.localId}`) continue;
            if(currState[name].geneIndex[gi].finalizedLocusName === this.locusName) {
                return dispatch(validateGeneFail(this.localId, 'Locus already added'));
            }
        }

        if (this.locusName.trim() == '') {
            return dispatch(validateGeneFail(this.localId, "Locus is empty"));
        }
        this.request = validateGene(this.locusName, token, (err, data) => {
            if(err) {
                if(err.error === 'NOT_FOUND') {
                    return dispatch(validateGeneFail(this.localId, "Locus Not Found"));
                }
                return dispatch(validateGeneError(this.localId, "Error Validating Locus"));
            }
            // automatically add an annotation if there are none
            if (currState.submission.annotationOrder.length == 0) {
                dispatch(addNewAnnotation(this.localId));
            }
            return dispatch(validateGeneSuccess(this.localId, this.locusName));
        });
    }
}

function validateGeneSuccess(localId, locusName) {
    return {
        type: actions.VALIDATE_GENE_SUCCESS,
        localId: localId,
        locusName
    };
}

function validateGeneFail(localId, message) {
    return {
        type: actions.VALIDATE_GENE_FAIL,
        localId: localId,
        message,
    };
}

function validateGeneError(localId, message) {
    return {
        type: actions.VALIDATE_GENE_ERROR,
        localId: localId,
        message,
    };
}

export class AttemptValidateEvidenceWithAsync extends AsyncAction {
    constructor(annotationId, evidenceWithId, locusName) {
        super(actions.ATTEMPT_VALIDATE_EVIDENCE_WITH);
        this.annotationId = annotationId;
        this.evidenceWithId = evidenceWithId;
        this.locusName = locusName;
    }
    execute(dispatch, getState) {
        const currState = getState();
        const token = AuthModule.selectors.rawJwtSelector(currState);

        dispatch({
            type: actions.ATTEMPT_VALIDATE_EVIDENCE_WITH,
            annotationId: this.annotationId,
            evidenceWithId: this.evidenceWithId,
        });

        this.request = validateGene(this.locusName, token, (err, data) => {
            if(err) {
                if(err.error === 'NOT_FOUND') {
                    return dispatch(validateEvidenceWithFail(this.annotationId, this.evidenceWithId, "Locus Not Found"));
                }
                return dispatch(validateEvidenceWithError(this.annotationId, this.evidenceWithId, "Error Validating Locus"));
            }
            return dispatch(validateEvidenceWithSuccess(this.annotationId, this.evidenceWithId, this.locusName));
        });
    }
}

function validateEvidenceWithError(annotationId, evidenceWithId, message) {
    return {
        type: actions.VALIDATE_EVIDENCE_WITH_ERROR,
        annotationId,
        message,
        evidenceWithId
    };
}

function validateEvidenceWithFail(annotationId, evidenceWithId, message) {
    return {
        type: actions.VALIDATE_EVIDENCE_WITH_FAIL,
        annotationId,
        message,
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