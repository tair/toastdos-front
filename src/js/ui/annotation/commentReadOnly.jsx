"use strict";

import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import GeneLocusName from 'modules/connectedComponents/gene/locusName';
import AnnotationStatusReadOnly from 'ui/annotation/statusReadOnly';

class CommentAnnotationReadOnly extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return this.props.compact? this.renderCompact() : this.renderLarge();
    }

    renderCompact() {
        return (
            <div>
                <GeneLocusName localId={this.props.commentAnnotation.geneLocalId} />&nbsp;
                <em>has the following comment:</em>&nbsp;
                {this.props.commentAnnotation.comment}.&nbsp;
                <AnnotationStatusReadOnly annotationStatus={this.props.annotationStatus} />
            </div>
        );
    }

    renderLarge() {
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
    commentAnnotation: PropTypes.object,
    annotationStatus: PropTypes.string,
    annotationTypeName: PropTypes.string,
    compact: PropTypes.bool,
};

export default CommentAnnotationReadOnly;
