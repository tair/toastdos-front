"use strict";

import React from 'react';

import GenePicker from '../genePicker';
import CustomTextInput from "lib/components/customTextInput";

const inputContainerStyle = {
    display: "inline-block",
    padding: "10px"
};

class GeneGene extends React.Component {
    constructor(props) {
        super(props);
    
    }


    render() {
        return (
            <div>
                <div style={inputContainerStyle}>
                    <h5>Gene 1</h5>
                    <GenePicker
                        onChange={value => this.props.onDataChange(
                            Object.assign({}, this.props.annotationData.data, {
                                gene1LocalId: value
                            })
                        )}
                        value={this.props.annotationData.data.gene1LocalId}
                    />
                </div>
                <div style={inputContainerStyle}>
                    <h5>Gene 2</h5>
                    <GenePicker
                        onChange={value => this.props.onDataChange(
                            Object.assign({}, this.props.annotationData.data, {
                                gene2LocalId: value
                            })
                        )}
                        value={this.props.annotationData.data.gene2LocalId}
                    />
                </div>
                <div style={inputContainerStyle}>
                    <h5>Method</h5>
                    <CustomTextInput
                        onChange={event => this.props.onDataChange(
                            Object.assign({}, this.props.annotationData.data, {
                                methodName: event.target.value
                            })
                        )}
                        value={this.props.annotationData.data.methodName}
                        placeholder="e.g. Enzyme Assay"
                    />
                </div>
                
            </div>
        );
    }
}

GeneGene.propTypes = {
    annotationData: React.PropTypes.object,
    onDataChange: React.PropTypes.func
};

export default GeneGene;