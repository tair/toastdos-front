"use strict";

import React from 'react';
import { ListGroup, Button, Row, Col } from 'reactstrap';
import GenePicker from 'modules/connectedComponents/gene/picker';
import EvidenceWith from 'modules/connectedComponents/evidenceWith';
import { annotationTypeData } from 'domain/annotation/constants';
import KeywordTextInput from 'modules/connectedComponents/keywordTextInput';
import LabelInputRow from 'ui/labelInputRow';
import LabelDropdownInputRow from 'ui/labelDropdownInputRow';
import ValidatedField from 'ui/validatedField';


class GeneTermAnnotation extends React.Component {
    constructor(props) {
        super(props);

        this.generateEvidenceWith = this.generateEvidenceWith.bind(this);
        this.needsEvidenceWith = this.props.needsEvidenceWith;
        this.checkEvidenceWith(this.props);
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
        this.checkEvidenceWith(nextprops);
    }

    checkEvidenceWith(propsToCheck) {

        // Checks for methodId to be null
        // methodId should only be null if there is no data, or a search is currently unresolved
        // If methodId is null, removeEvidenceWith is called on all evidenceWith in the annotation
        if (propsToCheck.geneTermAnnotation.methodId === null) {
            this.props.geneTermAnnotation.evidenceWithOrder.map(this.props.removeEvidenceWith);
        }

        if (propsToCheck.geneTermAnnotation.methodEvidenceCode === 'IGI' || propsToCheck.geneTermAnnotation.methodEvidenceCode === 'IPI') {
            if (propsToCheck.geneTermAnnotation.evidenceWithOrder.length == 0) {
                propsToCheck.onEvidenceWithAddClick();
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
                <ValidatedField isValid={this.props.keywordValid}
                    invalidMessage="A gene term annotation requires a keyword."
                    reviewValidated={this.props.reviewValidated}
                >
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
                </ValidatedField>
                <ValidatedField isValid={this.props.methodValid}
                    invalidMessage="A gene term annotation requires a method."
                    reviewValidated={this.props.reviewValidated}
                >
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
                        minSuggestLength={0}
                        annotationType={this.props.geneTermAnnotation.annotationType}
                        required={true}
                    />
                </LabelInputRow>
                </ValidatedField>

                {this.needsEvidenceWith ?
                <ValidatedField isValid={this.props.ewValid}
                    invalidMessage="All evidence with fields must be valid."
                    reviewValidated={this.props.reviewValidated}
                >
                    {(this.props.geneTermAnnotation.evidenceWithOrder.length >= 2 ? (
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
                    ))}
                </ValidatedField>:(<span />)}
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
    keywordValid: React.PropTypes.bool,
    methodValid: React.PropTypes.bool,
    ewValid: React.PropTypes.bool,
    reviewValidated: React.PropTypes.number,
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
    keywordValid: false,
    methodValid: false,
    ewValid: false,
    reviewValidated: 0,
};

export default GeneTermAnnotation;
