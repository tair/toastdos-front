"use strict";

import React from 'react';
import CustomTextInput from "lib/components/customTextInput";
import ValidationStatus from "../../../validationStatus";
import { Card, CardHeader, CardBody,
    Label, FormGroup, InputGroup, InputGroupAddon,
    Button, ButtonGroup, Col, Row } from 'reactstrap';


class SingleGene extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const locusNameInput = (
            <CustomTextInput
                value={this.props.locusNameValue}
                onChange={this.props.onLocusNameChange}
                onKeyDown={this.props.onKeyDown}
                onBlur={this.props.onBlur}
                disabled={this.props.validating}
                placeholder="e.g. AT2G23380"
            />);

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
                            <InputGroup>
                                <InputGroupAddon className="bg-light-green text-dark">
                                    {this.props.title}
                                </InputGroupAddon>
                                {locusNameInput}
                                <InputGroupAddon>
                                    <ValidationStatus validating={this.props.validating} finalized={this.props.finalized || !!this.props.validationError} isValid={this.props.validationError == ""} />
                                </InputGroupAddon>
                            </InputGroup>
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
                    <Row>
                        <Col>
                            <Label className="d-block">
                                Gene Symbol
                                {geneSymbolInput}
                            </Label>
                        </Col>
                        <Col>
                            <Label className="d-block">
                                Full Gene Name
                                {fullNameInput}
                            </Label>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        );
    }
}

SingleGene.propTypes = {
    locusNameValue: React.PropTypes.string,
    geneSymbolValue: React.PropTypes.string,
    fullNameValue: React.PropTypes.string,
    onLocusNameChange: React.PropTypes.func,
    onGeneSymbolChange: React.PropTypes.func,
    onFullNameChange: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    onRemoveClick: React.PropTypes.func,
    title: React.PropTypes.string,
    validating: React.PropTypes.bool,
    validationError: React.PropTypes.string,
    finalized: React.PropTypes.bool
};

SingleGene.defaultProps = {
    locusNameValue: "",
    geneSymbolValue: "",
    fullNameValue: "",
    onLocusNameChange: () => {},
    onGeneSymbolChange: () => {},
    onFullNameChange: () => {},
    onBlur: () => {},
    onKeyDown: () => {},
    onRemoveClick: () => {},
    title: "",
    validating: false,
    validationError: "",
    finalized: false
};


export default SingleGene;
