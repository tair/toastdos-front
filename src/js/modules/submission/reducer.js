"use strict";

import * as actions from "./actionTypes";
import { 
        annotationTypes,
        annotationTypeData,
        annotationFormats 
    } from './constants';

const defaultState = {
    publicationIdValue: "",
    geneIndex: {},
    geneOrder: [],
    annotationIndex: {},
    annotationOrder: [],
    submitting: false,
    submitted: false
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
    case actions.ADD_NEW_ANNOTATION:
        newState = {
            annotationIndex: Object.assign({}, state.annotationIndex),
            annotationOrder: state.annotationOrder.slice()
        };

        newState.annotationIndex[action.localId] = {
            localId: action.localId,
            annotationType: annotationTypes.MOLECULAR_FUNCTION,
            data: {
                geneLocalId: ((state.geneOrder.length) > 0 ? state.geneOrder[0] : null),
                keywordId: "",
                methodId: ""
            }
        };

        
        newState.annotationOrder.push(action.localId);

        return Object.assign({}, state, newState);

    case actions.REMOVE_ANNOTATION:
        newState = {
            annotationIndex: Object.assign({}, state.annotationIndex),
            annotationOrder: state.annotationOrder.filter(e => e !== action.localId)
        };

        delete newState.annotationIndex[action.localId];

        return Object.assign({}, state, newState);

    case actions.CHANGE_ANNOTATION_TYPE:
        newState = {
            annotationIndex: Object.assign({}, state.annotationIndex)
        };
        newState.annotationIndex[action.localId].annotationType = action.newAnnotationType;

        switch(annotationTypeData[action.newAnnotationType].format) {
        case annotationFormats.GENE_TERM:
            newState.annotationIndex[action.localId].data = {
                geneLocalId: ((state.geneOrder.length > 0) ? state.geneOrder[0] : null),
                keywordId: "",
                methodId: ""
            };
            break;
        case annotationFormats.GENE_GENE:
            newState.annotationIndex[action.localId].data = {
                gene1LocalId: ((state.geneOrder.length) > 0 ? state.geneOrder[0] : null),
                gene2LocalId: ((state.geneOrder.length) > 0 ? state.geneOrder[0] : null),
                methodId: ""
            };
            break;
        default:
            newState.annotationIndex[action.localId].data = {
                geneLocalId: ((state.geneOrder.length) > 0 ? state.geneOrder[0] : null),
                comment: ""
            };
        }

        return Object.assign({}, state, newState);

    case actions.UPDATE_ANNOTATION_DATA:
        newState = {
            annotationIndex: Object.assign({}, state.annotationIndex),
            annotationOrder: state.annotationOrder.slice()
        };

        newState.annotationIndex[action.localId].data = action.data;

        return Object.assign({}, state, newState);

    case actions.ATTEMPT_SUBMIT:
        return Object.assign({}, state, {
            submitting: true
        });
    case actions.SUBMIT_RESULT:
        //todo
        return Object.assign({}, state, {
            submitting: false,
            submitted: true
        });
    case actions.SUBMIT_FAIL:
        //todo
        return Object.assign({}, state, {
            submitting: false,
            submitted: false
        });
    case actions.RESET_SUBMISSION:
        return Object.assign({}, state, {
            publicationIdValue: "",
            geneIndex: {},
            geneOrder: [],
            annotationIndex: {},
            annotationOrder: [],
            submitting: false,
            submitted: false
        });
    default:
        return state;
    }
}
