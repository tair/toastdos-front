"use strict";

import React from 'react';
import { Card, CardHeader, CardBody,
    Label, FormGroup, InputGroup, InputGroupAddon,
    Button, ButtonGroup, Col, Row } from 'reactstrap';
import CustomTextInput from 'lib/components/customTextInput';
import { validationStates } from 'lib/validation';
import ValidationInput from 'ui/validationInput';
import LabelInputRow from 'ui/labelInputRow';

class SingleGene extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const geneSymbolInput = (
            <CustomTextInput
                value={this.props.geneSymbolValue}
                onChange={this.props.onGeneSymbolChange}
                onKeyDown={this.props.onKeyDown}
                placeholder="e.g. CLF"
            />);

        const fullNameInput = (
            <CustomTextInput
                value={this.props.fullNameValue}
                onChange={this.props.onFullNameChange}
                onKeyDown={this.props.onKeyDown}
                placeholder="e.g. CURLY LEAF"
            />
        );

        return (
            <Card className="single-gene mt-3">
                <CardHeader>
                    <Row>
                        <Col>
                            <ValidationInput
                                title={this.props.title}
                                value={this.props.locusNameValue}
                                placeholder="e.g. AT2G23380"
                                validationState={this.props.validationState}
                                validationError={this.props.validationError}
                                attemptValidate={this.props.validateGeneData}
                                upperCaseOnly={true}
                                required={true}
                            />
                        </Col>
                        <Col sm="auto" className="text-right">
                            <Button color="danger"
                                onClick={this.props.onRemoveClick}>
                                <span className="fa fa-close" title="Remove Gene"></span>
                            </Button>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    <LabelInputRow title="Gene Symbol">
                        {geneSymbolInput}
                    </LabelInputRow>
                    <LabelInputRow title="Full Gene Name">
                        {fullNameInput}
                    </LabelInputRow>
                </CardBody>
            </Card>
        );
    }
}

SingleGene.propTypes = {
    locusNameValue: React.PropTypes.string,
    geneSymbolValue: React.PropTypes.string,
    fullNameValue: React.PropTypes.string,
    onGeneSymbolChange: React.PropTypes.func,
    onFullNameChange: React.PropTypes.func,
    validateGeneData: React.PropTypes.func,
    onRemoveClick: React.PropTypes.func,
    title: React.PropTypes.string,
    validationState: React.PropTypes.string,
    validationError: React.PropTypes.string,
};

SingleGene.defaultProps = {
    locusNameValue: "",
    geneSymbolValue: "",
    fullNameValue: "",
    onGeneSymbolChange: () => {},
    onFullNameChange: () => {},
    validateGeneData: () => {},
    onRemoveClick: () => {},
    title: "",
    validationState: validationStates.NOT_VALIDATED,
    validationError: "",
};


export default SingleGene;
