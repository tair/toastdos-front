"use strict";

import * as actions from './actionTypes';

function getDefaultCommentAnnotationState() {
    return {
        localId: '',
        geneLocalId: '',
        comment: '',
    };
}

function getDefaultState() {
    return {
        byLocalId: {},
    }
}

const defaultState = getDefaultState();

function commentAnnotationIndexReducer(state = getDefaultState().byLocalId, action) {
    switch (action.type) {
    case actions.ADD_NEW:
        return {
            ...state,
            [action.localId]: {
                ...getDefaultCommentAnnotationState(),
                localId: action.localId,
            }
        };
    case actions.REMOVE:
        let newState = {...state};

        delete newState[action.localId];

        return Object.assign({}, newState);
    case actions.REMOVE_ANNOTATIONS:
        newState = {...state};

        action.localIds.forEach( localId =>
            delete newState[localId]
        );

        return Object.assign({}, newState);
    case actions.UPDATE:
        return {
            ...state,
            [action.localId]: {
                ...state[action.localId],
                ...action.data,
            }
        };
    default:
        return state;
    }
}

export default function (state = defaultState, action) {
    let newState = {
        ...state,
        byLocalId: commentAnnotationIndexReducer(state.byLocalId, action),
    };
    switch (action.type) {
    default:
        return Object.assign({}, state, newState);
    }
}
