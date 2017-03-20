import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import KeywordTextInput from './keywordTextInput';
import {
    fetchingSuggestionsSelector,
    keywordSearchIndexSelector,
    keywordSearchOrderSelector
} from '../../selectors';
import {
    attemptKeywordSearch,
    clearKeywordSearch
} from '../../actions';

const ConnectedKeywordTextInput = connect(
    createStructuredSelector({
        suggestionIndex: keywordSearchIndexSelector,
        suggestionOrder: keywordSearchOrderSelector,
        fetchingSuggestions: fetchingSuggestionsSelector
    }),
    dispatch => ({
        performSearch: (searchTerm, keywordScope) => dispatch(attemptKeywordSearch(searchTerm, keywordScope)),
        clearSearchData: () => dispatch(clearKeywordSearch())
    })
)(KeywordTextInput);

export default ConnectedKeywordTextInput;
