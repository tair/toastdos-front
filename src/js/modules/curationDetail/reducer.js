"use strict";

import * as actions from './actionTypes';

const defaultState = {
    submissionId: '',
    publicationLocalId: '',
    geneOrder: [],
    annotationOrder: [],
    submitting: false,
    submitted: false,
    previewing: false,
    submissionError: "",
    submitter: null,
    submittedAt: null,
    reviewValidated: 0,
};

function submissionReducer(state = defaultState, action) {
    switch (action.type) {
    case actions.SET_ID:
        return {
            ...state,
            submissionId: action.submissionId,
        };
    case actions.SET_PUBLICATION:
        return {
            ...state,
            publicationLocalId: action.publicationLocalId,
        };
    case actions.ADD_GENE:
        return {
            ...state,
            geneOrder: state.geneOrder.concat([action.geneLocalId]),
        };
    case actions.REMOVE_GENE:
        return {
            ...state,
            geneOrder: state.geneOrder.filter(e => e !== action.geneLocalId)
        };
    case actions.ADD_ANNOTATION:
        return {
            ...state,
            annotationOrder: state.annotationOrder.concat([action.annotationLocalId]),
        };
    case actions.REMOVE_ANNOTATION:
        return {
            ...state,
            annotationOrder: state.annotationOrder.filter(e => e !== action.annotationLocalId)
        };
    case actions.ATTEMPT_SUBMIT:
        return {
            ...state,
            submitting: true
        };
    case actions.SUBMIT_SUCCESS:
        return {
            ...state,
            submitting: false,
            submitted: true,
            submissionError: "",
        };
    case actions.SUBMIT_FAIL:
        return {
            ...state,
            submitting: false,
            submitted: false,
            submissionError: action.error,
            previewing: false,
        };
    case actions.PREVIEW:
        return {
            ...state,
            previewing: true,
            submissionError: ""
        };
    case actions.EDIT:
        return {
            ...state,
            previewing: false
        };
    case actions.SET_SUBMITTER:
        return {
            ...state,
            submitter: action.submitter,
        };
    case actions.SET_SUBMITTED_AT:
        return {
            ...state,
            submittedAt: action.submittedAt,
        };
    case actions.SET_REVIEW_VALIDATED:
        return {
            ...state,
            reviewValidated: state.reviewValidated + 1,
        };
    default:
        return state;
    }
}

export default function (state = defaultState, action) {
    let newState = {
        ...state,
        ...submissionReducer(state,action),
    };
    switch (action.type) {
    case actions.LOAD_SUBMISSION:
    case actions.RESET_SUBMISSION:
        return defaultState;
    default:
        return Object.assign({}, state, newState);
    }
}
