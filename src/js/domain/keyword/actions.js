"use strict";

import AuthModule from 'modules/authentication';
import { searchKeywords } from 'lib/api';
import * as actions from './actionTypes';

function keywordSearchSuccess(results) {
    return {
        type: actions.KEYWORD_SEARCH_SUCCESS,
        results
    };
}

function keywordSearchFail(error) {
    return {
        type: actions.KEYWORD_SEARCH_FAIL,
        error
    };
}

export function attemptKeywordSearch(searchTerm, keywordScope) {
    return (dispatch, getState) => {

        const currState = getState();

        dispatch({
            type: actions.ATTEMPT_KEYWORD_SEARCH
        });

        const token = AuthModule.selectors.rawJwtSelector(currState);
        searchKeywords(searchTerm, keywordScope, token, (err, data) => {
            if(err) {
                return dispatch(keywordSearchFail(err));
            }
            return dispatch(keywordSearchSuccess(data));
        });
    };
}

export function clearKeywordSearch() {
    return {
        type: actions.CLEAR_KEYWORD_SEARCH
    };
}
