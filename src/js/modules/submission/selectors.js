"use strict";

import {
    name,
    annotationTypeData,
    annotationFormats
} from './constants';
import { createSelector } from 'reselect';

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

const publicationSelector = state => state[name].publicationIdValue;

const geneListSelector = state => state[name].geneOrder.map(
    gid => state[name].geneIndex[gid]
);

const annotationListSelector = state => state[name].annotationOrder.map(
    aid => state[name].annotationIndex[aid]
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
            annotation.data = {
                locusName: geneIndex[a.data.geneLocalId].finalizedLocusName,
                method: {
                    name: a.data.methodName
                },
                keyword: {
                    name: a.data.keywordName
                }
            };
            break;
        case annotationFormats.GENE_GENE:
            annotation.data = {
                locusName: geneIndex[a.data.gene1LocalId].finalizedLocusName,
                locusName2: geneIndex[a.data.gene2LocalId].finalizedLocusName,
                method: {
                    name: a.data.methodName
                }
            };
            break;
        }

        return annotation;
    });


    return submissionData;

}

