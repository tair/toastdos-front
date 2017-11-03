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
import LabelInputRow from "../../../labelInputRow";

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
                attemptValidate={(locusName) => this.attemptValidate(evidenceWithId, locusName)}
                removeEvidenceWith={this.props.removeEvidenceWith.bind(this, evidenceWithId)}
            />
        );
    }

    componentWillReceiveProps(nextprops) {

        // Checks for methodId to be null
        // methodId should only be null if there is no data, or a search is currently unresolved
        // If methodId is null, removeEvidenceWith is called on all evidenceWith in the annotation
        if (nextprops.annotationData.data.methodId === null) {
            this.props.annotationData.data.evidenceWithOrder.map(this.props.removeEvidenceWith);
        }

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
                <LabelInputRow title="Gene">
                    <GenePicker
                        onChange={value => this.props.onDataChange(
                            Object.assign({}, this.props.annotationData.data, {
                                geneLocalId: value
                            })
                        )}
                        value={this.props.annotationData.data.geneLocalId}
                    />
                </LabelInputRow>
                <LabelInputRow title={typeData.name}>
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
                </LabelInputRow>
                <LabelInputRow title="Method">
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
                </LabelInputRow>
                {this.needsEvidenceWith?(
                <LabelInputRow
                    title="Evidence With"
                    align="align-items-start">
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
                </LabelInputRow>
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
