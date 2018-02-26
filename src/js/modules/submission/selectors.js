"use strict";

import { name } from './constants';
import {
    annotationTypeData,
    annotationFormats,
} from 'domain/annotation/constants';
import { createSelector } from 'reselect';
import { validationStates } from 'lib/validation';
import {
    publicationSelector,
    publicationValidSelector
} from 'domain/publication/selectors';
import {
    annotationSelector,
    annotationValidSelector,
} from 'domain/annotation/selectors';
import {
    geneSelector,
    geneListSelector,
    geneValidSelector,
} from 'domain/gene/selectors';
import {
    evidenceWithValidListSelector
} from 'domain/evidenceWith/selectors';

import { commentAnnotationSelector } from 'domain/commentAnnotation/selectors';
import { geneTermAnnotationSelector } from 'domain/geneTermAnnotation/selectors';
import { geneGeneAnnotationSelector } from 'domain/geneGeneAnnotation/selectors';

export const publicationLocalId = state => state[name].publicationLocalId;
export const geneOrder = state => state[name].geneOrder;
export const annotationOrder = state => state[name].annotationOrder;
export const submitting = state => state[name].submitting;
export const submitted = state => state[name].submitted;
export const previewing = state => state[name].previewing;
export const errorMessage = state => `${state[name].submissionError}`;

export const submissionSelector = state => state[name];

export const annotationListSelector = createSelector(
    state => state,
    annotationOrder,
    (state, annotations) =>
        annotations.map(localId => annotationSelector(state, localId))
);

export const annotationListValidSelector = createSelector(
    state => state,
    annotationOrder,
    // Return true if all annotations are valid
    (state, annotations) =>
        annotations.length > 0 &&
        !annotations.find(localId => !annotationValidSelector(state, localId))
);

export const genesSelector = createSelector(
    state => state,
    geneOrder,
    (state, genes) => geneListSelector(state, genes)
);

export const hasValidGene = createSelector(
    state => state,
    geneOrder,
    // Return true if at least one gene is valid
    (state, genes) =>
        genes.length > 0 &&
        undefined !== genes.find(localId => geneValidSelector(state, localId))
);

export const geneListValidSelector = createSelector(
    state => state,
    geneOrder,
    // Return true if all genes are valid
    (state, genes) =>
        genes.length > 0 &&
        !genes.find(localId => !geneValidSelector(state, localId))
);

export const canSubmit = createSelector(
    state => publicationValidSelector(state, publicationLocalId(state)),
    geneListValidSelector,
    annotationListValidSelector,
    submitting,
    (pValid, gValid, aValid, isSubmitting) => (pValid && gValid && aValid && !isSubmitting)
);

export function submissionBodySelector(state) {

    const geneList = genesSelector(state);
    const annotationList = annotationListSelector(state);

    let submissionData = {
        publicationId: publicationSelector(state, publicationLocalId(state)).idValue,
        genes: [],
        annotations: [],
    };

    submissionData.genes = geneList
        .filter(g => g.validationState === validationStates.VALID) // filter out non-finalized
        .map(g => ({  // map the properties
            locusName: g.finalizedLocusName,
            geneSymbol: g.finalizedGeneSymbol,
            fullName: g.finalizedFullName
        })
    );

    submissionData.annotations = annotationList.map(a => {
        const annotation = {
            type: a.annotationType,
            data: {}
        };

        switch(annotationTypeData[a.annotationType].format) {
        case annotationFormats.COMMENT:
            let ca = commentAnnotationSelector(state, a.annotationTypeLocalId);
            annotation.data = {
                locusName: geneSelector(state, ca.geneLocalId).finalizedLocusName,
                text: ca.comment
            };
            break;
        case annotationFormats.GENE_TERM:
            let gt = geneTermAnnotationSelector(state, a.annotationTypeLocalId)
            annotation.data = {
                locusName: geneSelector(state, gt.geneLocalId).finalizedLocusName,
                method: (gt.methodId !== null ? {id: gt.methodId} : {name: gt.methodName}),
                keyword: (gt.keywordId !== null ? {id: gt.keywordId} : {name: gt.keywordName})
            };
            let evidenceWith = evidenceWithValidListSelector(state, gt.evidenceWithOrder).map(ew => ew.locusName);
            if (evidenceWith.length > 0) {
                annotation.data.evidenceWith = evidenceWith;
                // TODO: Needs backend support for evidenceWithRelation field
                // if (evidenceWith.length > 1) {
                //     annotation.data.evidenceWithRelation = gt.evidenceWithRelation;
                // }
            }
            break;
        case annotationFormats.GENE_GENE:
            let gg = geneGeneAnnotationSelector(state, a.annotationTypeLocalId)
            annotation.data = {
                locusName: geneSelector(state, gg.gene1LocalId).finalizedLocusName,
                locusName2: geneSelector(state, gg.gene2LocalId).finalizedLocusName,
                method: (gg.methodId !== null ? {id: gg.methodId} : {name: gg.methodName})
            };
            break;
        }

        return annotation;
    });

    return submissionData;
}

