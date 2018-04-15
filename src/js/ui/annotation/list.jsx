"use strict";

import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Row, Col } from 'reactstrap';
import AnnotationEntry from 'modules/connectedComponents/annotation/entry';

class AnnotationList extends React.Component {
    constructor(props) {
        super(props);

        this.generateAnnotationEntry = this.generateAnnotationEntry.bind(this);
    }

    generateAnnotationEntry(annotationId, index) {
        return (
            <AnnotationEntry
                key={`annotation_${annotationId}`}
                title={`Annotation ${index+1}`}
                onDeleteClick={this.props.removeAnnotation.bind(this, annotationId)}
                localId={annotationId}
                curating={this.props.curating}
                geneOrder={this.props.geneOrder}
                reviewValidated={this.props.reviewValidated}
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
                        {this.props.curating ? null :
                            <Row className="justify-content-sm-center mt-3 mb-3">
                                <Col sm={{size:4, offset:4}} className="justify-content-sm-center">
                                    <Button block color="success"
                                        onClick={this.props.onAnnotationAddClick}
                                        disabled={!this.props.hasValidGene}
                                    >
                                        <span className="fa fa-plus" title="Add Annotation"></span> Add Another Annotation
                                    </Button>
                                </Col>
                            </Row>
                        }
                    </Col>
                </Row>
            </div>
        );
    }
}


AnnotationList.propTypes = {
    annotationOrder: PropTypes.arrayOf(PropTypes.string),
    geneOrder: PropTypes.arrayOf(PropTypes.string),
    onAnnotationAddClick: PropTypes.func,
    removeAnnotation: PropTypes.func,
    hasValidGene: PropTypes.bool,
    curating: PropTypes.bool,
    reviewValidated: PropTypes.number,
};

AnnotationList.defaultProps = {
    annotationOrder: [],
    geneOrder: [],
    onAnnotationAddClick: () => {},
    removeAnnotation: () => {},
    hasValidGene: false,
    curating: false,
    reviewValidated: 0,
};

export default AnnotationList;

