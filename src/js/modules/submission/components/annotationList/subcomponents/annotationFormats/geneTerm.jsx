"use strict";

import React from 'react';
import { Media, Label, Button, Row, Col } from 'reactstrap';

import GenePicker from '../genePicker';
import { annotationTypeData } from "../../../../constants";
import KeywordTextInput from '../../../keywordTextInput';
import CustomTextInput from "lib/components/customTextInput";

const inputContainerStyle = {
    display: "inline-block",
    padding: "10px"
};

class GeneTerm extends React.Component {
    constructor(props) {
        super(props);

        this.generateEvidenceWith = this.generateEvidenceWith.bind(this);
    }

    getEWColor(finalized, isValid) {
        if (finalized) {
            return isValid? "green": "red";
        } else {
            return "black";
        }
    }

    getEWStatus(finalized, isValid) {
        let className = "fa fa-fw ";
        if (finalized) {
            return className +  (isValid? "fa-check": "fa-exclamation-circle");
        } else {
            return className + "fa-chain";
        }
    }

    generateEvidenceWith(evidenceWithId) {
        const currentEvidenceWith = this.props.annotationData.data.evidenceWithIndex[evidenceWithId];
        // TODO: Clean up this code and move into its own component.
        return (
            <Media key={`evidence_with_${evidenceWithId}`}>
                <Media body>
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
                </Media>
                <Media right>
                    <span className={this.getEWStatus(currentEvidenceWith.finalized, currentEvidenceWith.isValid)}
                        style={{color: this.getEWColor(currentEvidenceWith.finalized, currentEvidenceWith.isValid)}} >
                    </span>
                </Media>
            </Media>
        );
    }

    render() {
        let typeData = annotationTypeData[this.props.annotationData.annotationType];

        return (
            <Row>
                <Col style={inputContainerStyle}>
                    <Label>
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
                    <Label>
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
                    <Label>
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
                {(this.props.annotationData.data.methodEvidenceCode === 'IGI' || this.props.annotationData.data.methodEvidenceCode === 'IPI')?(
                <Col>
                    <Label>
                        Evidence With
                        {this.props.annotationData.data.evidenceWithOrder.map(this.generateEvidenceWith)}
                        <Button color="success"
                            onClick={this.props.onEvidenceWithAddClick}
                        >
                            <span className="fa fa-plus"></span> Evidence With
                        </Button>
                    </Label>
                </Col>
                ):(<span />)}
            </Row>
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
