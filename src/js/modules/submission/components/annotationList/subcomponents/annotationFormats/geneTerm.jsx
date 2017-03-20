"use strict";

import React from 'react';

import GenePicker from '../genePicker';
import { annotationTypeData } from "../../../../constants";
import KeywordTextInput from '../../../keywordTextInput';

const inputContainerStyle = {
    display: "inline-block",
    padding: "10px"
};

class GeneTerm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let typeData = annotationTypeData[this.props.annotationData.annotationType];

        return (
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
        );
    }
}

GeneTerm.propTypes = {
    annotationData: React.PropTypes.object,
    onDataChange: React.PropTypes.func
};

GeneTerm.propTypes = {
    onDataChange: () => {}
};

export default GeneTerm;
