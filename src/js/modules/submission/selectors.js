"use strict";

import {
    name,
    annotationTypeData,
    annotationFormats,
    validationStates,
} from './constants';
import { createSelector } from 'reselect';

export const fetchingSuggestionsSelector = state => state[name].searchingKeywords;

const keywordSearchResults = state => state[name].keywordSearchResults;
export const keywordSearchIndexSelector = createSelector(
    keywordSearchResults,
    results => results.reduce((acc, cur) => {
        let value;
        // TODO: use different object or selector here.
        if (cur.hasOwnProperty('evidence_code')) {
            value = {
                name: cur.name,
                evidence_code: cur.evidence_code
            };
        } else {
            value = cur.name;
        }
        acc[cur.id] = value;
        return acc;
    }, {})
);

export const keywordSearchOrderSelector = createSelector(
    keywordSearchResults,
    results => results.map(v => v.id)
);

// Returns true if the gene list is valid for the given state
export function hasAllValidGenes(state) {
    return geneListValidSelector(state);
}

// Returns true if the gene list contains a valid gene for the given state
export function hasValidGene(state) {
    let hasValidGeneSelector = createSelector(
        geneListSelector,
        (genes) =>
            (genes.length > 0) &&
            genes.some(g => g.validationState === validationStates.VALID)
    );
    return hasValidGeneSelector(state);
}

export const publicationSelector = state => state[name].publicationIdValue;

export const geneListSelector = state => state[name].geneOrder.map(
    gid => state[name].geneIndex[gid]
);

export const annotationListSelector = state => state[name].annotationOrder.map(
    aid => state[name].annotationIndex[aid]
);

export const evidenceWithSelector = createSelector(
    annotationListSelector,
    (annotations) =>         
        Object.assign.apply(null, 
            [{}].concat(annotations
                .filter(a => annotationTypeData[a.annotationType].format ==
                    annotationFormats.GENE_TERM)
                .map(a => a.data.evidenceWithIndex)))
);

export const evidenceWithListSelector = createSelector(
    annotationListSelector,
    (annotations) =>
        [].concat.apply([],
            annotations.filter(a =>
                annotationTypeData[a.annotationType].format == annotationFormats.GENE_TERM)
            .map(a => Object.values(a.data.evidenceWithIndex)))
);

export const publicationValidSelector =
    s => s[name].publicationValidationState === validationStates.VALID
;

export const geneListValidSelector = createSelector(
    geneListSelector,
    (genes) =>
        (genes.length > 0) &&
        genes.every(g => g.validationState === validationStates.VALID)
);

export const annotationListValidSelector = createSelector(
    annotationListSelector,
    (annotations) =>
        (annotations.length > 0) &&
        annotations.every(a => a.data.keywordId != null && a.data.methodId != null)
);

export const evidenceWithValidSelector = createSelector(
    evidenceWithListSelector,
    (evidenceWith) =>
      (!evidenceWith || evidenceWith.every(ew => ew.validationState === validationStates.VALID))
);

export const canSubmit = createSelector(
    publicationValidSelector,
    geneListValidSelector,
    annotationListValidSelector,
    evidenceWithValidSelector,
    s => (s[name].submitting),
    (pValid, gValid, aValid, ewValid, isSubmitting) => (
        pValid &&
        gValid &&
        aValid &&
        ewValid &&
        !isSubmitting
    )
);

export function submissionBodySelector(state) {

    const geneIndex = state[name].geneIndex;

    const geneList = geneListSelector(state);

    const annotationList = state[name].annotationOrder.map(
        aid => state[name].annotationIndex[aid]
    );

    let submissionData = {
        publicationId: state[name].publicationIdValue,
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
            annotation.data = {
                locusName: geneIndex[a.data.geneLocalId].finalizedLocusName,
                text: a.data.comment
            };
            break;
        case annotationFormats.GENE_TERM:
            annotation.data = {
                locusName: geneIndex[a.data.geneLocalId].finalizedLocusName,
                method: (a.data.methodId !== null ? {id: a.data.methodId} : {name: a.data.methodName}),
                keyword: (a.data.keywordId !== null ? {id: a.data.keywordId} : {name: a.data.keywordName})
            };
            break;
        case annotationFormats.GENE_GENE:
            annotation.data = {
                locusName: geneIndex[a.data.gene1LocalId].finalizedLocusName,
                locusName2: geneIndex[a.data.gene2LocalId].finalizedLocusName,
                method: (a.data.methodId !== null ? {id: a.data.methodId} : {name: a.data.methodName})
            };
            break;
        }

        return annotation;
    });


    return submissionData;

}

