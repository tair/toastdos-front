"use strict";

import * as actions from './actionTypes';
import { annotationTypes } from './constants';

function getDefaultAnnotationState() {
    return {
        localId: '',
        annotationType: annotationTypes.MOLECULAR_FUNCTION,
        annotationTypeLocalId: '',
    };
}

const defaultState = {
    byLocalId: {},
};

function annotationIndexReducer(state = defaultState.byLocalId, action) {
    switch (action.type) {
    case actions.ADD_NEW:
        return {
            ...state,
            [action.localId]: {
                ...getDefaultAnnotationState(),
                localId: action.localId,
                annotationType: action.annotationType,
                annotationTypeLocalId: action.annotationTypeLocalId,
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
    case actions.CHANGE_ANNOTATION_TYPE:
        return {
            ...state,
            [action.localId]: {
                ...getDefaultAnnotationState(),
                localId: action.localId,
                annotationType: action.newAnnotationType,
                annotationTypeLocalId: action.newAnnotationTypeLocalId,
            }
        };
    default:
        return state;
    }
}

export default function (state = defaultState, action) {
    let newState = {
        ...state,
        byLocalId: annotationIndexReducer(state.byLocalId, action),
    };
    switch (action.type) {
    default:
        return Object.assign({}, state, newState);
    }
}
