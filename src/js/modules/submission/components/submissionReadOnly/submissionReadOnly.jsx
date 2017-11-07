"use strict";

import React from 'react';
import PublicationField from '../publicationField';
import GeneList from '../geneList';
import AnnotationList from '../annotationList';
import EvidenceWith from '../evidenceWith';
import {Card, CardHeader, CardBody, CardTitle, Button, Container,
    Badge, Row, Col, Label, ListGroup, ListGroupItem} from 'reactstrap';

import {
        annotationTypeData,
        annotationFormats,
        validationStates,
    } from '../../constants';
import {geneListSelector, annotationListSelector} from '../../selectors';
import 'css/submissionView.scss';

class SubmissionReadOnly extends React.Component {
    constructor(props) {
        super(props);
        this.renderAnnotation = this.renderAnnotation.bind(this);
        this.renderEvidenceWith = this.renderEvidenceWith.bind(this);
    }

    getLocusName(geneId) {
        return this.props.geneIndex[geneId].finalizedLocusName;
    }

    renderGene(gene) {
        return (
            <Card key={gene.localId} className="mb-3">
                <CardHeader>
                {gene.finalizedLocusName}
                </CardHeader>
                {(gene.finalizedGeneSymbol || gene.finalizedFullName) ? (
                <CardBody>
                    <Row>
                        <Col xs="3" className="text-right d-table-cell">
                            <Label className="align-center">
                                Symbol:
                            </Label>
                        </Col>
                        <Col>
                            {gene.finalizedGeneSymbol}
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col xs="3" className="text-right d-table-cell">
                            <Label className="align-center">
                                Full Name:
                            </Label>
                        </Col>
                        <Col>
                            {gene.finalizedFullName}
                        </Col>
                    </Row>
                </CardBody>
                ): null}
            </Card>
        );
    }

    renderEvidenceWith(evidenceWithId, evidenceWith) {
        return (
            <ListGroupItem key={evidenceWithId}>
                {evidenceWith[evidenceWithId].locusName}
            </ListGroupItem>
        );
    }


    renderAnnotation(annotation) {
        let body, title;
        let type = annotationTypeData[annotation.annotationType].name;
        switch(annotationTypeData[annotation.annotationType].format) {
            case annotationFormats.COMMENT:
                title = `${type}: ${this.getLocusName(annotation.data.geneLocalId)}`;
                body = <span>{annotation.data.comment}</span>;
                break;
            case annotationFormats.GENE_TERM:
                title = `${type}: ${this.getLocusName(annotation.data.geneLocalId)}`;
                const showEvidenceWith = annotation.data.methodEvidenceCode == 'IPI' || 
                    annotation.data.methodEvidenceCode == 'IGI';
                body = (<div>
                    <Row>
                        <Col xs="3" className="text-right d-table-cell">
                            <Label className="align-center">
                                Method:
                            </Label>
                        </Col>
                        <Col>
                            {annotation.data.methodName}
                            <br/>
                            <Badge color="success">{annotation.data.methodExternalId}</Badge>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col xs="3" className="text-right d-table-cell">
                            <Label className="align-center">
                                {type}:
                            </Label>
                        </Col>
                        <Col>
                            {annotation.data.keywordName}
                            <br/>
                            <Badge color="success">{annotation.data.keywordExternalId}</Badge>
                        </Col>
                    </Row>
                    {!showEvidenceWith? null : (
                    <Row className="mt-3">
                        <Col xs="3" className="text-right d-table-cell">
                            <Label className="align-center">
                                Evidence With:
                            </Label>
                        </Col>
                        <Col>
                            <ListGroup>
                                {annotation.data.evidenceWithOrder.map((order) =>
                                    this.renderEvidenceWith(order, this.props.evidenceWith)
                                )}
                            </ListGroup>
                        </Col>
                    </Row>
                    )}
                </div>);
                break;
            case annotationFormats.GENE_GENE:
                title = type +
                    ': ' +
                    this.getLocusName(annotation.data.gene1LocalId) +
                    ' \u2194 ' +
                    this.getLocusName(annotation.data.gene2LocalId);
                body = (
                <Row>
                    <Col xs="3" className="text-right d-table-cell">
                        <Label className="align-center">
                            Method:
                        </Label>
                    </Col>
                    <Col>
                        {annotation.data.methodName}
                        <br/>
                        <Badge color="success">{annotation.data.methodExternalId}</Badge>
                    </Col>
                </Row>);
                break;
        }
        return (
            <Card key={annotation.localId} className="mb-3">
                <CardHeader>
                    {title}
                </CardHeader>
                <CardBody>
                    {body}
                </CardBody>
            </Card>
        );
    }


    render() {
        return (
            <ListGroup>
                <ListGroupItem className="border-left-0 border-right-0 border-top-0">
                    <Row>
                        <Col sm="3">
                            <h5>Publication ID</h5>
                        </Col>
                        <Col>
                            <em>{this.props.publication}</em>
                        </Col>
                    </Row>
                </ListGroupItem>
                <ListGroupItem className="border-left-0 border-right-0">
                    <Row className="mt-3">
                        <Col sm="3">
                            <h5>Genes</h5>
                        </Col>
                        <Col>
                            {this.props.genes.filter(g => g.validationState === validationStates.VALID).map(this.renderGene)}
                        </Col>
                    </Row>
                </ListGroupItem>
                <ListGroupItem className="border-left-0 border-right-0 border-bottom-0">
                    <Row className="mt-3">
                        <Col sm="3">
                            <h5>Annotations</h5>
                        </Col>
                        <Col>
                            {this.props.annotations.map(this.renderAnnotation)}
                        </Col>
                    </Row>
                </ListGroupItem>
            </ListGroup>
        );
    }
}

SubmissionReadOnly.propTypes = {
    publication: React.PropTypes.string,
    genes: React.PropTypes.array,
    evidenceWith: React.PropTypes.object,
    annotations: React.PropTypes.array,
    geneIndex: React.PropTypes.object
};

export default SubmissionReadOnly;
