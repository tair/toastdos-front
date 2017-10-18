"use strict";

import React from 'react';
import { ListGroup, ListGroupItem, InputGroup, InputGroupAddon,
    Label, Button, Row, Col } from 'reactstrap';

import GenePicker from '../genePicker';
import { annotationTypeData } from "../../../../constants";
import KeywordTextInput from '../../../keywordTextInput';
import CustomTextInput from "lib/components/customTextInput";
import ValidationStatus from "../../../validationStatus";

const inputContainerStyle = {
    display: "inline-block",
    padding: "10px"
};

class GeneTerm extends React.Component {
    constructor(props) {
        super(props);

        this.generateEvidenceWith = this.generateEvidenceWith.bind(this);
    }


    generateEvidenceWith(evidenceWithId) {
        const currentEvidenceWith = this.props.annotationData.data.evidenceWithIndex[evidenceWithId];
        // TODO: Clean up this code and move into its own component.
        return (
            <ListGroupItem key={`evidence_with_${evidenceWithId}`}>
                <InputGroup>
                    <CustomTextInput
                        placeholder="e.g. a locus, protein"
                        value={currentEvidenceWith.locusName}
                        onChange={event => this.props.onDataChange({
                                    ...this.props.annotationData.data,
                                    evidenceWithIndex: {
                                        ...this.props.annotationData.data.evidenceWithIndex,
                                        [evidenceWithId]: {
                                            ...currentEvidenceWith,
                                            finalized: false,
                                            locusName: event.target.value
                                        }
                                    }
                                })
                            }
                        onBlur={() => {this.props.validateEvidenceWith(evidenceWithId);}}
                        style={{marginRight: 10}}
                    />
                    <InputGroupAddon>
                        <ValidationStatus finalized={currentEvidenceWith.finalized} isValid={currentEvidenceWith.isValid} />
                    </InputGroupAddon>
                </InputGroup>
            </ListGroupItem>
        );
    }

    render() {
        let typeData = annotationTypeData[this.props.annotationData.annotationType];

        return (
            <div>
            <Row>
                <Col style={inputContainerStyle}>
                    <Label className="d-block">
                        Gene
                        <GenePicker
                            onChange={value => this.props.onDataChange(
                                Object.assign({}, this.props.annotationData.data, {
                                    geneLocalId: value
                                })
                            )}
                            value={this.props.annotationData.data.geneLocalId}
                        />
                    </Label>
                </Col>
                <Col style={inputContainerStyle}>
                    <Label className="d-block">
                        {typeData.name}
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
                    </Label>
                </Col>
                <Col style={inputContainerStyle}>
                    <Label className="d-block">
                        Method
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
                    </Label>
                </Col>
            </Row>
            <Row>
                {(this.props.annotationData.data.methodEvidenceCode === 'IGI' || this.props.annotationData.data.methodEvidenceCode === 'IPI')?(
                <Col>
                    <Label>
                        Evidence With
                    </Label>
                    <ListGroup>
                        {this.props.annotationData.data.evidenceWithOrder.map(this.generateEvidenceWith)}
                    </ListGroup>
                    <Button color="success" className="mt-3"
                        onClick={this.props.onEvidenceWithAddClick}
                    >
                        <span className="fa fa-plus"></span> Evidence With
                    </Button>
                </Col>
                ):(<span />)}
            </Row>
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
