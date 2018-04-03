"use strict";

import React from 'react';
import { Alert, Row, Col,
    Card, CardHeader, CardBody, Input } from 'reactstrap';
import { validationStates } from 'lib/validation';
import ValidationInput from 'ui/validationInput';
import LabelInputRow from 'ui/labelInputRow';
import ValidatedField from 'ui/validatedField';


class PublicationField extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
        <ValidatedField isValid={this.props.validationState == validationStates.VALID}
            invalidMessage={(`${this.props.validationState}: A valid publication ID is required`)}
            reviewValidated={this.props.reviewValidated}
        >
            <Row>
                <Col>
                    <h4>1. Publication</h4>
                    <Alert color="light">Enter a PubMed ID or a DOI.</Alert>
                </Col>
                <Col sm={{size:9}}>
                    <Card className="mt-3">
                        <CardHeader className="align-center">
                            <ValidationInput
                                title="Publication ID"
                                value={this.props.idValue}
                                placeholder="e.g 21051552 or 10.1104/pp.110.166546"
                                attemptValidate={this.props.attemptValidatePublication}
                                validationState={this.props.validationState}
                                validationError={this.props.validationError}
                                required={true}
                            />
                        </CardHeader>
                        <CardBody>
                            {this.props.url ? (
                            <LabelInputRow title="URL">
                                <div className="mb-2">
                                    <a target="_blank" href={this.props.url}>{this.props.url}</a>
                                </div>
                            </LabelInputRow>
                            ):(
                            [<LabelInputRow key="Title" title="Title">
                                <Input value={this.props.title} disabled></Input>
                            </LabelInputRow>
                            ,
                                <LabelInputRow key="Author" title="Author">
                                <Input value={this.props.author} disabled></Input>
                            </LabelInputRow>
                            ])}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </ValidatedField>);
    }
}

PublicationField.propTypes = {
    idValue: React.PropTypes.string,
    validationState: React.PropTypes.string,
    validationError: React.PropTypes.string,
    isValid: React.PropTypes.bool,
    author: React.PropTypes.string,
    url: React.PropTypes.string,
    title: React.PropTypes.string,
    attemptValidatePublication: React.PropTypes.func.isRequired,
    reviewValidated: React.PropTypes.number,
};

PublicationField.defaultProps = {
    idValue: "",
    validationState: validationStates.NOT_VALIDATED,
    isValid: false,
    validationError: "",
    author: '',
    url: '',
    title: '',
    attemptValidatePublication: () => {},
    reviewValidated: 0,
};

export default PublicationField;
