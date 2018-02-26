"use strict";

import * as actions from './actionTypes';
import { annotationTypes } from 'domain/annotation/constants';

function getDefaultGeneTermAnnotationState() {
    return {
        localId: '',
        annotationType: "",
        geneLocalId: '',
        keywordName: "",
        keywordId: null,
        keywordExternalId: "",
        methodName: "",
        methodId: null,
        methodExternalId: "",
        methodEvidenceCode: "",
        evidenceWithOrder: [],
        evidenceWithRelation: "",
    };
}

const defaultState = {
    byLocalId: {},
};

function geneTermAnnotationIndexReducer(state = defaultState.byLocalId, action) {
    switch (action.type) {
    case actions.ADD_NEW:
        return {
            ...state,
            [action.localId]: {
                ...getDefaultGeneTermAnnotationState(),
                localId: action.localId,
                geneLocalId: action.geneLocalId,
                annotationType: action.newType,
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
    case actions.ADD_EVIDENCE_WITH:
        let geneTermAnnotation = state[action.localId];
        return {
            ...state,
            [action.localId]: {
                ...geneTermAnnotation,
                evidenceWithOrder: geneTermAnnotation.evidenceWithOrder
                    .concat(action.evidenceWithId)
            }
        };
    case actions.UPDATE_EVIDENCE_WITH_RELATION:
        geneTermAnnotation = state[action.localId];
        return {
            ...state,
            [action.localId]: {
                ...geneTermAnnotation,
                evidenceWithRelation: action.relation
            }
        };
    case actions.REMOVE_EVIDENCE_WITH:
        geneTermAnnotation = state[action.localId];
        return {
            ...state,
            [action.localId]: {
                ...geneTermAnnotation,
                evidenceWithOrder: geneTermAnnotation.evidenceWithOrder
                    .filter(e => e != action.evidenceWithId)
            }
        };
    default:
        return state;
    }
}

export default function (state = defaultState, action) {
    let newState = {
        ...state,
        byLocalId: geneTermAnnotationIndexReducer(state.byLocalId, action),
    };
    switch (action.type) {
    default:
        return Object.assign({}, state, newState);
    }
}
