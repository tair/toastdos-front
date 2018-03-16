"use strict";

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import KeywordTextInput from 'ui/keywordTextInput';
import {
    fetchingSuggestionsSelector,
    keywordSearchIndexSelector,
    keywordSearchOrderSelector
} from 'domain/keyword/selectors';
import {
    attemptKeywordSearch,
    clearKeywordSearch
} from 'domain/keyword/actions';

const ConnectedKeywordTextInput = connect(
    createStructuredSelector({
        suggestionIndex: keywordSearchIndexSelector,
        suggestionOrder: keywordSearchOrderSelector,
        fetchingSuggestions: fetchingSuggestionsSelector
    }),
    dispatch => ({
        performSearch: (searchTerm, keywordScope, annotationType) => dispatch(attemptKeywordSearch(searchTerm, keywordScope, annotationType)),
        clearSearchData: () => dispatch(clearKeywordSearch())
    })
)(KeywordTextInput);

export default ConnectedKeywordTextInput;
