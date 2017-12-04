"use strict";

import React from 'react';
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
                        {this.props.curating ? <h5 className="my-3">Pending Annotations</h5> : null}
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
                        {!this.props.curating ?
                            <Row className="justify-content-sm-center mt-3 mb-3">
                                <Col sm={{size:4, offset:4}} className="justify-content-sm-center">
                                    <Button block color="success"
                                        onClick={this.props.onAnnotationAddClick}
                                        disabled={!this.props.hasValidGene}
                                    >
                                        <span className="fa fa-plus" title="Add Annotation"></span> Add Another Annotation
                                    </Button>
                                </Col>
                            </Row> : null}
                        {this.props.curating ? (
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
    annotationOrder: React.PropTypes.arrayOf(React.PropTypes.string),
    geneOrder: React.PropTypes.arrayOf(React.PropTypes.string),
    onAnnotationAddClick: React.PropTypes.func,
    removeAnnotation: React.PropTypes.func,
    hasValidGene: React.PropTypes.bool,
    curating: React.PropTypes.bool,
};

AnnotationList.defaultProps = {
    annotationOrder: [],
    geneOrder: [],
    onAnnotationAddClick: () => {},
    removeAnnotation: () => {},
    hasValidGene: false,
    curating: false,
};

export default AnnotationList;

