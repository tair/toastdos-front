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
            publicationValidationError: action.message,
        };
    case actions.VALIDATE_PUBLICATION_ERROR:
        return {
            ...state,
            publicationValidationState: validationStates.ERROR_VALIDATING,
            publicationValidationError: action.message,
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

        newState.geneIndex[action.localId].validationError = action.message;
        newState.geneIndex[action.localId].validationState = validationStates.INVALID;
        newState.geneIndex[action.localId].finalizedLocusName = '';
        
        return Object.assign({}, state, newState);
    case actions.VALIDATE_GENE_ERROR:
        newState = {
            geneIndex: Object.assign({}, state.geneIndex),
        };

        newState.geneIndex[action.localId].validationError = action.message;
        newState.geneIndex[action.localId].validationState = validationStates.ERROR_VALIDATING;
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
                methodName: "",
                methodId: null,
                methodEvidenceCode: null,
                evidenceWithIndex: {
                    ["init" + action.localId]: {
                        validationState: validationStates.NOT_VALIDATED,
                        validationError: '',
                        locusName: ""
                    }
                },
                evidenceWithOrder: ["init" + action.localId]
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
                methodEvidenceCode: null,
                evidenceWithIndex: {
                    ["init" + action.localId]: {
                        validationState: validationStates.NOT_VALIDATED,
                        validationError: '',
                        locusName: ""
                    }
                },
                evidenceWithOrder: ["init" + action.localId]
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
            annotationIndex: {
                [action.annotationId]: {
                    ...annotation,
                    data: {
                        ...annotation.data,
                        evidenceWithIndex: {
                            ...annotation.data.evidenceWithIndex,
                            [action.newEvidenceWithId]: {
                                validationState: validationStates.NOT_VALIDATED,
                                validationError: '',
                                locusName: ""
                            }
                        },
                        evidenceWithOrder: annotation.data.evidenceWithOrder
                            .concat(action.newEvidenceWithId)
                    }
                }
            }
        };
    case actions.ATTEMPT_VALIDATE_EVIDENCE_WITH:
        let annotationAttemptEvidenceWith = state.annotationIndex[action.annotationId];
        return {
            ...state,
            annotationIndex: {
                ...state.annotationIndex,
                [action.annotationId]: {
                    ...annotationAttemptEvidenceWith,
                    data: {
                        ...annotationAttemptEvidenceWith.data,
                        evidenceWithIndex: {
                            ...annotationAttemptEvidenceWith.data.evidenceWithIndex,
                            [action.evidenceWithId]: {
                                ...annotationAttemptEvidenceWith.data.evidenceWithIndex[action.evidenceWithId],
                                validationState: validationStates.VALIDATING,
                                validationError: '',
                            }
                        }
                    }
                }
            }
        };
    case actions.VALIDATE_EVIDENCE_WITH_SUCCESS:
        let annotationSuccess = state.annotationIndex[action.annotationId];
        return {
            ...state,
            annotationIndex: {
                ...state.annotationIndex,
                [action.annotationId]: {
                    ...annotationSuccess,
                    data: {
                        ...annotationSuccess.data,
                        evidenceWithIndex: {
                            ...annotationSuccess.data.evidenceWithIndex,
                            [action.evidenceWithId]: {
                                ...annotationSuccess.data.evidenceWithIndex[action.evidenceWithId],
                                validationState: validationStates.VALID,
                                validationError: '',
                                locusName: action.locusName,
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
                ...state.annotationIndex,
                [action.annotationId]: {
                    ...annotationFail,
                    data: {
                        ...annotationFail.data,
                        evidenceWithIndex: {
                            ...annotationFail.data.evidenceWithIndex,
                            [action.evidenceWithId]: {
                                ...annotationFail.data.evidenceWithIndex[action.evidenceWithId],
                                validationState: validationStates.INVALID,
                                validationMessage: action.message,
                                locusName: '',
                            }
                        }
                    }
                }
            }
        };
    case actions.VALIDATE_EVIDENCE_WITH_ERROR:
        let annotationError = state.annotationIndex[action.annotationId];
        return {
            ...state,
            annotationIndex: {
                ...state.annotationIndex,
                [action.annotationId]: {
                    ...annotationError,
                    data: {
                        ...annotationError.data,
                        evidenceWithIndex: {
                            ...annotationError.data.evidenceWithIndex,
                            [action.evidenceWithId]: {
                                ...annotationError.data.evidenceWithIndex[action.evidenceWithId],
                                validationState: validationStates.ERROR_VALIDATING,
                                validationError: action.message,
                                locusName: '',
                            }
                        }
                    }
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
