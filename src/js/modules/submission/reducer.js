"use strict";

import * as actions from "./actionTypes";
import { 
        annotationTypes,
        annotationTypeData,
        annotationFormats,
    } from './constants';

function getDefaultGeneState() {
    return {
        localId: "init",
        geneSymbolId: null,
        finalizedLocusName: "",
        finalizedGeneSymbol: "",
        finalizedFullName: "",
        ...getNotValidated(),
    };
}

function getDefaultPublicationState() {
    return {
        idValue: "",
        author: "",
        url: "",
        title: "",
        ...getNotValidated(),
    };
}

function getDefaultState() {
    return {
        publication: getDefaultPublicationState(),
        geneIndex: {
            "init": getDefaultGeneState(),
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
        searchingKeywords: false,
        curating: false,
    }
}

const defaultState = getDefaultState();

export default function (state = defaultState, action) {
    let newState = {};
    switch (action.type) {
    case actions.PUBLICATION_ID_CHANGED:
        return {
            ...state,
            publication: {
                ...state.publication,
                idValue: action.value,
            }
        };
    case actions.ATTEMPT_VALIDATE_PUBLICATION:
        return {
            ...state,
            publication: {
                ...getDefaultPublicationState(),
                ...getValidating(),
            }
        };
    case actions.VALIDATE_PUBLICATION_SUCCESS:
        return {
            ...state,
            publication: {
                ...state.publication,
                ...getValid(),
                idValue: action.publicationId,
                author: action.data.author,
                url: action.data.url,
                title: action.data.title,
            }
        };
    case actions.VALIDATE_PUBLICATION_FAIL:
        return {
            ...state,
            publication: {
                ...state.publication,
                ...getInvalid(action.error),
            }
        };
    case actions.ADD_NEW_GENE:
        return {
            ...state,
            geneIndex: {
                ...state.geneIndex,
                [action.localId]: {
                    ...getDefaultGeneState(),
                    localId: action.localId,
                }
            },
            geneOrder: state.geneOrder.concat(action.localId),
        };
    case actions.REMOVE_GENE:
        newState = {
            geneIndex: Object.assign({}, state.geneIndex),
            geneOrder: state.geneOrder.filter(e => e !== action.localId)
        };

        delete newState.geneIndex[action.localId];

        return Object.assign({}, state, newState);
    case actions.CLEAR_GENE: 
        return {
            ...state,
            geneIndex: {
                ...state.geneIndex,
                [action.geneId]: {
                    ...getDefaultGeneState(),
                    localId: action.geneId,
                }
            }
        };
    case actions.ATTEMPT_VALIDATE_GENE:
        return {
            ...state,
            geneIndex: {
                ...state.geneIndex,
                [action.localId]: {
                    ...state.geneIndex[action.localId],
                    ...getValidating(),
                }
            }
        };
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
        return {
            ...state,
            geneIndex: {
                ...state.geneIndex,
                [action.localId]: {
                    ...state.geneIndex[action.localId],
                    ...getValid(),
                    finalizedLocusName: action.locusName,
                }
            }
        };
    case actions.VALIDATE_GENE_FAIL:
        return {
            ...state,
            geneIndex: {
                ...state.geneIndex,
                [action.localId]: {
                    ...state.geneIndex[action.localId],
                    ...getInvalid(action.error),
                    finalizedLocusName: '',
                }
            }
        };
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
                    ...getNotValidated(),
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
        return {
            ...state,
            evidenceWithIndex: {
                ...state.evidenceWithIndex,
                [action.evidenceWithId]: {
                    ...state.evidenceWithIndex[action.evidenceWithId],
                    ...getValidating(),
                }
            }
        };
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
        return {
            ...state,
            evidenceWithIndex: {
                ...state.evidenceWithIndex,
                [action.evidenceWithId]: {
                    ...state.evidenceWithIndex[action.evidenceWithId],
                    ...getNotValidated(),
                    locusName: '',
                }
            }
        };
    case actions.VALIDATE_EVIDENCE_WITH_SUCCESS:
        return {
            ...state,
            evidenceWithIndex: {
                ...state.evidenceWithIndex,
                [action.evidenceWithId]: {
                    ...state.evidenceWithIndex[action.evidenceWithId],
                    ...getValid(),
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
                    ...getInvalid(action.error),
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
    case actions.LOAD_SUBMISSION:
        newState = {
            publication: {
                ...getDefaultPublicationState(),
                idValue: action.submission.publicationId,
            },
            geneIndex: {},
            geneOrder: [],
            annotationIndex: {},
            annotationOrder: [],
            curating: true,
        };

        let locusMap = {};

        for (let gene of action.submission.genes) {
            let id = "remote_gene_" + gene.id;
            locusMap[gene.locusName] = id;
            newState.geneIndex[id] = {
                ...getDefaultGeneState(),
                localId: id,
                finalizedLocusName: gene.locusName,
                finalizedGeneSymbol: gene.geneSymbol || "",
                finalizedFullName: gene.fullName || "",
                ...getValid(),
            };
            newState.geneOrder.push(id);
        }

        for (let annotation of action.submission.annotations) {
            let id = "remote_annotation_" + annotation.id;
            newState.annotationIndex[id] = {
                localId: id,
                annotationType: annotation.type,
            };
            switch(annotationTypeData[annotation.type].format) {
                case annotationFormats.GENE_TERM:
                    newState.annotationIndex[id].data = {
                        geneLocalId: locusMap[annotation.data.locusName],
                        keywordName: annotation.data.keyword.name,
                        keywordId: annotation.data.keyword.id,
                        keywordExternalId: "",
                        methodName: annotation.data.method.name,
                        methodId: annotation.data.method.id,
                        methodExternalId: annotation.data.method.externalId || "",
                        methodEvidenceCode: annotation.data.method.evidenceCode || null,
                        evidenceWithOrder: [],
                    };
                    break;
                case annotationFormats.GENE_GENE:
                    newState.annotationIndex[id].data = {
                        gene1LocalId: locusMap[annotation.data.locusName],
                        gene2LocalId: locusMap[annotation.data.locusName2],
                        methodName: annotation.data.method.name,
                        methodId: annotation.data.method.id,
                        methodExternalId: annotation.data.method.externalId || "",
                        methodEvidenceCode: annotation.data.method.evidenceCode || null
                    };
                    break;
                case annotationFormats.COMMENT:
                    newState.annotationIndex[id].data = {
                        geneLocalId: locusMap[annotation.data.locusName],
                        comment: annotation.data.text
                    };
                    break;
            }
            newState.annotationOrder.push(id);
        }

        return Object.assign({}, getDefaultState(), newState);
    default:
        return state;
    }
}
