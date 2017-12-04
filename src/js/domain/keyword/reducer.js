"use strict";

import * as actions from './actionTypes';

function getDefaultState() {
    return {
        keywordSearchResults: [],
        searchingKeywords: false,
    }
}

const defaultState = getDefaultState();

export default function (state = defaultState, action) {
    switch (action.type) {
    case actions.ATTEMPT_KEYWORD_SEARCH:
        return {
            ...state,
            searchingKeywords: true
        };
    case actions.KEYWORD_SEARCH_SUCCESS:
        return {
            ...state,
            searchingKeywords: false,
            keywordSearchResults: action.results
        };
    case actions.KEYWORD_SEARCH_FAIL:
        return {
            ...state,
            searchingKeywords: false,
            keywordSearchResults: []
        };
    case actions.CLEAR_KEYWORD_SEARCH:
        return {
            ...state,
            searchingKeywords: false,
            keywordSearchResults: []
        };
    default:
        return state;
    }
}
