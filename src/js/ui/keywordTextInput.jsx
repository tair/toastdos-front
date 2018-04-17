"use strict";

import React from 'react';
import PropTypes from 'prop-types';
import SmartTextInput from 'lib/components/smartTextInput';

class KeywordTextInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
    }


    handleInputChange(value) {
        this.props.onChange(value);
        if (value.name.length >= this.props.minSuggestLength) {
            this.props.performSearch(value.name, this.props.searchScope, this.props.annotationType);
        }
    }

    handleBlur() {
        this.props.clearSearchData();
    }

    handleFocus() {
        if (this.props.value.length >= this.props.minSuggestLength) {
            this.props.performSearch(this.props.value, this.props.searchScope, this.props.annotationType);
        }
    }

    render() {
        return (
            <SmartTextInput
                onChange={this.handleInputChange}
                onSelect={this.props.onSelect}
                value={this.props.value}
                minSuggestLength={this.props.minSuggestLength}
                placeholder={this.props.placeholder}
                suggestionIndex={this.props.suggestionIndex}
                suggestionOrder={this.props.suggestionOrder}
                fetchingSuggestions={this.props.fetchingSuggestions}
                onBlur={this.handleBlur}
                onFocus={this.handleFocus}
                required={true}
            />
        );
    }
}

KeywordTextInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    searchScope: PropTypes.string.isRequired,
    annotationType: PropTypes.string,
    minSuggestLength: PropTypes.number,

    suggestionIndex: PropTypes.object,
    suggestionOrder: PropTypes.array,
    performSearch: PropTypes.func.isRequired,
    clearSearchData: PropTypes.func.isRequired,
    fetchingSuggestions: PropTypes.bool.isRequired,
    placeholder: PropTypes.string
};

KeywordTextInput.defaultProps = {
    value: '',
    minSuggestLength: 3
};

export default KeywordTextInput;
