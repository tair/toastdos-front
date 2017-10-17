"use strict";

import React from 'react';
import PublicationField from '../publicationField';
import GeneList from '../geneList';
import AnnotationList from '../annotationList';
import {Card, CardHeader, CardBody, CardTitle, Button, Container,
    Row, Col} from 'reactstrap';

import {
        annotationTypeData,
        annotationFormats
    } from '../../constants';
import {geneListSelector, annotationListSelector} from '../../selectors';
import 'css/submissionView.scss';

class SubmissionReadOnly extends React.Component {
    constructor(props) {
        super(props);
        this.renderAnnotation = this.renderAnnotation.bind(this);
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
                        <Col xs="4">
                            <strong>Symbol:</strong> 
                        </Col>
                        <Col>
                            {gene.finalizedGeneSymbol}
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col xs="4">
                            <strong>Full Name:</strong>
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
                body = (<div>
                    <Row>
                        <Col xs="4">
                            <strong>Method:</strong> 
                        </Col>
                        <Col>
                            {annotation.data.methodName}
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col xs="4">
                            <strong>{type}:</strong>
                        </Col>
                        <Col>
                            {annotation.data.keywordName}
                        </Col>
                    </Row>
                </div>);
                break;
            case annotationFormats.GENE_GENE:
                title = type +
                    ': ' +
                    this.getLocusName(annotation.data.gene1LocalId) +
                    ' \u2194 ' +
                    this.getLocusName(annotation.data.gene2LocalId);
                body = (<Row>
                    <Col xs="4">
                        <strong>Method:</strong> 
                    </Col>
                    <Col>
                        {annotation.data.methodName}
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
            <Row>
                <Col>
                    <Row>
                        <Col sm="3">
                            <h5>Publication ID</h5>
                        </Col>
                        <Col>
                            <em>{this.props.publication}</em>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col sm="3">
                            <h5>Genes</h5>
                        </Col>
                        <Col>
                            {this.props.genes.filter(g => g.finalized).map(this.renderGene)}
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col sm="3">
                            <h5>Annotations</h5>
                        </Col>
                        <Col>
                            {this.props.annotations.map(this.renderAnnotation)}
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

SubmissionReadOnly.propTypes = {
    publication: React.PropTypes.string,
    genes: React.PropTypes.array,
    annotations: React.PropTypes.array,
    geneIndex: React.PropTypes.object
};

export default SubmissionReadOnly;
