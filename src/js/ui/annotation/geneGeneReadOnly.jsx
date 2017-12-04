"use strict";

import React from 'react';
import { Card, CardHeader, CardBody, Row, Col, Label } from 'reactstrap';
import GeneLocusName from 'modules/connectedComponents/gene/locusName';
import ExternalIdBadge from 'ui/externalIdBadge';

class GeneGeneAnnotationReadOnly extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let locus1 = (
            <GeneLocusName
                localId={this.props.geneGeneAnnotation.gene1LocalId}
            />
        );

        let locus2 = (
            <GeneLocusName
                localId={this.props.geneGeneAnnotation.gene2LocalId}
            />
        );

        return (
            <Card className="mb-3">
                <CardHeader>
                    {this.props.annotationTypeName}: {locus1} {'\u2194'} {locus2}
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col xs="3" className="text-right d-table-cell">
                            <Label className="align-center">
                                Method:
                            </Label>
                        </Col>
                        <Col>
                            {this.props.geneGeneAnnotation.methodName}
                            <br/>
                            <ExternalIdBadge externalId={this.props.geneGeneAnnotation.methodExternalId} />
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        );
    }
}

GeneGeneAnnotationReadOnly.propTypes = {
    geneGeneAnnotation: React.PropTypes.object,
    annotationTypeName: React.PropTypes.string,
};

export default GeneGeneAnnotationReadOnly;
