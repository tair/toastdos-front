"use strict";

import React from 'react';

const containerStyle = {
    width: "100%",
};


class PublicationField extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let inputStyle = {
            width: "45%",
            display: "inline-block",
            fontSize: "1.8em"
        };

        return (
            <div
                style={containerStyle}
            >
                <h2>Publication</h2>
                <h4>PubMed ID or DOI</h4>
                <input
                    value={this.props.publicationIdValue}
                    style={inputStyle}
                    type="text"
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
