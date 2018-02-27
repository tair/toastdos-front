"use strict";

import React from 'react';
import { ListGroup, ListGroupItem, InputGroup, InputGroupAddon,
    Card, CardHeader, CardBody, Label, Button, Row, Col } from 'reactstrap';
import { annotationTypeData } from 'domain/annotation/constants';
import EvidenceWithReadOnly from 'modules/connectedComponents/evidenceWithReadOnly';
import ExternalIdBadge from 'ui/externalIdBadge';
import GeneLocusName from 'modules/connectedComponents/gene/locusName';
import AnnotationStatusReadOnly from 'ui/annotation/statusReadOnly';

class GeneTermAnnotationReadOnly extends React.Component {
    constructor(props) {
        super(props);

        this.geneTermAnnotation = this.props.geneTermAnnotation;
    }

    render() {
        let typeData = annotationTypeData[this.geneTermAnnotation.annotationType];
        let showEvidenceWith = this.geneTermAnnotation.methodEvidenceCode == 'IPI' ||
            this.geneTermAnnotation.methodEvidenceCode == 'IGI';
        let locusName = (
            <GeneLocusName
                localId={this.props.geneTermAnnotation.geneLocalId}
            />
        );

        return (
            <Card className="mb-3">
                <CardHeader>
                    <Row>
                        <Col>
                            {this.props.annotationTypeName}: {locusName}
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
                                {typeData.name}:
                            </Label>
                        </Col>
                        <Col>
                            {this.geneTermAnnotation.keywordName}
                            <br/>
                            <ExternalIdBadge externalId={this.geneTermAnnotation.keywordExternalId} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="3" className="text-right d-table-cell">
                            <Label className="align-center">
                                Method:
                            </Label>
                        </Col>
                        <Col>
                            {this.geneTermAnnotation.methodName}
                            <br/>
                            <ExternalIdBadge externalId={this.geneTermAnnotation.methodExternalId} />
                        </Col>
                    </Row>
                    {!showEvidenceWith ? null : (
                    <Row className="mt-3">
                        <Col xs="3" className="text-right d-table-cell">
                            <Label className="align-center">
                                Evidence With:
                            </Label>
                                {this.props.geneTermAnnotation.evidenceWithOrder.length >= 2 ? (
                                    <Label>
                                        Relation: {this.props.geneTermAnnotation.evidenceWithRelation}
                                    </Label>
                                ) : (<span />)}
                        </Col>
                        <Col>
                            <ListGroup>
                            {this.geneTermAnnotation.evidenceWithOrder.map(
                                evidenceWithLocalId =>
                                    <EvidenceWithReadOnly
                                        key={evidenceWithLocalId}
                                        localId={evidenceWithLocalId}
                                    />
                            )}
                            </ListGroup>
                        </Col>
                    </Row>
                    )}
                </CardBody>
            </Card>
        );
    }
}

GeneTermAnnotationReadOnly.propTypes = {
    geneTermAnnotation: React.PropTypes.object,
    localId: React.PropTypes.string,
    needsEvidenceWith: React.PropTypes.bool,
    annotationTypeName: React.PropTypes.string,
};

GeneTermAnnotationReadOnly.defaultProps = {
    needsEvidenceWith: false,
};

export default GeneTermAnnotationReadOnly;
