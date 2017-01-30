"use strict";

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
