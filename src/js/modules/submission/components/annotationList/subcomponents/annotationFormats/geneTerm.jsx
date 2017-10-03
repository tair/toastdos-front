"use strict";

import React from 'react';

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

    generateEvidenceWith(evidenceWithId) {
        const currentEvidenceWith = this.props.annotationData.data.evidenceWithIndex[evidenceWithId];
        return (
            <div style={inputContainerStyle} key={`evidence_with_${evidenceWithId}`}>    
                <CustomTextInput
                    placeholder="e.g. a locus, protein"
                    value={currentEvidenceWith.locusName}
                    onChange={event => this.props.onDataChange({
                                ...this.props.annotationData.data,
                                evidenceWithIndex: {
                                    ...this.props.annotationData.data.evidenceWithIndex,
                                    [evidenceWithId]: {
                                        ...currentEvidenceWith,
                                        locusName: event.target.value
                                    }
                                }
                            })
                        }
                />
            </div>
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
                                    methodName: value,
                                    methodId: null
                                })
                            )}
                            onSelect={(id, value) => this.props.onDataChange(
                                Object.assign({}, this.props.annotationData.data, {
                                    methodName: value,
                                    methodId: id
                                })
                            )}
                            placeholder="e.g. Enzyme Assay"
                            value={this.props.annotationData.data.methodName}
                            searchScope="eco"
                        />
                    </div>
                </div>
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
            </div>
        );
    }
}

GeneTerm.propTypes = {
    annotationData: React.PropTypes.object,
    onEvidenceWithAddClick: React.PropTypes.func,
    onDataChange: React.PropTypes.func
};

GeneTerm.defaultProps = {
    onDataChange: () => {},
    onEvidenceWithAddClick: () => {}
};

export default GeneTerm;
