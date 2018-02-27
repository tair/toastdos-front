"use strict";

import React from 'react';
import { ListGroup, ListGroupItem, InputGroup, InputGroupAddon,
    Label, Button, Row, Col } from 'reactstrap';
import GenePicker from 'modules/connectedComponents/gene/picker';
import EvidenceWith from 'modules/connectedComponents/evidenceWith';
import { annotationTypeData } from 'domain/annotation/constants';
import KeywordTextInput from 'modules/connectedComponents/keywordTextInput';
import CustomTextArea from 'lib/components/customTextArea';
import ValidationInput from 'ui/validationInput';
import LabelInputRow from 'ui/labelInputRow';
import LabelDropdownInputRow from 'ui/labelDropdownInputRow';

const inputContainerStyle = {
    display: "inline-block",
    padding: "10px"
};

class GeneTermAnnotation extends React.Component {
    constructor(props) {
        super(props);

        this.generateEvidenceWith = this.generateEvidenceWith.bind(this);
        this.needsEvidenceWith = this.props.needsEvidenceWith;
    }

    attemptValidate(evidenceWithId, locusName){
        this.props.validateEvidenceWith(evidenceWithId, locusName);
    }

    generateEvidenceWith(evidenceWithId) {
        let onRemove = (this.props.geneTermAnnotation.evidenceWithOrder.length === 1) ?
            this.props.clearEvidenceWith : this.props.removeEvidenceWith;
        return (
            <EvidenceWith
                key={evidenceWithId}
                localId={evidenceWithId}
                attemptValidate={(locusName) => this.attemptValidate(evidenceWithId, locusName)}
                onRemove={onRemove}
            />
        );
    }

    componentWillReceiveProps(nextprops) {

        // Checks for methodId to be null
        // methodId should only be null if there is no data, or a search is currently unresolved
        // If methodId is null, removeEvidenceWith is called on all evidenceWith in the annotation
        if (nextprops.geneTermAnnotation.methodId === null) {
            this.props.geneTermAnnotation.evidenceWithOrder.map(this.props.removeEvidenceWith);
        }

        if (nextprops.geneTermAnnotation.methodEvidenceCode === 'IGI' || nextprops.geneTermAnnotation.methodEvidenceCode === 'IPI') {
            if (nextprops.geneTermAnnotation.evidenceWithOrder.length == 0) {
                nextprops.onEvidenceWithAddClick();
            }
            this.needsEvidenceWith = true;
        }
        else {
            this.needsEvidenceWith = false;
        }
    }

    render() {
        let typeData = annotationTypeData[this.props.geneTermAnnotation.annotationType];
        return (
            <div>
                <LabelInputRow title="Gene">
                    <GenePicker
                        geneOrder={this.props.geneOrder}
                        typeLocalId={this.props.localId}
                        onChange={value => this.props.onDataChange(
                            Object.assign({}, this.props.geneTermAnnotation, {
                                geneLocalId: value
                            })
                        )}
                        value={this.props.geneTermAnnotation.geneLocalId}
                    />
                </LabelInputRow>
                <LabelInputRow title={typeData.name}>
                    <KeywordTextInput
                        onChange={value => this.props.onDataChange(
                            Object.assign({}, this.props.geneTermAnnotation, {
                                keywordName: value.name,
                                keywordExternalId: "",
                                keywordId: null
                            })
                        )}
                        onSelect={(id, value) => this.props.onDataChange(
                            Object.assign({}, this.props.geneTermAnnotation, {
                                keywordName: value.name,
                                keywordExternalId: value.external_id,
                                keywordId: value.id
                            })
                        )}
                        placeholder="Start Typing..."
                        value={this.props.geneTermAnnotation.keywordName}
                        searchScope={typeData.keywordScope}
                        required={true}
                    />
                </LabelInputRow>
                <LabelInputRow title="Method">
                    <KeywordTextInput
                        onChange={value => this.props.onDataChange(
                            Object.assign({}, this.props.geneTermAnnotation, {
                                methodName: value.name,
                                methodId: null,
                                methodExternalId: "",
                                methodEvidenceCode: "",
                            })
                        )}
                        onSelect={(id, value) => this.props.onDataChange(
                            Object.assign({}, this.props.geneTermAnnotation, {
                                methodName: value.name,
                                methodId: value.id,
                                methodExternalId: value.external_id,
                                methodEvidenceCode: value.evidence_code
                            })
                        )}
                        placeholder="e.g. Enzyme Assay"
                        value={this.props.geneTermAnnotation.methodName}
                        searchScope="eco"
                        required={true}
                    />
                </LabelInputRow>

                {this.needsEvidenceWith ? (
                    this.props.geneTermAnnotation.evidenceWithOrder.length >= 2 ? (
                        <LabelDropdownInputRow
                            title="Evidence With"
                            align="align-items-start"
                            value={this.props.evidenceWithRelation}
                            items={[ "OR" , "AND" ]}
                            onClick={this.props.updateEvidenceWithRelation}>
                            <ListGroup>
                                {this.props.geneTermAnnotation.evidenceWithOrder.map(this.generateEvidenceWith)}
                            </ListGroup>
                            <Row className="justify-content-md-center">
                                <Col xs="auto" className="align-self-center">
                                    <Button color="success" className="btn-sm"
                                        style={{
                                            borderTopRightRadius: 0,
                                            borderTopLeftRadius: 0,
                                        }}
                                        onClick={this.props.onEvidenceWithAddClick}
                                    >
                                        <span className="fa fa-plus"></span> Evidence With
                            </Button>
                                </Col>
                            </Row>
                        </LabelDropdownInputRow>
                    ):(
                        <LabelInputRow
                            title="Evidence With"
                            align="align-items-start">
                            <ListGroup>
                                {this.props.geneTermAnnotation.evidenceWithOrder.map(this.generateEvidenceWith)}
                            </ListGroup>
                            <Row className="justify-content-md-center">
                                <Col xs="auto" className="align-self-center">
                                    <Button color="success" className="btn-sm"
                                        style={{
                                            borderTopRightRadius: 0,
                                            borderTopLeftRadius: 0,
                                        }}
                                        onClick={this.props.onEvidenceWithAddClick}
                                    >
                                        <span className="fa fa-plus"></span> Evidence With
                                    </Button>
                                </Col>
                            </Row>
                        </LabelInputRow>
                    )):(<span />)}
            </div>
        );
    }
}

GeneTermAnnotation.propTypes = {
    geneTermAnnotation: React.PropTypes.object,
    localId: React.PropTypes.string,
    geneOrder: React.PropTypes.array,
    validateEvidenceWith: React.PropTypes.func,
    onEvidenceWithAddClick: React.PropTypes.func,
    onDataChange: React.PropTypes.func,
    clearEvidenceWith: React.PropTypes.func,
    removeEvidenceWith: React.PropTypes.func,
    updateEvidenceWithRelation: React.PropTypes.func,
    evidenceWithRelation: React.PropTypes.string,
    needsEvidenceWith: React.PropTypes.bool,
};

GeneTermAnnotation.defaultProps = {
    onDataChange: () => {},
    onEvidenceWithAddClick: () => {},
    validateEvidenceWith: () => {},
    clearEvidenceWith: () => {},
    removeEvidenceWith: () => {},
    updateEvidenceWithRelation: () => {},
    evidenceWithRelation: "",
    needsEvidenceWith: false,
};

export default GeneTermAnnotation;
