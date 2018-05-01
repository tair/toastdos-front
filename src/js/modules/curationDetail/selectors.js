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
    annotationReviewed,
    orderHasPendingAnnotations,
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

export const submissionId = state => state[name].submissionId;
export const publicationLocalId = state => state[name].publicationLocalId;
export const geneOrder = state => state[name].geneOrder;
export const annotationOrder = state => state[name].annotationOrder;
export const submitting = state => state[name].submitting;
export const submitted = state => state[name].submitted;
export const previewing = state => state[name].previewing;
export const errorMessage = state => `${state[name].submissionError}`;
export const submitter = state => state[name].submitter;
export const submittedAt = state => state[name].submittedAt;
export const reviewValidated = state =>state[name].reviewValidated;

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
        !annotations.find(localId => !annotationValidSelector(state, localId, true))
);

export const annotationListReviewed = createSelector(
    state => state,
    annotationOrder,
    // Return true if all annotations are reviewed
    (state, annotations) =>
        !annotations.find(localId => !annotationReviewed(state, localId))
);


export const hasPendingAnnotations = (state) =>
    orderHasPendingAnnotations(state, annotationOrder(state));

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
            id: a.annotationId,
            status: a.annotationStatus,
            type: a.annotationType,
            data: {}
        };

        let ca, gt, gg, evidenceWith;
        switch(annotationTypeData[a.annotationType].format) {
        case annotationFormats.COMMENT:
            ca = commentAnnotationSelector(state, a.annotationTypeLocalId);
            annotation.data = {
                locusName: geneSelector(state, ca.geneLocalId).finalizedLocusName,
                text: ca.comment
            };
            break;
        case annotationFormats.GENE_TERM:
            gt = geneTermAnnotationSelector(state, a.annotationTypeLocalId);
            annotation.data = {
                locusName: geneSelector(state, gt.geneLocalId).finalizedLocusName,
                method: (gt.methodId !== null ? {id: gt.methodId} : {name: gt.methodName}),
                keyword: (gt.keywordId !== null ? {id: gt.keywordId} : {name: gt.keywordName}),
                isEvidenceWithOr: true,
            };
            evidenceWith = evidenceWithValidListSelector(state, gt.evidenceWithOrder).map(ew => ew.locusName);
            if (evidenceWith.length > 0) {
                annotation.data.evidenceWith = evidenceWith;
                if (evidenceWith.length > 1) {
                    if (gt.evidenceWithRelation == "OR") {
                        annotation.data.isEvidenceWithOr = true;
                    } else {
                        annotation.data.isEvidenceWithOr = false;
                    }
                }
            }
            break;
        case annotationFormats.GENE_GENE:
            gg = geneGeneAnnotationSelector(state, a.annotationTypeLocalId);
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

