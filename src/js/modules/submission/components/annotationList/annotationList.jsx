"use strict";

import React from 'react';
import { Button, Row, Col } from 'reactstrap';

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
                title={`Annotation ${index+1}`}
                annotationType={currAnnotation.annotationType}
                onTypeChange={this.props.handleAnnotationTypeChange.bind(this, annotationId)}
                onDeleteClick={this.props.removeAnnotation.bind(this, annotationId)}
                annotationData={this.props.annotationIndex[annotationId]}
                onDataUpdate={this.props.updateAnnotationData.bind(this, annotationId)}
                onEvidenceWithAddClick={this.props.addEvidenceWith.bind(this, annotationId)}
                validateEvidenceWith={this.props.validateEvidenceWith.bind(this, annotationId)}
            />
        );
    }

    render() {
        return (
            <div className="annotation-list-container">
                <h4>Annotations</h4>
                {(this.props.annotationOrder.length <= 0) ? 
                   (
                    <span className="empty-message">
                        No Annotations.
                        {(!this.props.hasGenes) ? (
                            <span className="empty-message"> Please add a valid gene before adding annotations.
                            </span>
                        ) : (null)
                        }
                    </span>
                   ) : (
                    <div className="annotation-list">
                        {this.props.annotationOrder.map(this.generateAnnotationEntry)}
                    </div>
                   )
                }
                <Row className="justify-content-sm-center mt-3 mb-3">
                    <Col sm={{size:4, offset:4}} className="justify-content-sm-center">
                        <Button block color="success"
                            onClick={this.props.onAnnotationAddClick}
                            disabled={!this.props.hasGenes}
                        >
                            <span className="fa fa-plus" title="Add Annotation"></span> Add Annotation
                        </Button>
                    </Col>
                </Row>
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

