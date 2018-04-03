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
    geneFinalizedLocusNameSelector,
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

export function submissionBodySelector(state, includeKeywordData) {

    const geneList = genesSelector(state);
    const annotationList = annotationListSelector(state);

    let submissionData = {
        publicationId: publicationSelector(state, publicationLocalId(state)).idValue,
        genes: [],
        annotations: [],
    };

    submissionData.genes = geneList
        .filter(g => g && g.validationState === validationStates.VALID) // filter out non-finalized
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

        let ca, gt, gg, evidenceWith;

        switch(annotationTypeData[a.annotationType].format) {
        case annotationFormats.COMMENT:
            ca = commentAnnotationSelector(state, a.annotationTypeLocalId);
            annotation.data = {
                locusName: geneFinalizedLocusNameSelector(state, ca.geneLocalId),
                text: ca.comment
            };
            break;
        case annotationFormats.GENE_TERM:
            gt = geneTermAnnotationSelector(state, a.annotationTypeLocalId);
            annotation.data = {
                locusName: geneFinalizedLocusNameSelector(state, gt.geneLocalId),
                method: (gt.methodId !== null ? {id: gt.methodId} : {name: gt.methodName}),
                keyword: (gt.keywordId !== null ? {id: gt.keywordId} : {name: gt.keywordName}),
                isEvidenceWithOr: true,
            };

            if (includeKeywordData) {
                annotation.data.keyword.name =  gt.keywordName;
                annotation.data.keyword.externalId =  gt.keywordExternalId;
                annotation.data.method.evidenceCode = gt.methodEvidenceCode;
                annotation.data.method.externalId = gt.methodExternalId;
                annotation.data.method.name = gt.methodName;
            }

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
                locusName: geneFinalizedLocusNameSelector(state, gg.gene1LocalId),
                locusName2: geneFinalizedLocusNameSelector(state, gg.gene2LocalId),
                method: (gg.methodId !== null ? {id: gg.methodId} : {name: gg.methodName})
            };

            if (includeKeywordData) {
                annotation.data.method.name = gg.methodName;
                annotation.data.method.externalId = gg.methodExternalId;
            }
            break;
        }

        return annotation;
    });

    return submissionData;
}

