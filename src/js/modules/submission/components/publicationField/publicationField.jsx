"use strict";

import React from 'react';
import { Label, Row, Col } from 'reactstrap';

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
                <Row>
                    <Col>
                        <h4>Publication</h4>
                    </Col>
                    <Col sm={{size:9}}>
                        <Row className="align-items-end">
                            <Col xs="6" className="text-right d-table-cell">
                                <Label className="align-center">
                                    PubMed ID or
                                    Digital Object Identifier (DOI)
                                </Label>
                            </Col>
                            <Col className="d-table-cell">
                                <CustomTextInput
                                    value={this.props.publicationIdValue}
                                    style={inputStyle}
                                    placeholder="e.g 21051552 or 10.1104/pp.110.166546"
                                    onChange={this.props.onChange}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
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
