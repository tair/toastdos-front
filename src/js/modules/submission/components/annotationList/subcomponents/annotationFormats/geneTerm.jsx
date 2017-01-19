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
                    <GenePicker />
                </div>
                <div style={inputContainerStyle}>
                    <h5>{typeData.name}</h5>
                    <input type="text"/>
                </div>
                <div style={inputContainerStyle}>
                    <h5>Method</h5>
                    <input type="text"/>
                </div>
            </div>
        );
    }
}

GeneTerm.propTypes = {
    annotationData: React.PropTypes.object
};

export default GeneTerm;
