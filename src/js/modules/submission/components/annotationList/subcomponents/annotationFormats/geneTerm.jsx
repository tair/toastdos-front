"use strict";

import React from 'react';

import GenePicker from '../genePicker';
import { annotationTypeData } from "../../../../constants";

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
                    <input
                        type="text"
                        onChange={event => this.props.onDataChange(
                            Object.assign({}, this.props.annotationData.data, {
                                keywordId: event.target.value
                            })
                        )}
                        value={this.props.annotationData.data.keywordId}
                    />
                </div>
                <div style={inputContainerStyle}>
                    <h5>Method</h5>
                    <input
                        type="text"
                        onChange={event => this.props.onDataChange(
                            Object.assign({}, this.props.annotationData.data, {
                                methodId: event.target.value
                            })
                        )}
                        value={this.props.annotationData.data.methodId}
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
