"use strict";

import React from 'react';

import GenePicker from '../genePicker';
import EvidenceWith from "../../../evidenceWith";
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

    generateEvidenceWith(evidenceWithId) {
        return (
            <EvidenceWith 
                key={evidenceWithId}
                evidenceWithId={evidenceWithId}
                validateEvidenceWith={this.props.validateEvidenceWith}
            />
        );
    }

    render() {
        let typeData = annotationTypeData[this.props.annotationData.annotationType];

        return (
            <div>
                <div>
                    <div style={inputContainerStyle}>
                        <h5>Gene</h5>
                        <GenePicker
                            onChange={value => this.props.onDataChange(
                                Object.assign({}, this.props.annotationData.data, {
                                    geneLocalId: value
                                })
                            )}
                            value={this.props.annotationData.data.geneLocalId}
                        />
                    </div>
                    <div style={inputContainerStyle}>
                        <h5>{typeData.name}</h5>
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
                    </div>
                    <div style={inputContainerStyle}>
                        <h5>Method</h5>
                        <KeywordTextInput
                            onChange={value => this.props.onDataChange(
                                Object.assign({}, this.props.annotationData.data, {
                                    methodName: typeof value == 'object'? value.name : value,
                                    methodId: null,
                                    methodEvidenceCode: null,
                                })
                            )}
                            onSelect={(id, value) => {console.log(value); this.props.onDataChange(
                                Object.assign({}, this.props.annotationData.data, {
                                    methodName: value.name,
                                    methodId: id,
                                    methodEvidenceCode: value.evidence_code
                                })
                            )}}
                            placeholder="e.g. Enzyme Assay"
                            value={this.props.annotationData.data.methodName}
                            searchScope="eco"
                        />
                    </div>
                </div>
                {(this.props.annotationData.data.methodEvidenceCode === 'IGI' || this.props.annotationData.data.methodEvidenceCode === 'IPI')?(
                    <div>
                    <h5>Evidence With</h5>
                    {this.props.annotationData.data.evidenceWithOrder.map(this.generateEvidenceWith)}
                    <button
                        className="btn btn-secondary"
                        onClick={this.props.onEvidenceWithAddClick}
                    >
                        <span className="fa fa-plus"></span>
                    </button>
                </div>
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
