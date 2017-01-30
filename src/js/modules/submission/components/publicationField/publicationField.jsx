"use strict";

import React from 'react';

import CustomTextInput from "lib/components/customTextInput";


class PublicationField extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let inputStyle = {
        };

        return (
            <div className="publication-field">
                <h2>Publication</h2>
                <h4>PubMed ID or Digital Object Identifier (DOI)</h4>
                <CustomTextInput
                    value={this.props.publicationIdValue}
                    style={inputStyle}
                    placeholder="e.g 21051552 or 10.1104/pp.110.166546"
                    onChange={this.props.onChange}
                />
            </div>
        );
    }
}

PublicationField.propTypes = {
    onChange: React.PropTypes.func,
    publicationIdValue: React.PropTypes.string
};

PublicationField.defaultProps = {
    onChange: () => {},
    publicationIdValue: ""
};

export default PublicationField;
