"use strict";

import React from 'react';
import { Label } from 'reactstrap';

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
                <h3>Publication</h3>
                <Label className="d-block">PubMed ID or Digital Object Identifier (DOI)
                    <CustomTextInput
                        value={this.props.publicationIdValue}
                        style={inputStyle}
                        placeholder="e.g 21051552 or 10.1104/pp.110.166546"
                        onChange={this.props.onChange}
                    />
                </Label>
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
