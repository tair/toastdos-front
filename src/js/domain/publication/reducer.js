"use strict";

import * as actions from './actionTypes';
import validation from 'lib/validation';

function getDefaultPublicationState() {
    return {
        localId: '',
        idValue: "",
        author: "",
        url: "",
        title: "",
        ...validation.getNotValidated(),
    };
}

const defaultState = {
    byLocalId: {},
};

function publicationIndexReducer(state = defaultState.byLocalId, action) {
    let newState;
    switch (action.type) {
    case actions.ADD_NEW:
        return {
            ...state,
            [action.localId]: {
                ...getDefaultPublicationState(),
                localId: action.localId,
            }
        };
    case actions.UPDATE:
        return {
            ...state,
            [action.localId]: {
                ...state[action.localId],
                idValue: action.publicationId,
            }
        };
    case actions.LOAD:
        return {
            ...state,
            [action.localId]: {
                ...getDefaultPublicationState(),
                localId: action.localId,
                idValue: action.publicationId,
            }
        };
    case actions.REMOVE:
        newState = { ...state };

        delete newState[action.localId];

        return Object.assign({}, newState);
    case actions.RESET:
        return {
            ...state,
            [action.localId]: {
                ...getDefaultPublicationState(),
                localId: action.localId,
            }
        };
    case actions.ATTEMPT_VALIDATE:
        return {
            ...state,
            [action.localId]: {
                ...getDefaultPublicationState(),
                localId: action.localId,
                idValue: action.publicationId,
                ...validation.getValidating(),
            }
        };
    case actions.VALIDATE_SUCCESS:
        return {
            ...state,
            [action.localId]: {
                ...state[action.localId],
                ...validation.getValid(),
                idValue: action.publicationId,
                author: action.data.author,
                url: action.data.url,
                title: action.data.title,
            }
        };
    case actions.VALIDATE_FAIL:
        return {
            ...state,
            [action.localId]: {
                ...state[action.localId],
                ...validation.getInvalid(action.error),
            }
        };
    default:
        return state;
    }
}

export default function (state = defaultState, action) {
    let newState = {
        ...state,
        byLocalId: publicationIndexReducer(state.byLocalId, action),
    };
    switch (action.type) {
    default:
        return Object.assign({}, state, newState);
    }

}
