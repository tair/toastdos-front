"use strict";

import * as actions from './actionTypes';
import validation from 'lib/validation';
import {
    annotationTypes,
    annotationTypeData,
    annotationFormats,
} from 'domain/annotation/constants';

function getDefaultState() {
    return {
        byLocalId: {},
    };
}

function getDefaultEvidenceWithState() {
    return {
        localId: '',
        ...validation.getNotValidated(),
        locusName: '',
    };
}

const defaultState = getDefaultState();

function evidenceWithIndexReducer(state = getDefaultState().byLocalId, action) {
    switch (action.type) {
    case actions.ADD:
        return {
            ...state,
            [action.evidenceWithId]: {
                ...getDefaultEvidenceWithState(),
                localId: action.evidenceWithId,
            }
        };
    case actions.ATTEMPT_VALIDATE:
        return {
            ...state,
            [action.evidenceWithId]: {
                ...state[action.evidenceWithId],
                ...validation.getValidating(),
            }
        };
    case actions.REMOVE:
        let newState = {...state};

        delete newState[action.evidenceWithId];

        return Object.assign({}, newState);
    case actions.REMOVE_MULTIPLE:
        newState = {...state};

        action.localIds.forEach( localId =>
            delete newState[localId]
        );

        return Object.assign({}, newState);
    case actions.UPDATE:
        return {
            ...state,
            [action.evidenceWithId]: {
                ...state[action.evidenceWithId],
                ...action.data,
            }
        };
    case actions.CLEAR:
        return {
            ...state,
            [action.evidenceWithId]: {
                ...getDefaultEvidenceWithState(),
                localId: action.evidenceWithId,
            }
        };
    case actions.VALIDATE_SUCCESS:
        return {
            ...state,
            [action.evidenceWithId]: {
                ...state[action.evidenceWithId],
                ...validation.getValid(),
                locusName: action.locusName,
            }
        };
    case actions.VALIDATE_FAIL:
        return {
            ...state,
            [action.evidenceWithId]: {
                ...state[action.evidenceWithId],
                ...validation.getInvalid(action.error),
                locusName: '',
            }
        };
    default:
        return state;
    }
}

export default function (state = defaultState, action) {
    let newState = {
        ...state,
        byLocalId: evidenceWithIndexReducer(state.byLocalId, action),
    };
    switch (action.type) {
    default:
        return Object.assign({}, state, newState);
    }
}
