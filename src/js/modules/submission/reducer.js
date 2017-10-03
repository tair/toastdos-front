"use strict";

import * as actions from "./actionTypes";
import { 
        annotationTypes,
        annotationTypeData,
        annotationFormats 
    } from './constants';

const defaultState = {
    publicationIdValue: "",
    geneIndex: {
        "init": {
            localId: "init",
            finalizedLocusName: "",
            finalizedGeneSymbol: "",
            finalizedFullName: "",
            finalized: false,
            validating: false,
            validationError: ""
        }
    },
    geneOrder: ["init"],
    annotationIndex: {},
    annotationOrder: [],
    submitting: false,
    submitted: false,
    submissionError: "",
    keywordSearchResults: [],
    searchingKeywords: false
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
            finalizedGeneSymbol: "",
            finalizedFullName: "",
            finalized: false,
            validating: false,
            validationError: ""
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
        newState = {
            geneIndex: Object.assign({}, state.geneIndex),
        };
        newState.geneIndex[action.localId].validationError = '';
        newState.geneIndex[action.localId].validating = true;
        return Object.assign({}, state, newState);
    case actions.VALIDATE_GENE_SUCCESS:
        newState = {
            geneIndex: Object.assign({}, state.geneIndex),
        };

        newState.geneIndex[action.localId].validating = false;

        newState.geneIndex[action.localId].finalized = true;
        newState.geneIndex[action.localId].validationError = '';

        newState.geneIndex[action.localId].finalizedLocusName = action.geneData.locusName;
        newState.geneIndex[action.localId].finalizedGeneSymbol = action.geneData.geneSymbol;
        newState.geneIndex[action.localId].finalizedFullName = action.geneData.fullName;
        

        return Object.assign({}, state, newState);
    case actions.VALIDATE_GENE_FAIL:
        newState = {
            geneIndex: Object.assign({}, state.geneIndex),
        };

        newState.geneIndex[action.localId].validationError = action.error;

        newState.geneIndex[action.localId].validating = false;
        

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
                keywordName: "",
                keywordId: null,
                methodName: "",
                methodId: null,
                methodEvidenceCode: null,
                evidenceWithIndex: {
                    "init": {
                        finalized: false,
                        isValid: false,
                        locusName: ""
                    }
                },
                evidenceWithOrder: ["init"]
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

        switch(annotationTypeData[action.newAnnotationType].format) {
        case annotationFormats.GENE_TERM:
            newState.annotationIndex[action.localId].annotationType = action.newAnnotationType;
            newState.annotationIndex[action.localId].data = {
                geneLocalId: ((state.geneOrder.length > 0) ? state.geneOrder[0] : null),
                keywordName: "",
                keywordId: null,
                methodName: "",
                methodId: null,
                methodEvidenceCode: null
            };
            break;
        case annotationFormats.GENE_GENE:
            newState.annotationIndex[action.localId].annotationType = action.newAnnotationType;
            newState.annotationIndex[action.localId].data = {
                gene1LocalId: ((state.geneOrder.length) > 0 ? state.geneOrder[0] : null),
                gene2LocalId: ((state.geneOrder.length) > 0 ? state.geneOrder[0] : null),
                methodName: "",
                methodId: null,
                methodEvidenceCode: null
            };
            break;
        case annotationFormats.COMMENT:
            newState.annotationIndex[action.localId].annotationType = action.newAnnotationType;
            newState.annotationIndex[action.localId].data = {
                geneLocalId: ((state.geneOrder.length) > 0 ? state.geneOrder[0] : null),
                comment: ""
            };
            break;
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
    case actions.SUBMIT_SUCCESS:
        return Object.assign({}, state, {
            submitting: false,
            submitted: true
        });
    case actions.SUBMIT_FAIL:
        return Object.assign({}, state, {
            submitting: false,
            submitted: false,
            submissionError: action.error
        });
    case actions.RESET_SUBMISSION:
        return Object.assign({}, state, {
            publicationIdValue: "",
            geneIndex: {},
            geneOrder: [],
            annotationIndex: {},
            annotationOrder: [],
            submitting: false,
            submitted: false,
            submissionError: ""
        });
    case actions.ATTEMPT_KEYWORD_SEARCH:
        return Object.assign({}, state, {
            searchingKeywords: true
        });
    case actions.KEYWORD_SEARCH_SUCCESS:
        return Object.assign({}, state, {
            searchingKeywords: false,
            keywordSearchResults: action.results
        });
    case actions.KEYWORD_SEARCH_FAIL:
        return Object.assign({}, state, {
            searchingKeywords: false,
            keywordSearchResults: []
        });
    case actions.CLEAR_KEYWORD_SEARCH:
        return Object.assign({}, state, {
            searchingKeywords: false,
            keywordSearchResults: []
        });
    case actions.ADD_EVIDENCE_WITH:
        let annotation = state.annotationIndex[action.annotationId];
        return {
            ...state,
            annotationIndex: {
                [action.annotationId]: {
                    ...annotation,
                    data: {
                        ...annotation.data,
                        evidenceWithIndex: {
                            ...annotation.data.evidenceWithIndex,
                            [action.newEvidenceWithId]: {
                                finalized: false,
                                isValid: false,
                                locusName: ""
                            }
                        },
                        evidenceWithOrder: annotation.data.evidenceWithOrder
                            .concat(action.newEvidenceWithId)
                    }
                }
            }
        };
    case actions.VALIDATE_EVIDENCE_WITH_SUCCESS:
        let annotationSuccess = state.annotationIndex[action.annotationId];
        return {
            ...state,
            annotationIndex: {
                [action.annotationId]: {
                    ...annotationSuccess,
                    data: {
                        ...annotationSuccess.data,
                        evidenceWithIndex: {
                            ...annotationSuccess.data.evidenceWithIndex,
                            [action.evidenceWithId]: {
                                ...annotationSuccess.data.evidenceWithIndex[action.evidenceWithId],
                                finalized: true,
                                isValid: true,
                            }
                        }
                    }
                }
            }
        };
    case actions.VALIDATE_EVIDENCE_WITH_FAIL:
        let annotationFail = state.annotationIndex[action.annotationId];
        return {
            ...state,
            annotationIndex: {
                [action.annotationId]: {
                    ...annotationFail,
                    data: {
                        ...annotationFail.data,
                        evidenceWithIndex: {
                            ...annotationFail.data.evidenceWithIndex,
                            [action.evidenceWithId]: {
                                ...annotationFail.data.evidenceWithIndex[action.evidenceWithId],
                                finalized: true,
                                isValid: false,
                            }
                        }
                    }
                }
            }
        };
    default:
        return state;
    }
}
