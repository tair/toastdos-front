"use strict";

import {
    name,
    annotationTypeData,
    annotationFormats
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

export function hasValidGenes(state) {
    let geneIndex = state.submission.geneIndex;
    let geneOrder = state.submission.geneOrder;
    for(let i = 0; i < geneOrder.length; i++) {
        if(geneIndex[geneOrder[i]].finalized) {
            return true;
        }
        return false;
    }
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

export const canSubmit = createSelector(
  publicationSelector,
  geneListSelector,
  annotationListSelector,
  s => (s[name].submitting),
  (pub, genes, annotations, isSubmitting) => (
      !!pub &&
      genes.some(g => g.finalized) &&
      (annotations.length > 0) &&
      !isSubmitting
  )
);

export function submissionBodySelector(state) {

    const geneIndex = state[name].geneIndex;

    const geneList = geneListSelector(state);

    const annotationList = state[name].annotationOrder.map(
        aid => state[name].annotationIndex[aid]
    );
    
    const evidenceWithMap = evidenceWithSelector(state);

    let submissionData = {
        publicationId: state[name].publicationIdValue,
        genes: [],
        annotations: [],
    };

    submissionData.genes = geneList
        .filter(g => g.finalized) // filter out non-finalized
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
            console.log(a.data);
            annotation.data = {
                locusName: geneIndex[a.data.geneLocalId].finalizedLocusName,
                method: (a.data.methodId !== null ? {id: a.data.methodId} : {name: a.data.methodName}),
                keyword: (a.data.keywordId !== null ? {id: a.data.keywordId} : {name: a.data.keywordName}),
                evidenceWith: a.data.evidenceWithOrder.map(evidenceWithLocalId => evidenceWithMap[evidenceWithLocalId].locusName)
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

