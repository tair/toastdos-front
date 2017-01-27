"use strict";

import React from 'react';

import AnnotationEntry from './subcomponents/annotationEntry';

class AnnotationList extends React.Component {
    constructor(props) {
        super(props);
        
        this.generateAnnotationEntry = this.generateAnnotationEntry.bind(this);
    }

    generateAnnotationEntry(annotationId, index) {
        let currAnnotation = this.props.annotationIndex[annotationId];
        return (
            <AnnotationEntry
                key={`annotation_${annotationId}`}
                title={`Annotation ${index + 1}`}
                annotationType={currAnnotation.annotationType}
                onTypeChange={this.props.handleAnnotationTypeChange.bind(this, annotationId)}
                onDeleteClick={this.props.removeAnnotation.bind(this, annotationId)}
                annotationData={this.props.annotationIndex[annotationId]}
                onDataUpdate={this.props.updateAnnotationData.bind(this, annotationId)}
            />
        );
    }

    render() {
        return (
            <div classNane="annotation-list-container">
                <h2>Annotations</h2>
                <div className="annotation-list">
                    {this.props.annotationOrder.map(this.generateAnnotationEntry)}
                </div>
                <button
                    className="btn btn-secondary"
                    onClick={this.props.onAnnotationAddClick}
                    disabled={!this.props.hasGenes}
                >
                    Add Annotation
                </button>
            </div>
        );
    }
}


AnnotationList.propTypes = {
    annotationIndex: React.PropTypes.object,
    annotationOrder: React.PropTypes.arrayOf(
        React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.string
        ])
    ),
    onAnnotationAddClick: React.PropTypes.func,
    handleAnnotationTypeChange: React.PropTypes.func,
    removeAnnotation: React.PropTypes.func,
    hasGenes: React.PropTypes.bool
};

AnnotationList.defaultProps = {
    onAnnotationAddClick: () => {},
    annotationIndex: {},
    annotationOrder: [],
    hasGenes: false
};

export default AnnotationList;

