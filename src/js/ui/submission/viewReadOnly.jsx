"use strict";

import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import 'css/submissionView.scss';
import PublicationFieldReadOnly from 'modules/connectedComponents/publication/fieldReadOnly';
import AnnotationListReadOnly from 'ui/annotation/listReadOnly';
import GeneListReadOnly from 'ui/gene/listReadOnly';

class SubmissionReadOnly extends React.Component {
    constructor(props) {
        super(props);

        this.state ={
            compact: true
        };
        this.toggleCompact = this.toggleCompact.bind(this);
    }

    toggleCompact() {
        this.setState({
            compact: !this.state.compact
        });
    }

    render() {
        return (
            <ListGroup>
                <ListGroupItem className="border-left-0 border-right-0 border-top-0">
                    <PublicationFieldReadOnly localId={this.props.publicationLocalId} />
                    <div className="btn btn-sm btn-secondary compact-view-toggle" onClick={this.toggleCompact}>
                        <span className={this.state.compact ? "fa fa-search-plus": "fa fa-search-minus"} />
                        &nbsp;
                        {this.state.compact ? "Expand View": "Collapse View"}
                    </div>
                </ListGroupItem>
                <ListGroupItem className="border-left-0 border-right-0">
                    <Row className="mt-3">
                        <Col sm="3">
                            <h5>Genes</h5>
                        </Col>
                        <Col>
                            <GeneListReadOnly
                                geneOrder={this.props.geneOrder}
                                compact={this.state.compact} />
                        </Col>
                    </Row>
                </ListGroupItem>
                <ListGroupItem className="border-left-0 border-right-0 border-bottom-0">
                    <Row className="mt-3">
                        <Col sm="3">
                            <h5>Annotations</h5>
                        </Col>
                        <Col>
                        <AnnotationListReadOnly
                                annotationOrder={this.props.annotationOrder}
                                compact={this.state.compact} />
                        </Col>
                    </Row>
                </ListGroupItem>
            </ListGroup>
        );
    }
}

SubmissionReadOnly.propTypes = {
    publicationLocalId: PropTypes.string,
    geneOrder: PropTypes.array,
    annotationOrder: PropTypes.array,
};

export default SubmissionReadOnly;
