"use strict";

import * as actions from './actionTypes';

function getDefaultGeneGeneAnnotationState() {
    return {
        localId: '',
        gene1localId: '',
        gene2localId: '',
        methodName: "",
        methodId: null,
        methodExternalId: "",
        methodEvidenceCode: "",
    };
}

function getDefaultState() {
    return {
        byLocalId: {},
    }
}

const defaultState = getDefaultState();

function geneGeneAnnotationIndexReducer(state = getDefaultState().byLocalId, action) {
    switch (action.type) {
    case actions.ADD_NEW:
        return {
            ...state,
            [action.localId]: {
                ...getDefaultGeneGeneAnnotationState(),
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
    case actions.UPDATE_GENE1:
        return {
            ...state,
            [action.localId]: {
                ...state[action.localId],
                gene1LocalId: action.gene1LocalId,
            }
        };
    case actions.UPDATE_GENE2:
        return {
            ...state,
            [action.localId]: {
                ...state[action.localId],
                gene2LocalId: action.gene2LocalId,
            }
        };
    default:
        return state;
    }
}

export default function (state = defaultState, action) {
    let newState = {
        ...state,
        byLocalId: geneGeneAnnotationIndexReducer(state.byLocalId, action),
    };
    switch (action.type) {
    default:
        return Object.assign({}, state, newState);
    }
}
