"use strict";

import * as actions from './actionTypes';
import validation from 'lib/validation';

function getDefaultGeneState() {
    return {
        localId: '',
        geneSymbolId: null,
        finalizedLocusName: "",
        finalizedGeneSymbol: "",
        finalizedFullName: "",
        ...validation.getNotValidated(),
    };
}

const defaultState = {
    byLocalId: {},
};

function geneIndexReducer(state = defaultState.byLocalId, action) {
    switch (action.type) {
    case actions.ADD_NEW:
        return {
            ...state,
            [action.localId]: {
                ...getDefaultGeneState(),
                localId: action.localId,
            }
        };
    case actions.REMOVE_GENE:
        let newState = {...state};

        delete newState[action.localId];

        return Object.assign({}, newState);
    case actions.REMOVE_GENES:
        newState = {...state};

        action.localIds.forEach( localId =>
            delete newState[localId]
        );

        return Object.assign({}, newState);
    case actions.CLEAR_GENE:
        return {
            ...state,
            [action.geneId]: {
                ...getDefaultGeneState(),
                localId: action.geneId,
            }
        };
    case actions.ATTEMPT_VALIDATE_GENE:
        return {
            ...state,
            [action.localId]: {
                ...state[action.localId],
                ...validation.getValidating(),
            }
        };
    case actions.UPDATE_GENE_DATA:
        return {
            ...state,
            [action.localId]: {
                ...state[action.localId],
                ...action.geneData
            }
        };
    case actions.VALIDATE_GENE_SUCCESS:
        return {
            ...state,
            [action.localId]: {
                ...state[action.localId],
                ...validation.getValid(),
                finalizedLocusName: action.locusName,
            }
        };
    case actions.VALIDATE_GENE_FAIL:
        return {
            ...state,
            [action.localId]: {
                ...state[action.localId],
                ...validation.getInvalid(action.error),
                finalizedLocusName: '',
            }
        };
    default:
        return state;
    }
}

export default function (state = defaultState, action) {
    let newState = {
        ...state,
        byLocalId: geneIndexReducer(state.byLocalId, action),
    };
    switch (action.type) {
    default:
        return Object.assign({}, state, newState);
    }
}
