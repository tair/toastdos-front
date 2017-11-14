"use strict";

import React from 'react';
import { Alert, Button, Row, Col } from 'reactstrap';

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
                removeEvidenceWith={this.props.removeEvidenceWith.bind(this, annotationId)}
                annotationId={annotationId}
                curation={this.props.curation}
            />
        );
    }

    render() {
        return (
            <div className="annotation-list-container">
                <Row>
                    <Col>
                        <h4>3. Annotations</h4>
                        <Alert color="light">Select an annotation format and a gene. All fields are required.</Alert>
                    </Col>
                    <Col sm={{size:9}}>
                        {this.props.curation ? <h5 className="my-3">Pending Annotations</h5> : null}
                        {(this.props.annotationOrder.length <= 0) ?
                        (
                            <Alert color="secondary">
                                <span className="empty-message">
                                    No Annotations.
                                    {(!this.props.hasValidGene) ? (
                                        <span className="empty-message"> Please add a valid gene before adding annotations.
                                        </span>
                                    ) : (null)
                                    }
                                </span>
                            </Alert>
                        ) : (
                            <div className="annotation-list">
                                {this.props.annotationOrder.map(this.generateAnnotationEntry)}
                            </div>
                        )}
                        {!this.props.curation ?
                            <Row className="justify-content-sm-center mt-3 mb-3">
                                <Col sm={{size:4, offset:4}} className="justify-content-sm-center">
                                    <Button block color="success"
                                        onClick={this.props.onAnnotationAddClick}
                                        disabled={!this.props.hasAllValidGenes}
                                    >
                                        <span className="fa fa-plus" title="Add Annotation"></span> Add Another Annotation
                                    </Button>
                                </Col>
                            </Row> : null}
                        {this.props.curation ? (
                            <div>
                                <h5 className="my-3">Reviewed Annotations</h5>
                                <Alert color="secondary">
                                    <span className="empty-message">
                                        No Reviewed Annotations.
                                    </span>
                                </Alert>
                            </div>
                        ) : null}
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
    hasValidGene: React.PropTypes.bool,
    hasAllValidGenes: React.PropTypes.bool,
    removeEvidenceWith: React.PropTypes.func,
    curation: React.PropTypes.bool,
};

AnnotationList.defaultProps = {
    onAnnotationAddClick: () => {},
    annotationIndex: {},
    annotationOrder: [],
    hasValidGene: false,
    hasAllValidGenes: false,
    curation: false,
};

export default AnnotationList;

