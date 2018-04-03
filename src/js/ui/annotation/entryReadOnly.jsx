"use strict";

import React from 'react';
import {
    annotationTypes,
    annotationTypeData,
    annotationFormats
} from 'domain/annotation/constants';
import CommentAnnotationReadOnly from 'modules/connectedComponents/annotation/commentReadOnly';
import GeneTermAnnotationReadOnly from 'modules/connectedComponents/annotation/geneTermReadOnly';
import GeneGeneAnnotationReadOnly from 'modules/connectedComponents/annotation/geneGeneReadOnly';

class AnnotationEntryReadOnly extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let annotationType = annotationTypeData[this.props.annotation.annotationType];
        switch(annotationType.format) {
        case annotationFormats.COMMENT:
            return (
                <CommentAnnotationReadOnly
                    localId={this.props.annotation.annotationTypeLocalId}
                    annotationTypeName={annotationType.name}
                    annotationStatus={this.props.annotation.annotationStatus}
                    compact={this.props.compact}
                />
            );
        case annotationFormats.GENE_TERM:
            return (
                <GeneTermAnnotationReadOnly
                    localId={this.props.annotation.annotationTypeLocalId}
                    annotationTypeName={annotationType.name}
                    annotationStatus={this.props.annotation.annotationStatus}
                    compact={this.props.compact}
                />
            );
        case annotationFormats.GENE_GENE:
            return (
                <GeneGeneAnnotationReadOnly
                    localId={this.props.annotation.annotationTypeLocalId}
                    annotationTypeName={annotationType.name}
                    annotationStatus={this.props.annotation.annotationStatus}
                    compact={this.props.compact}
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
 }

AnnotationEntryReadOnly.propTypes = {
    annotation: React.PropTypes.shape({
        localId: React.PropTypes.string,
        annotationType: React.PropTypes.oneOf(Object.keys(annotationTypes)),
        annotationTypeLocalId: React.PropTypes.string,
    }).isRequired,
    compact: React.PropTypes.bool,
};

AnnotationEntryReadOnly.defaultProps = {
    annotation: null,
    compact: true,
};


export default AnnotationEntryReadOnly;
