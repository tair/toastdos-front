"use strict";

import React from 'react';
import { ListGroup, ListGroupItem, InputGroup, InputGroupAddon,
    Label, Button, Row, Col } from 'reactstrap';

import GenePicker from '../genePicker';
import EvidenceWith from "../../../evidenceWith";
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
        this.needsEvidenceWith = this.props.needsEvidenceWith;
    }

    attemptValidate(evidenceWithId, locusName){
        this.props.validateEvidenceWith(evidenceWithId, locusName);
    }

    generateEvidenceWith(evidenceWithId) {
        let annotationId = this.props.annotationId;
        return (
            <EvidenceWith
                key={evidenceWithId}
                evidenceWithId={evidenceWithId}
                annotationData={this.props.annotationData}
                attemptValidate={(locusName) => this.attemptValidate(evidenceWithId,locusName)}
                removeEvidenceWith={this.props.removeEvidenceWith.bind(this,annotationId,evidenceWithId)}
            />
        );
    }

    componentWillReceiveProps(nextprops) {
        if (nextprops.annotationData.data.methodEvidenceCode === 'IGI' || nextprops.annotationData.data.methodEvidenceCode === 'IPI') {
            if (nextprops.annotationData.data.evidenceWithOrder.length == 0) {
                nextprops.onEvidenceWithAddClick();
            }
            this.needsEvidenceWith = true;
        }
        else {
            this.needsEvidenceWith = false;
        }
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
                    <Col>
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
                    <Col>
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
                            required={true}
                        />
                    </Col>
                </Row>
                <Row className="align-items-middle mt-3">
                    <Col xs="3" className="text-right d-table-cell">
                        <Label className="align-center">
                            Method
                        </Label>
                    </Col>
                    <Col>
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
                            required={true}
                        />
                    </Col>
                </Row>
                {this.needsEvidenceWith?(
                <Row className="align-items-middle mt-3">
                    <Col xs="3" className="text-right d-table-cell">
                        <Label className="align-center pt-3">
                            Evidence With
                        </Label>
                    </Col>
                    <Col>
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
    annotationId: React.PropTypes.any,
    validateEvidenceWith: React.PropTypes.func,
    onEvidenceWithAddClick: React.PropTypes.func,
    onDataChange: React.PropTypes.func,
    removeEvidenceWith: React.PropTypes.func,
    needsEvidenceWith: React.PropTypes.bool,
};

GeneTerm.defaultProps = {
    onDataChange: () => {},
    onEvidenceWithAddClick: () => {},
    validateEvidenceWith: () => {},
    removeEvidenceWith: () => {},
    needsEvidenceWith: false,
};

export default GeneTerm;
