"use strict";

import { createSelector } from 'reselect';
import {
    name,
    annotationFormats,
    annotationTypeData
} from './constants';
import { commentAnnotationValidSelector } from 'domain/commentAnnotation/selectors';
import { geneTermAnnotationValidSelector } from 'domain/geneTermAnnotation/selectors';
import { geneGeneAnnotationValidSelector } from 'domain/geneGeneAnnotation/selectors';

export const annotationSelector = (state, localId) => state.domain[name].byLocalId[localId];

export const annotationTypeSelector = createSelector(
    annotationSelector,
    annotation => annotation.annotationType
);

export const annotationListSelector = (state, annotations) =>
    annotations.map(localId => annotationSelector(state, localId));


export const annotationTypeValidSelector = createSelector(
    state => state,
    annotationSelector,
    annotationTypeSelector,
    (state, a, type) => {
        switch(annotationTypeData[type].format) {
        case annotationFormats.COMMENT:
            return commentAnnotationValidSelector(state, a.annotationTypeLocalId);
        case annotationFormats.GENE_TERM:
            return geneTermAnnotationValidSelector(state, a.annotationTypeLocalId);
        case annotationFormats.GENE_GENE:
            return geneGeneAnnotationValidSelector(state, a.annotationTypeLocalId);
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
