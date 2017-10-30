"use strict";

import React from 'react';
import { ListGroup, ListGroupItem, InputGroup, InputGroupAddon,
    Label, Button, Row, Col } from 'reactstrap';

import GenePicker from '../genePicker';
import { annotationTypeData } from "../../../../constants";
import KeywordTextInput from '../../../keywordTextInput';
import CustomTextInput from "lib/components/customTextInput";
import ValidationInput from "../../../validationInput";

const inputContainerStyle = {
    display: "inline-block",
    padding: "10px"
};

class GeneTerm extends React.Component {
    constructor(props) {
        super(props);

        this.generateEvidenceWith = this.generateEvidenceWith.bind(this);
    }

    attemptValidate(evidenceWithId, locusName){
        this.props.validateEvidenceWith(evidenceWithId, locusName);
    }

    generateEvidenceWith(evidenceWithId) {
        const currentEvidenceWith = this.props.annotationData.data.evidenceWithIndex[evidenceWithId];
        // TODO: Clean up this code and move into its own component.
        return (
            <ListGroupItem key={`evidence_with_${evidenceWithId}`}>
                <ValidationInput
                    finalized={currentEvidenceWith.finalized}
                    validationError={currentEvidenceWith.validationError}
                    validating={currentEvidenceWith.validating}
                    placeholder="e.g. a locus, protein"
                    value={currentEvidenceWith.locusName}
                    attemptValidate={(locusName) => this.attemptValidate(evidenceWithId,locusName)}
                    upperCaseOnly={true}
                />
            </ListGroupItem>
        );
    }

    render() {
        let typeData = annotationTypeData[this.props.annotationData.annotationType];

        return (
            <div>
                <Row className="align-items-middle">
                    <Col xs="3" className="text-right d-table-cell">
                        <Label className="align-center">
                            Gene
                        </Label>
                    </Col>
                    <Col className="d-block">
                        <GenePicker
                            onChange={value => this.props.onDataChange(
                                Object.assign({}, this.props.annotationData.data, {
                                    geneLocalId: value
                                })
                            )}
                            value={this.props.annotationData.data.geneLocalId}
                        />
                    </Col>
                </Row>
                <Row className="align-items-middle mt-3">
                    <Col xs="3" className="text-right d-table-cell">
                        <Label className="align-center">
                            {typeData.name}
                        </Label>
                    </Col>
                    <Col className="d-block">
                        <KeywordTextInput
                            onChange={value => this.props.onDataChange(
                                Object.assign({}, this.props.annotationData.data, {
                                    keywordName: value,
                                    keywordId: null
                                })
                            )}
                            onSelect={(id, value) => this.props.onDataChange(
                                Object.assign({}, this.props.annotationData.data, {
                                    keywordName: value,
                                    keywordId: id
                                })
                            )}
                            placeholder="Start Typing..."
                            value={this.props.annotationData.data.keywordName}
                            searchScope={typeData.keywordScope}
                        />
                    </Col>
                </Row>
                <Row className="align-items-middle mt-3">
                    <Col xs="3" className="text-right d-table-cell">
                        <Label className="align-center">
                            Method
                        </Label>
                    </Col>
                    <Col className="d-block">
                        <KeywordTextInput
                            onChange={value => this.props.onDataChange(
                                Object.assign({}, this.props.annotationData.data, {
                                    methodName: typeof value == 'object'? value.name : value,
                                    methodId: null,
                                    methodEvidenceCode: null,
                                })
                            )}
                            onSelect={(id, value) => this.props.onDataChange(
                                Object.assign({}, this.props.annotationData.data, {
                                    methodName: value.name,
                                    methodId: id,
                                    methodEvidenceCode: value.evidence_code
                                })
                            )}
                            placeholder="e.g. Enzyme Assay"
                            value={this.props.annotationData.data.methodName}
                            searchScope="eco"
                        />
                    </Col>
                </Row>
                {(this.props.annotationData.data.methodEvidenceCode === 'IGI' || this.props.annotationData.data.methodEvidenceCode === 'IPI')?(
                <Row className="align-items-middle mt-3">
                    <Col xs="3" className="text-right d-table-cell">
                        <Label className="align-center pt-3">
                            Evidence With
                        </Label>
                    </Col>
                    <Col className="d-block">
                        <ListGroup>
                            {this.props.annotationData.data.evidenceWithOrder.map(this.generateEvidenceWith)}
                        </ListGroup>
                        <Row className="justify-content-md-center">
                            <Col xs="auto" className="align-self-center">
                                <Button color="success" className="btn-sm"
                                    style={{
                                        borderTopRightRadius:0,
                                        borderTopLeftRadius:0,
                                    }}
                                    onClick={this.props.onEvidenceWithAddClick}
                                >
                                    <span className="fa fa-plus"></span> Evidence With
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                ):(<span />)}
            </div>
        );
    }
}

GeneTerm.propTypes = {
    annotationData: React.PropTypes.object,
    validateEvidenceWith: React.PropTypes.func,
    onEvidenceWithAddClick: React.PropTypes.func,
    onDataChange: React.PropTypes.func
};

GeneTerm.defaultProps = {
    onDataChange: () => {},
    onEvidenceWithAddClick: () => {},
    validateEvidenceWith: () => {}
};

export default GeneTerm;
