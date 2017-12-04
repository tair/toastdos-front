"use strict";

import React from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import GeneLocusName from 'modules/connectedComponents/gene/locusName';

class CommentAnnotationReadOnly extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card className="mb-3">
                <CardHeader>
                    {this.props.annotationTypeName}: <GeneLocusName
                        localId={this.props.commentAnnotation.geneLocalId} />
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
    annotationTypeName: React.PropTypes.string,
};

export default CommentAnnotationReadOnly;
