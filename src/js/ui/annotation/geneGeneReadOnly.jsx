"use strict";

import React from 'react';
import { Card, CardHeader, CardBody, Row, Col, Label } from 'reactstrap';
import GeneLocusName from 'modules/connectedComponents/gene/locusName';
import ExternalIdBadge from 'ui/externalIdBadge';
import AnnotationStatusReadOnly from 'ui/annotation/statusReadOnly';

class GeneGeneAnnotationReadOnly extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return this.props.compact? this.renderCompact() : this.renderLarge();
    }

    renderCompact() {
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
            <div>
                {locus1} <em>interacts with</em> {locus2}, {this.props.geneGeneAnnotation.methodName}&nbsp;
                <ExternalIdBadge externalId={this.props.geneGeneAnnotation.methodExternalId} />.&nbsp;
                <AnnotationStatusReadOnly annotationStatus={this.props.annotationStatus} />
            </div>
        );
    }

    renderLarge() {
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
                    <Row>
                        <Col>
                            {this.props.annotationTypeName}: {locus1} {'\u2194'} {locus2}
                        </Col>
                        <Col sm="auto">
                            <AnnotationStatusReadOnly
                                annotationStatus={this.props.annotationStatus}
                            />
                        </Col>
                    </Row>
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
    compact: React.PropTypes.bool,
};

export default GeneGeneAnnotationReadOnly;
