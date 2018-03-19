"use strict";

import React from 'react';
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
    onChange: React.PropTypes.func.isRequired,
    onSelect: React.PropTypes.func.isRequired,
    value: React.PropTypes.string.isRequired,
    searchScope: React.PropTypes.string.isRequired,
    annotationType: React.PropTypes.string,
    minSuggestLength: React.PropTypes.number,

    suggestionIndex: React.PropTypes.object,
    suggestionOrder: React.PropTypes.array,
    performSearch: React.PropTypes.func.isRequired,
    clearSearchData: React.PropTypes.func.isRequired,
    fetchingSuggestions: React.PropTypes.bool.isRequired,
    placeholder: React.PropTypes.string
};

KeywordTextInput.defaultProps = {
    minSuggestLength: 3
};

export default KeywordTextInput;
