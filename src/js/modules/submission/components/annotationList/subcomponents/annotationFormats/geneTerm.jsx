"use strict";

import React from 'react';

import GenePicker from '../genePicker';
import { annotationTypeData } from "../../../../constants";
import SmartTextInput from 'lib/components/smartTextInput';

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

        const methodSuggestions = {
            1: "Suggestion 1",
            2: "Suggestion 2",
            "Three": "Suggestion 3",
            "Five": "Thisisareallyongsuggestiontha will overflow"
        };
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
                    <SmartTextInput
                        onChange={value => this.props.onDataChange(
                            Object.assign({}, this.props.annotationData.data, {
                                keywordName: value
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
                    />
                </div>
                <div style={inputContainerStyle}>
                    <h5>Method</h5>
                    <SmartTextInput
                        onChange={value => this.props.onDataChange(
                            Object.assign({}, this.props.annotationData.data, {
                                methodName: value
                            })
                        )}
                        onSelect={(id, value) => this.props.onDataChange(
                            Object.assign({}, this.props.annotationData.data, {
                                methodName: value,
                                methodId: id
                            })
                        )}
                        value={this.props.annotationData.data.methodName}
                        placeholder="e.g. Enzyme Assay"
                        suggestionIndex={methodSuggestions}
                        suggestionOrder={Object.keys(methodSuggestions)}
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
