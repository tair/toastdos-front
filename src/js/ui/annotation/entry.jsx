"use strict";

import React from 'react';
import { Card, CardHeader, CardBody, InputGroup,
    InputGroupAddon, Row, Col, Button } from 'reactstrap';
import CustomSelect from 'lib/components/customSelect';
import {
    annotationTypes,
    annotationTypeData,
    annotationFormats,
} from 'domain/annotation/constants';
import CommentAnnotation from 'modules/connectedComponents/annotation/comment';
import GeneTermAnnotation from 'modules/connectedComponents/annotation/geneTerm';
import GeneGeneAnnotation from 'modules/connectedComponents/annotation/geneGene';
import AnnotationStatusButton from 'ui/annotation/statusButton';


class AnnotationEntry extends React.Component {
    constructor(props) {
        super(props);

        this.generateTypeOption = this.generateTypeOption.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.renderAnnotationFormat = this.renderAnnotationFormat.bind(this);
    }

    generateTypeOption(typeId) {
        let currType = annotationTypeData[typeId];

        return (
            <option
                key={`atype_${typeId}`}
                value={typeId}
            >
                {currType.name}
            </option>
        );
    }

    handleTypeChange(event) {
        this.props.onTypeChange(event.target.value);
    }

    renderAnnotationFormat() {
        switch(annotationTypeData[this.props.annotation.annotationType].format) {
        case annotationFormats.COMMENT:
            return (
                <CommentAnnotation
                    localId={this.props.annotation.annotationTypeLocalId}
                    geneOrder={this.props.geneOrder}
                />
            );
        case annotationFormats.GENE_TERM:
            return (
                <GeneTermAnnotation
                    localId={this.props.annotation.annotationTypeLocalId}
                    geneOrder={this.props.geneOrder}
                />
            );
        case annotationFormats.GENE_GENE:
            return (
                <GeneGeneAnnotation
                    localId={this.props.annotation.annotationTypeLocalId}
                    geneOrder={this.props.geneOrder}
                />
            );
        default:
            return (
                <span>
                    Unrecongnized Format
                </span>
            );
        }
    }

    renderButtons() {
        if (!this.props.curating) {
            return (
                <Button color="danger"
                    onClick={this.props.onDeleteClick}>
                    <span className="fa fa-close" title="Remove Annotation"></span>
                </Button>
            );
        } else {
            return (
                <AnnotationStatusButton
                    annotationStatus={this.props.annotation.annotationStatus}
                    onStatusChange={this.props.onStatusChange}
                />
            );
        }
    }

    render() {
        return (
            <Card className="annotation-entry mt-3">
                <CardHeader>
                    <Row>
                        <Col>
                            <InputGroup>
                                <InputGroupAddon className="bg-light-green text-dark">
                                    {this.props.title}
                                </InputGroupAddon>
                                <CustomSelect name="Annotation Type"
                                    onChange={this.handleTypeChange}
                                    value={this.props.annotation.annotationType}
                                >
                                    {Object.keys(annotationTypes).map(this.generateTypeOption)}
                                </CustomSelect>
                            </InputGroup>
                        </Col>
                        <Col sm="auto" className="text-right input-container">
                            {this.renderButtons()}
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    {this.renderAnnotationFormat()}
                </CardBody>
            </Card>
        );
    }
 }

AnnotationEntry.propTypes = {
    annotation: React.PropTypes.shape({
        localId: React.PropTypes.string,
        annotationType: React.PropTypes.oneOf(Object.keys(annotationTypes)),
        annotationTypeLocalId: React.PropTypes.string,
    }).isRequired,
    title: React.PropTypes.string,
    geneOrder: React.PropTypes.array,
    onTypeChange: React.PropTypes.func,
    onDeleteClick: React.PropTypes.func,
    onStatusChange: React.PropTypes.func,
    curating: React.PropTypes.bool
};

AnnotationEntry.defaultProps = {
    annotation: null,
    title: '',
    geneOrder: [],
    onTypeChange: () => {},
    onStatusChange: () => {},
    onDeleteClick: () => {},
    curating: false,
};


export default AnnotationEntry;
