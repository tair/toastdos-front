"use strict";

import React from 'react';
import { Label, Row, Col,
    Card, CardHeader, CardBody, Input,
    InputGroup, InputGroupAddon, Button } from 'reactstrap';

import CustomTextInput from "lib/components/customTextInput";
import ValidationInput from "../validationInput";


class PublicationField extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="publication-field">
                <Row>
                    <Col>
                        <h4>1. Publication</h4>
                    </Col>
                    <Col sm={{size:9}}>
                        <Card className="mt-3">
                            <CardHeader className="align-center">
                                <ValidationInput
                                    title="PubMed ID / DOI"
                                    value={this.props.publicationIdValue}
                                    placeholder="e.g 21051552 or 10.1104/pp.110.166546"
                                    attemptValidate={this.props.attemptValidatePublication}
                                    validating={this.props.publicationValidation.validating}
                                    finalized={this.props.publicationValidation.finalized}
                                    validationError={this.props.publicationValidation.validationError}
                                />
                            </CardHeader>
                            {this.props.publicationValidation.finalized ? (
                            <CardBody>
                                {this.props.publicationInfo.url ? (
                                <Row className="align-items-end mt-3">
                                    <Col xs="3" className="text-right d-table-cell">
                                        <Label className="align-center">
                                            URL
                                        </Label>
                                    </Col>
                                    <Col className="d-block mb-2">
                                        <a target="_blank" href={this.props.publicationInfo.url}>{this.props.publicationInfo.url}</a>
                                    </Col>
                                </Row>
                                ):(
                                [<Row key="Title" className="align-items-end mt-3">
                                    <Col xs="3" className="text-right d-table-cell">
                                        <Label className="align-center">
                                            Title
                                        </Label>
                                    </Col>
                                    <Col className="d-block">
                                        <Input value={this.props.publicationInfo.title} disabled></Input>
                                    </Col>
                                </Row>,
                                <Row key="Author" className="align-items-end mt-3">
                                    <Col xs="3" className="text-right d-table-cell">
                                        <Label className="align-center">
                                            Author
                                        </Label>
                                    </Col>
                                    <Col className="d-block">
                                        <Input value={this.props.publicationInfo.author} disabled></Input>
                                    </Col>
                                </Row>
                                ])}
                            </CardBody>) : null}
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

PublicationField.propTypes = {
    publicationIdValue: React.PropTypes.string,
    publicationValidation: React.PropTypes.shape({
        finalized: React.PropTypes.bool,
        validating: React.PropTypes.bool,
        validationError: React.PropTypes.string
    }),
    publicationInfo: React.PropTypes.shape({
        author: React.PropTypes.string,
        url: React.PropTypes.string,
        title: React.PropTypes.string,
    }),
    attemptValidatePublication: React.PropTypes.func.isRequired,
};

PublicationField.defaultProps = {
    publicationIdValue: "",
    publicationValidation: {
        finalized: false,
        validating: false,
        validationError: ""
    },
    publicationInfo: {
        author: '',
        url: '',
        title: '',
    },
    attemptValidatePublication: () => {}
};

export default PublicationField;
