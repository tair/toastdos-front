"use strict";

import React from 'react';

import {
        annotationTypes,
        annotationTypeData,
        annotationFormats
    } from "../../../../constants";

import CommentFormat from '../annotationFormats/comment';
import GeneTermFormat from '../annotationFormats/geneTerm';
import GeneGeneFormat from '../annotationFormats/geneGene';

const containerStyle = {
    margin: "5px"
};

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
                />
            );
        case annotationFormats.GENE_TERM:
            return (
                <GeneTermFormat
                    annotationData={this.props.annotationData}
                />
            );
        case annotationFormats.GENE_GENE:
            return (
                <GeneGeneFormat
                    annotationData={this.props.annotationData}
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
            <div style={containerStyle}>
                <h4>{this.props.title}</h4>
                <div>
                    <select
                        name="Annotation Type"
                        id="annotation_type"
                        onChange={this.handleTypeChange}
                        value={this.props.annotationType}
                    >
                        {Object.keys(annotationTypes).map(this.generateTypeOption)}
                    </select>
                </div>
                <div>
                    {this.renderAnnotationFormat()}
                </div>
                <div>
                    <button
                        onClick={this.props.onDeleteClick}
                    >
                        Remove Annotation
                    </button>
                </div>
            </div>
        );
    }
 }

AnnotationEntry.propTypes = {
    annotationType: React.PropTypes.oneOf(Object.keys(annotationTypes)),
    title: React.PropTypes.string,
    onTypeChange: React.PropTypes.func,
    onDeleteClick: React.PropTypes.func,
    annotationData: React.PropTypes.object
};

export default AnnotationEntry;
