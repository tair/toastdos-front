"use strict";

import * as actions from "./actionTypes";

const defaultState = {
    publicationIdValue: "",
    geneIndex: {},
    geneOrder: []
};


export default function (state = defaultState, action) {
    let newState = {};
    switch (action.type) {
    case actions.PUBLICATION_ID_CHANGED:
        return Object.assign({}, state, {
            publicationIdValue: action.value
        });
    case actions.ADD_NEW_GENE:
        newState = {
            geneIndex: Object.assign({}, state.geneIndex),
            geneOrder: state.geneOrder.slice()
        };

        newState.geneIndex[action.localId] = {
            localId: action.localId,
            finalizedLocusName: "",
            finalizedGeneSynmbol: "",
            finalizedFullName: "",
            finalized: false,
            validating: false
        };

        newState.geneOrder.push(action.localId);

        return Object.assign({}, state, newState);
    case actions.REMOVE_GENE:
        newState = {
            geneIndex: Object.assign({}, state.geneIndex),
            geneOrder: state.geneOrder.filter(e => e !== action.localId)
        };

        delete newState.geneIndex[action.localId];
        // newState.gene.splice(action.index, 1);

        return Object.assign({}, state, newState);
    case actions.ATTEMPT_VALIDATE_GENE:
        // todo
        newState = {
            geneIndex: Object.assign({}, state.geneIndex),
        };

        newState.geneIndex[action.localId].validating = true;
        return Object.assign({}, state, newState);
    case actions.VALIDATE_GENE_RESULT:
        // todo 
        newState = {
            geneIndex: Object.assign({}, state.geneIndex),
        };

        newState.geneIndex[action.localId].validating = false;
        newState.geneIndex[action.localId].finalized = true;

        newState.geneIndex[action.localId].finalizedLocusName = action.geneData.locusName;
        newState.geneIndex[action.localId].finalizedGeneSynmbol = action.geneData.geneSymbol;
        newState.geneIndex[action.localId].finalizedFullName = action.geneData.fullName;
        

        return Object.assign({}, state, newState);
    case actions.EDIT_GENE_DATA:
        newState = {
            geneIndex: Object.assign({}, state.geneIndex)
        };

        newState.geneIndex[action.localId].finalized = false;

        return Object.assign({}, state, newState);
    default:
        return state;
    }
}
