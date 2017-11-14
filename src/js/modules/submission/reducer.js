"use strict";

import * as actions from "./actionTypes";
import { 
        annotationTypes,
        annotationTypeData,
        annotationFormats,
        validationStates,
    } from './constants';

function getDefaultState() {
    return {
        publicationIdValue: "",
        publicationInfo: {
            author: "",
            url: "",
            title: "",
        },
        publicationValidationState: validationStates.NOT_VALIDATED,
        publicationValidationError: "",
        geneIndex: {
            "init": {
                localId: "init",
                finalizedLocusName: "",
                finalizedGeneSymbol: "",
                finalizedFullName: "",
                validationState: validationStates.NOT_VALIDATED,
                validationError: ""
            }
        },
        geneOrder: ["init"],
        annotationIndex: {},
        annotationOrder: [],
        evidenceWithIndex: {},
        submitting: false,
        submitted: false,
        previewing: false,
        submissionError: "",
        keywordSearchResults: [],
        searchingKeywords: false
    }
}

const defaultState = getDefaultState();

export default function (state = defaultState, action) {
    let newState = {};
    switch (action.type) {
    case actions.PUBLICATION_ID_CHANGED:
        return Object.assign({}, state, {
            publicationIdValue: action.value
        });
    case actions.ATTEMPT_VALIDATE_PUBLICATION:
        return {
            ...state,
            publicationIdValue: '',
            publicationValidationState: validationStates.VALIDATING,
            publicationValidationError: '',
            publicationInfo: {
                author: '',
                url: '',
                title: '',
            },
        };
    case actions.VALIDATE_PUBLICATION_SUCCESS:
        return {
            ...state,
            publicationIdValue: action.publicationId,
            publicationValidationState: validationStates.VALID,
            publicationValidationError: '',
            publicationInfo: {
                author: action.data.author,
                url: action.data.url,
                title: action.data.title,
            },
        };
    case actions.VALIDATE_PUBLICATION_FAIL:
        return {
            ...state,
            publicationValidationState: validationStates.INVALID,
            publicationValidationError: action.error,
        };
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
            validationState: validationStates.NOT_VALIDATED,
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

    case actions.CLEAR_GENE: 
        newState = {
            geneIndex: Object.assign({}, state.geneIndex)
        }

        newState.geneIndex[action.geneId] = {
            localId: action.geneId,
            finalizedLocusName: "",
            finalizedGeneSymbol: "",
            finalizedFullName: "",
            validationState: validationStates.NOT_VALIDATED,
            validationError: ""
        };

        return Object.assign({}, state, newState);
    case actions.ATTEMPT_VALIDATE_GENE:
        newState = {
            geneIndex: Object.assign({}, state.geneIndex),
        };
        newState.geneIndex[action.localId].validationError = '';
        newState.geneIndex[action.localId].validationState = validationStates.VALIDATING;

        return Object.assign({}, state, newState);
    case actions.UPDATE_GENE_DATA:
        return {
            ...state,
            geneIndex: {
                ...state.geneIndex,
                [action.localId]: {
                    ...state.geneIndex[action.localId],
                    ...action.geneData
                }
            }
        };
    case actions.VALIDATE_GENE_SUCCESS:
        newState = {
            geneIndex: Object.assign({}, state.geneIndex),
        };

        newState.geneIndex[action.localId].validationError = '';
        newState.geneIndex[action.localId].validationState = validationStates.VALID;
        newState.geneIndex[action.localId].finalizedLocusName = action.locusName;

        return Object.assign({}, state, newState);
    case actions.VALIDATE_GENE_FAIL:
        newState = {
            geneIndex: Object.assign({}, state.geneIndex),
        };

        newState.geneIndex[action.localId].validationError = action.error;
        newState.geneIndex[action.localId].validationState = validationStates.INVALID;
        newState.geneIndex[action.localId].finalizedLocusName = '';
        
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
                keywordExternalId: "",
                methodName: "",
                methodId: null,
                methodExternalId: "",
                methodEvidenceCode: null,
                evidenceWithOrder: [],
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
                keywordExternalId: "",
                methodName: "",
                methodId: null,
                methodExternalId: "",
                methodEvidenceCode: null,
                evidenceWithOrder: [],
            };
            break;
        case annotationFormats.GENE_GENE:
            newState.annotationIndex[action.localId].annotationType = action.newAnnotationType;
            newState.annotationIndex[action.localId].data = {
                gene1LocalId: ((state.geneOrder.length) > 0 ? state.geneOrder[0] : null),
                gene2LocalId: ((state.geneOrder.length) > 0 ? state.geneOrder[0] : null),
                methodName: "",
                methodId: null,
                methodExternalId: "",
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
            submitted: true,
            submissionError: "",
        });
    case actions.SUBMIT_FAIL:
        return Object.assign({}, state, {
            submitting: false,
            submitted: false,
            submissionError: action.error,
            previewing: false,
        });
    case actions.RESET_SUBMISSION:
        return getDefaultState();
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
            evidenceWithIndex: {
                ...state.evidenceWithIndex,
                [action.newEvidenceWithId]: {
                    ...state.evidenceWithIndex[action.newEvidenceWithId],
                    localId: action.newEvidenceWithId,
                    validationState: validationStates.NOT_VALIDATED,
                    validationError: '',
                    locusName: ""
                }
            },
            annotationIndex: {
                ...state.annotationIndex,
                [action.annotationId]: {
                    ...annotation,
                    data: {
                        ...annotation.data,
                        evidenceWithOrder: annotation.data.evidenceWithOrder
                            .concat(action.newEvidenceWithId)
                    }
                }
            }
        };
    case actions.ATTEMPT_VALIDATE_EVIDENCE_WITH:
        newState = {
            evidenceWithIndex: Object.assign({},state.evidenceWithIndex)
        }
        
        newState.evidenceWithIndex[action.evidenceWithId].validationState = validationStates.VALIDATING;
        newState.evidenceWithIndex[action.evidenceWithId].validationError = '';

        return Object.assign({},state,newState);
    case actions.REMOVE_EVIDENCE_WITH:

        newState = {
            evidenceWithIndex: Object.assign({}, state.evidenceWithIndex),
            annotationIndex: Object.assign({}, state.annotationIndex)
        }

        delete newState.evidenceWithIndex[action.evidenceWithId];

        let an = state.annotationIndex[action.annotationId];

        newState.annotationIndex[action.annotationId].data.evidenceWithOrder = 
            an.data.evidenceWithOrder.filter(e => e != action.evidenceWithId);

        return Object.assign({},state, newState);
    case actions.UPDATE_EVIDENCE_WITH:
        newState = {
            evidenceWithIndex: Object.assign({}, state.evidenceWithIndex),
        };

        newState.evidenceWithIndex[action.evidenceWithId] = action.data;

        return Object.assign({}, state, newState);
    case actions.CLEAR_EVIDENCE_WITH:
        newState = {
            evidenceWithIndex: Object.assign({},state.evidenceWithIndex)
        }
        
        newState.evidenceWithIndex[action.evidenceWithId].validationState = validationStates.NOT_VALIDATED;
        newState.evidenceWithIndex[action.evidenceWithId].locusName = "";

        return Object.assign({}, state, newState);
    case actions.VALIDATE_EVIDENCE_WITH_SUCCESS:
        return {
            ...state,
            evidenceWithIndex: {
                ...state.evidenceWithIndex,
                [action.evidenceWithId]: {
                    ...state.evidenceWithIndex[action.evidenceWithId],
                    validationState: validationStates.VALID,
                    validationError: '',
                    locusName: action.locusName,
                }
            }
        };
    case actions.VALIDATE_EVIDENCE_WITH_FAIL:
        return {
            ...state,
            evidenceWithIndex: {
                ...state.evidenceWithIndex,
                [action.evidenceWithId]: {
                    ...state.evidenceWithIndex[action.evidenceWithId],
                    validationState: validationStates.INVALID,
                    validationError: action.error,
                    locusName: '',
                }
            }
        };
    case actions.PREVIEW:
        return {
            ...state,
            previewing: true,
            submissionError: ""
        };
    case actions.EDIT:
        return {
            ...state,
            previewing: false
        };
    default:
        return state;
    }
}
