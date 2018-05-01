"use strict";

import { createSelector } from 'reselect';
import {
    name,
    annotationFormats,
    annotationTypeData,
    annotationStatusFormats
} from './constants';
import { commentAnnotationValidSelector } from 'domain/commentAnnotation/selectors';
import {
    geneTermAnnotationValidSelector,
    geneTermAnnotationValidIdSelector,
} from 'domain/geneTermAnnotation/selectors';
import {
    geneGeneAnnotationValidSelector,
    geneGeneAnnotationValidIdSelector,
} from 'domain/geneGeneAnnotation/selectors';

export const annotationSelector = (state, localId) => state.domain[name].byLocalId[localId];

export const annotationTypeSelector = createSelector(
    annotationSelector,
    annotation => annotation.annotationType
);

export const annotationStatus = createSelector(
    annotationSelector,
    (annotation) => annotation.annotationStatus
);

export const annotationPending = createSelector(
    annotationStatus,
    (status) => (
        status && status == annotationStatusFormats.PENDING
    )
);

export const orderHasPendingAnnotations = (state, annotations) => (
    annotations.find(
        localId => annotationPending(state, localId)
    ) != undefined
);

export const annotationListSelector = (state, annotations) =>
    annotations.map(localId => annotationSelector(state, localId));

export const pendingListSelector = (state, annotations) => (
    annotations.filter(
        localId => annotationPending(state, localId)
    ).map(
        localId => annotationSelector(state, localId)
    )
);

export const reviewedListSelector = (state, annotations) =>
    annotationListSelector(state, annotations).filter(
        annotation => (annotation.annotationStatus &&
            annotation.annotationStatus != annotationStatusFormats.PENDING)
    );

export const isCuration = (state, localId, curating) => curating;

export const annotationTypeValidSelector = createSelector(
    state => state,
    annotationSelector,
    annotationTypeSelector,
    annotationStatus,
    isCuration,
    (state, a, type, status, c) => {
        switch(annotationTypeData[type].format) {
        case annotationFormats.COMMENT:
            return commentAnnotationValidSelector(state, a.annotationTypeLocalId);
        case annotationFormats.GENE_TERM:
            return c && status == annotationStatusFormats.ACCEPTED?
                geneTermAnnotationValidIdSelector(state, a.annotationTypeLocalId) :
                geneTermAnnotationValidSelector(state, a.annotationTypeLocalId);
        case annotationFormats.GENE_GENE:
            return c && status == annotationStatusFormats.ACCEPTED?
                geneGeneAnnotationValidIdSelector(state, a.annotationTypeLocalId) :
                geneGeneAnnotationValidSelector(state, a.annotationTypeLocalId);
        default:
            return false;
        }
    }
);

export const annotationValidSelector = createSelector(
    annotationSelector,
    annotationTypeValidSelector,
    (annotation, typeValid) => (annotation && typeValid)
);
