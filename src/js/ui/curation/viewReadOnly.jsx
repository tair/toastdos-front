"use strict";

import React from 'react';
import { Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import 'css/submissionView.scss';
import PublicationFieldReadOnly from 'modules/connectedComponents/publication/fieldReadOnly';
import GeneListReadOnly from 'ui/gene/listReadOnly';
import AnnotationListReadOnly from 'modules/connectedComponents/annotation/listCurationReadOnly';

class CurationReadOnly extends React.Component {
    constructor(props) {
        super(props);
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
                            <GeneListReadOnly
                                curating={true}
                                geneOrder={this.props.geneOrder} />
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
                                annotationOrder={this.props.annotationOrder} />
                        </Col>
                    </Row>
                </ListGroupItem>
            </ListGroup>
        );
    }
}

CurationReadOnly.propTypes = {
    publicationLocalId: React.PropTypes.string,
    geneOrder: React.PropTypes.array,
    annotationOrder: React.PropTypes.array,
};

export default CurationReadOnly;