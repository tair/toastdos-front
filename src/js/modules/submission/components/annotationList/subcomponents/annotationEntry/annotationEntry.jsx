"use strict";

import React from 'react';
import { Card, CardHeader, CardBody, Button } from 'reactstrap';

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
                    onDataChange={this.props.onDataUpdate}
                    onEvidenceWithAddClick={this.props.onEvidenceWithAddClick}
                    validateEvidenceWith={this.props.validateEvidenceWith}
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

    render() {
        return (
            <Card className="annotation-entry">
                <CardHeader>
                <h4>{this.props.title}</h4>
                </CardHeader>
                <CardBody>
                    <CustomSelect
                        name="Annotation Type"
                        onChange={this.handleTypeChange}
                        value={this.props.annotationType}
                    >
                        {Object.keys(annotationTypes).map(this.generateTypeOption)}
                    </CustomSelect>
                    {this.renderAnnotationFormat()}
                    <Button color="danger" size="sm"
                        onClick={this.props.onDeleteClick}
                    >
                        <span className="fa fa-close" title="Remove Annotation"></span>
                    </Button>
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
    onDataUpdate: React.PropTypes.func,
    onEvidenceWithAddClick: React.PropTypes.func,
    validateEvidenceWith: React.PropTypes.func,
};

AnnotationEntry.defaultProps = {
    onTypeChange: () => {},
    onDeleteClick: () => {},
    onDataUpdate: () => {},
    onEvidenceWithAddClick: () => {},
    validateEvidenceWith: () => {},
};


export default AnnotationEntry;
