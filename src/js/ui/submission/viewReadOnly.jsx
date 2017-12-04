"use strict";

import React from 'react';
import { Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import {
    annotationTypeData,
    annotationFormats,
} from 'domain/annotation/constants';
import { validationStates } from 'lib/validation';
import 'css/submissionView.scss';
import PublicationFieldReadOnly from 'modules/connectedComponents/publication/fieldReadOnly';
import SingleGeneReadOnly from 'modules/connectedComponents/gene/singleGeneReadOnly';
import AnnotationEntryReadOnly from 'modules/connectedComponents/annotation/entryReadOnly';

class SubmissionReadOnly extends React.Component {
    constructor(props) {
        super(props);

        this.renderGenes = this.renderGenes.bind(this);
        this.renderAnnotations = this.renderAnnotations.bind(this);
    }

    renderGenes(geneOrder) {
        return this.props.geneOrder.map(
            geneLocalId =>
                <SingleGeneReadOnly
                    key={geneLocalId}
                    localId={geneLocalId} />
        );
    }

    renderAnnotations(annotationOrder) {
        return this.props.annotationOrder.map(
            localId =>
                <AnnotationEntryReadOnly
                    key={localId}
                    localId={localId} />
        );
    }

    render() {
        return (
            <ListGroup>
                <ListGroupItem className="border-left-0 border-right-0 border-top-0">
                    <PublicationFieldReadOnly localId={this.props.publicationLocalId} />
                </ListGroupItem>
                <ListGroupItem className="border-left-0 border-right-0">
                    <Row className="mt-3">
                        <Col sm="3">
                            <h5>Genes</h5>
                        </Col>
                        <Col>
                            {this.renderGenes(this.props.geneOrder)}
                        </Col>
                    </Row>
                </ListGroupItem>
                <ListGroupItem className="border-left-0 border-right-0 border-bottom-0">
                    <Row className="mt-3">
                        <Col sm="3">
                            <h5>Annotations</h5>
                        </Col>
                        <Col>
                            {this.renderAnnotations(this.props.annotationOrder)}
                        </Col>
                    </Row>
                </ListGroupItem>
            </ListGroup>
        );
    }
}

SubmissionReadOnly.propTypes = {
    publicationLocalId: React.PropTypes.string,
    geneOrder: React.PropTypes.array,
    annotationOrder: React.PropTypes.array,
};

export default SubmissionReadOnly;
