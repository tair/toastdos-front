"use strict";

import React from 'react';
import { Card, CardHeader, CardBody,
    Input, InputGroup, InputGroupAddon, Label,
    Form, FormGroup, Row, Col, Button, ButtonGroup } from 'reactstrap';

import CustomSelect from 'lib/components/customSelect';

import {
        annotationTypes,
        annotationTypeData,
        annotationFormats
    } from "../../../../constants";

import CommentFormat from '../annotationFormats/comment';
import GeneTermFormat from '../annotationFormats/geneTerm';
import GeneGeneFormat from '../annotationFormats/geneGene';

class AnnotationEntry extends React.Component {
    constructor(props) {
        super(props);

        this.generateTypeOption = this.generateTypeOption.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.renderAnnotationFormat = this.renderAnnotationFormat.bind(this);
    }

    generateTypeOption(typeId) {
        let currType = annotationTypeData[typeId];

        return (
            <option
                key={`atype_${typeId}`}
                value={typeId}
            >
                {currType.name}
            </option>
        );
    }

    handleTypeChange(event) {
        this.props.onTypeChange(event.target.value);
    }

    renderAnnotationFormat() {
        let annotationData = annotationTypeData[this.props.annotationType];
        switch(annotationData.format) {
        case annotationFormats.COMMENT:
            return (
                <CommentFormat
                    annotationData={this.props.annotationData}
                    onDataChange={this.props.onDataUpdate}
                />
            );
        case annotationFormats.GENE_TERM:
            return (
                <GeneTermFormat
                    annotationData={this.props.annotationData}
                    annotationId={this.props.annotationId}
                    onDataChange={this.props.onDataUpdate}
                    onEvidenceWithAddClick={this.props.onEvidenceWithAddClick}
                    validateEvidenceWith={this.props.validateEvidenceWith}
                    removeEvidenceWith={this.props.removeEvidenceWith}
                />
            );
        case annotationFormats.GENE_GENE:
            return (
                <GeneGeneFormat
                    annotationData={this.props.annotationData}
                    onDataChange={this.props.onDataUpdate}
                />
            );
        default:
            return (
                <span>
                    Unrecongnized Format
                </span>
            );
        }
    }

    renderButtons() {
        if (!this.props.curating) {
            return (
                <Button color="danger"
                    onClick={this.props.onDeleteClick}>
                    <span className="fa fa-close" title="Remove Annotation"></span>
                </Button>
            );
        } else {
            return (
                <ButtonGroup>
                    <Button color="success" type="button">
                        <span className="fa fa-check" />
                    </Button>
                    <Button color="danger" type="button">
                        <span className="fa fa-trash" />
                    </Button>
                </ButtonGroup>
            );
        }
    }

    render() {
        return (
            <Card className="annotation-entry mt-3">
                <CardHeader>
                    <Row>
                        <Col>
                            <InputGroup>
                                <InputGroupAddon className="bg-light-green text-dark">
                                    {this.props.title}
                                </InputGroupAddon>
                                <CustomSelect name="Annotation Type"
                                    onChange={this.handleTypeChange}
                                    value={this.props.annotationType}
                                >
                                    {Object.keys(annotationTypes).map(this.generateTypeOption)}
                                </CustomSelect>
                            </InputGroup>
                        </Col>
                        <Col sm="auto" className="text-right input-container">
                            {this.renderButtons()}
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    {this.renderAnnotationFormat()}
                </CardBody>
            </Card>
        );
    }
 }

AnnotationEntry.propTypes = {
    annotationType: React.PropTypes.oneOf(Object.keys(annotationTypes)),
    title: React.PropTypes.string,
    onTypeChange: React.PropTypes.func,
    onDeleteClick: React.PropTypes.func,
    annotationData: React.PropTypes.object,
    annotationId: React.PropTypes.any,
    onDataUpdate: React.PropTypes.func,
    onEvidenceWithAddClick: React.PropTypes.func,
    validateEvidenceWith: React.PropTypes.func,
    removeEvidenceWith: React.PropTypes.func,
    curating: React.PropTypes.bool
};

AnnotationEntry.defaultProps = {
    onTypeChange: () => {},
    onDeleteClick: () => {},
    onDataUpdate: () => {},
    onEvidenceWithAddClick: () => {},
    validateEvidenceWith: () => {},
    removeEvidenceWith: () => {},
    curating: false,
};


export default AnnotationEntry;
