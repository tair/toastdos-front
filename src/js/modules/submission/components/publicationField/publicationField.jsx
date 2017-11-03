"use strict";

import React from 'react';
import { Label, Row, Col,
    Card, CardHeader, CardBody, Input,
    InputGroup, InputGroupAddon, Button } from 'reactstrap';

import ValidationInput from "../validationInput";
import { validationStates } from "../../constants";
import LabelInputRow from "../labelInputRow";


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
                                    validationState={this.props.validationState}
                                    validationError={this.props.validationError}
                                    required={true}
                                />
                            </CardHeader>
                            <CardBody>
                                {this.props.publicationInfo.url ? (
                                <LabelInputRow title="URL">
                                    <div className="mb-2">
                                        <a target="_blank" href={this.props.publicationInfo.url}>{this.props.publicationInfo.url}</a>
                                    </div>
                                </LabelInputRow>
                                ):(
                                [<LabelInputRow key="Title" title="Title">
                                    <Input value={this.props.publicationInfo.title} disabled></Input>
                                </LabelInputRow>
                                ,
                                <LabelInputRow key="Author" title="Author">
                                    <Input value={this.props.publicationInfo.author} disabled></Input>
                                </LabelInputRow>
                                ])}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

PublicationField.propTypes = {
    publicationIdValue: React.PropTypes.string,
    validationState: React.PropTypes.string,
    validationError: React.PropTypes.string,
    publicationInfo: React.PropTypes.shape({
        author: React.PropTypes.string,
        url: React.PropTypes.string,
        title: React.PropTypes.string,
    }),
    attemptValidatePublication: React.PropTypes.func.isRequired,
};

PublicationField.defaultProps = {
    publicationIdValue: "",
    validationState: validationStates.NOT_VALIDATED,
    validationError: "",
    publicationInfo: {
        author: '',
        url: '',
        title: '',
    },
    attemptValidatePublication: () => {}
};

export default PublicationField;
