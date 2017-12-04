"use strict";

import * as actions from './actionTypes';
import * as geneTermActions from 'domain/geneTermAnnotation/actions';
import * as geneGeneActions from 'domain/geneGeneAnnotation/actions';
import * as commentActions from 'domain/commentAnnotation/actions';
import { annotationFormats, annotationTypes, annotationTypeData } from './constants';
import { annotationSelector, annotationListSelector } from './selectors';
import generateId from 'lib/idGenerator';

export function addNew(localId, annotationData = {}) {
    return (dispatch, getState) => {
        let toAdd;
        let format = annotationData.annotationType ?
            annotationTypeData[annotationData.annotationType].format : "";
        // Prepare to create the new annotation type
        switch(format) {
        case annotationFormats.GENE_GENE:
            toAdd = geneGeneActions.addNew();
            break;
        case annotationFormats.COMMENT:
            toAdd = commentActions.addNew();
            break;
        case annotationFormats.GENE_TERM:
            toAdd = geneTermActions.addNew(annotationData.annotationType);
            break;
        default:
            toAdd = geneTermActions.addNew();
            annotationData.annotationType = toAdd.newType;
        }

        // Create the new annotation type
        dispatch(toAdd);

        // Link the newly created annotationType to the annotation
        let annotation = addAnnotation(localId, annotationData, toAdd.localId);
        dispatch(annotation);

        return annotation;
    };
}

function addAnnotation(localId, annotationData, annotationTypeLocalId) {
    return {
        type: actions.ADD_NEW,
        localId: localId ? localId : "" + generateId(),
        annotationData,
        annotationTypeLocalId,
    };
}

export function remove(localId) {
    return (dispatch, getState) => {
        const state = getState();
        const self = annotationSelector(state, localId);

        switch(annotationTypeData[self.annotationType].format) {
        case annotationFormats.GENE_TERM:
            // Delete the annotation type
            dispatch(geneTermActions.remove(self.annotationTypeLocalId));
            break;
        case annotationFormats.GENE_GENE:
            // Delete the annotation type
            dispatch(geneGeneActions.remove(self.annotationTypeLocalId));
            break;
        case annotationFormats.COMMENT:
            // Delete the annotation type
            dispatch(commentActions.remove(self.annotationTypeLocalId));
            break;
        }

        // Delete annotation
        return dispatch(removeAnnotation(localId))
    };
}

function removeAnnotation(localId) {
    return {
        type: actions.REMOVE,
        localId: localId
    };
}

export function removeAnnotations(localIds) {
    return (dispatch, getState) => {
        const state = getState();
        const annotations = annotationListSelector(state, localIds);

        const geneTermAnnotations = [];
        const geneGeneAnnotations = [];
        const commentAnnotations = [];

        // Gather the localIds for deletion
        annotations.forEach(annotation => {
            switch(annotationTypeData[annotation.annotationType].format) {
            case annotationFormats.GENE_TERM:
                geneTermAnnotations.push(annotation.annotationTypeLocalId);
                break;
            case annotationFormats.GENE_GENE:
                geneGeneAnnotations.push(annotation.annotationTypeLocalId);
                break;
            case annotationFormats.COMMENT:
                commentAnnotations.push(annotation.annotationTypeLocalId);
                break;
            }
        });

        // Delete the annotation types
        if (geneTermAnnotations.length > 0) {
            dispatch(geneTermActions.removeAnnotations(geneTermAnnotations));
        }
        if (geneGeneAnnotations.length > 0) {
            dispatch(geneGeneActions.removeAnnotations(geneGeneAnnotations));
        }
        if (commentAnnotations.length > 0) {
            dispatch(commentActions.removeAnnotations(commentAnnotations));
        }

        // Delete annotations
        return dispatch({
            type: actions.REMOVE_ANNOTATIONS,
            localIds,
        });
    };
}

export function changeAnnotationType(localId, newType) {
    return (dispatch, getState) => {
        const state = getState();
        const self = annotationSelector(state, localId);
        let toAdd;

        // Delete the old annotation type
        switch(annotationTypeData[self.annotationType].format) {
        case annotationFormats.GENE_TERM:
            dispatch(geneTermActions.remove(self.annotationTypeLocalId));
            break;
        case annotationFormats.GENE_GENE:
            dispatch(geneGeneActions.remove(self.annotationTypeLocalId));
            break;
        case annotationFormats.COMMENT:
            dispatch(commentActions.remove(self.annotationTypeLocalId));
            break;
        }

        // Prepare to create the new annotation type
        switch(annotationTypeData[newType].format) {
        case annotationFormats.GENE_TERM:
            toAdd = geneTermActions.addNew(newType);
            break;
        case annotationFormats.GENE_GENE:
            toAdd = geneGeneActions.addNew();
            break;
        case annotationFormats.COMMENT:
            toAdd = commentActions.addNew();
            break;
        }

        // Create the new annotation type
        dispatch(toAdd);

        // Link the newly created annotationType to the annotation
        return dispatch({
            type: actions.CHANGE_ANNOTATION_TYPE,
            localId: localId,
            newAnnotationType: newType,
            newAnnotationTypeLocalId: toAdd.localId,
        });
    };
}

export function updateAnnotationData(localId, data) {
    return (dispatch, getState) => {
        const state = getState();
        const self = annotationSelector(state, localId);

        switch(annotationTypeData[self.annotationType].format) {
        case annotationFormats.GENE_TERM:
            return dispatch(geneTermActions.update(self.annotationTypeLocalId, data));
        case annotationFormats.GENE_GENE:
            return dispatch(geneGeneActions.update(self.annotationTypeLocalId, data));
        case annotationFormats.COMMENT:
            return dispatch(commentActions.update(self.annotationTypeLocalId, data));
        }
    };
}

export function addEvidenceWith(localId) {
    return (dispatch, getState) => {
        const state = getState();
        const self = annotationSelector(state, localId);

        switch(annotationTypeData[self.annotationType].format) {
        case annotationFormats.GENE_TERM:
            return dispatch(geneTermActions.addEvidenceWith(self.annotationTypeLocalId));
        }
    };
}

export function removeEvidenceWith(localId, evidenceWithId) {
    return (dispatch, getState) => {
        const state = getState();
        const self = annotationSelector(state, localId);

        switch(annotationTypeData[self.annotationType].format) {
        case annotationFormats.GENE_TERM:
            return dispatch(geneTermActions.removeEvidenceWith(self.annotationTypeLocalId, evidenceWithId));
        }
    };
}

export function updateEvidenceWith(localId, data) {
    return (dispatch, getState) => {
        const state = getState();
        const self = annotationSelector(state, localId);

        switch(annotationTypeData[self.annotationType].format) {
        case annotationFormats.GENE_TERM:
            return dispatch(geneTermActions.updateEvidenceWith(self.annotationTypeLocalId, data));
        }
    };
}

export function clearEvidenceWith(localId) {
    return (dispatch, getState) => {
        const state = getState();
        const self = annotationSelector(state, localId);

        switch(annotationTypeData[self.annotationType].format) {
        case annotationFormats.GENE_TERM:
            return dispatch(geneTermActions.clearEvidenceWith(self.annotationTypeLocalId));
        }
    };
}