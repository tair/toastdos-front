"use strict";

import React from 'react';
import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import GeneLocusName from 'modules/connectedComponents/gene/locusName';
import AnnotationStatusReadOnly from 'ui/annotation/statusReadOnly';

class CommentAnnotationReadOnly extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card className="mb-3">
                <CardHeader>
                    <Row>
                        <Col>
                            {this.props.annotationTypeName}: <GeneLocusName
                                localId={this.props.commentAnnotation.geneLocalId} />
                        </Col>
                        <Col sm="auto">
                            <AnnotationStatusReadOnly
                                annotationStatus={this.props.annotationStatus}
                            />
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    {this.props.commentAnnotation.comment}
                </CardBody>
            </Card>
        );
    }
}

CommentAnnotationReadOnly.propTypes = {
    commentAnnotation: React.PropTypes.object,
    annotationStatus: React.PropTypes.string,
    annotationTypeName: React.PropTypes.string,
};

export default CommentAnnotationReadOnly;
