"use strict";

import * as actions from './actionTypes';
import * as evidenceWithActions from 'domain/evidenceWith/actions';
import generateId from 'lib/idGenerator';
import { annotationTypes } from 'domain/annotation/constants';
import {
    geneTermAnnotationSelector,
    geneTermAnnotationListSelector
} from './selectors';

export function addNew(newType = annotationTypes.MOLECULAR_FUNCTION) {
    return {
        type: actions.ADD_NEW,
        localId: '' + generateId(),
        newType,
    };
}

export function remove(localId) {
    return (dispatch, getState) => {
        const state = getState();
        const annotation = geneTermAnnotationSelector(state, localId);
        const evidenceWithList = annotation.evidenceWithOrder;

        // Delete the evidenceWith
        if (evidenceWithList.length > 0) {
            dispatch(evidenceWithActions.removeMultiple(evidenceWithList));
        }

        // Delete annotation
        return dispatch({
            type: actions.REMOVE,
            localId,
        });
    };
}

export function removeAnnotations(localIds) {
    return (dispatch, getState) => {
        const state = getState();
        const annotations = geneTermAnnotationListSelector(state, localIds);

        let evidenceWithList = [];

        // Gather the localIds for deletion
        annotations.forEach(annotation => {
            evidenceWithList = evidenceWithList.concat(annotation.evidenceWithOrder);
        });

        // Delete the evidenceWith
        if (evidenceWithList.length > 0) {
            dispatch(evidenceWithActions.removeMultiple(evidenceWithList));
        }

        // Delete annotations
        return dispatch({
            type: actions.REMOVE_ANNOTATIONS,
            localIds,
        });
    };
}

export function update(localId, data) {
    return {
        type: actions.UPDATE,
        localId: localId,
        data: data
    };
}

export function addEvidenceWith(localId) {
    return dispatch => {
        // Create the new evidenceWith
        let newEvidenceWith = evidenceWithActions.addNew();
        dispatch(newEvidenceWith);

        // Link the newly created evidenceWith to the geneTermAnnotation
        return dispatch({
            type: actions.ADD_EVIDENCE_WITH,
            localId,
            evidenceWithId: newEvidenceWith.evidenceWithId,
        });
    };
}

export function removeEvidenceWith(localId, evidenceWithId) {
    return dispatch => {
        // Delete the evidenceWith
        let toRemove = evidenceWithActions.remove(evidenceWithId);
        dispatch(toRemove);

        // Remove the link to the evidenceWith
        return dispatch({
            type: actions.REMOVE_EVIDENCE_WITH,
            localId,
            evidenceWithId: evidenceWithId
        });
    };
}

export function clearEvidenceWith(localId, evidenceWithId) {
    return dispatch => {
        let toClear = evidenceWithActions.clearEvidenceWith(evidenceWithId);
        return dispatch(toClear);
    };
}
