"use strict";

import React from 'react';

import GenePicker from '../genePicker';

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
                    <GenePicker />
                </div>
                <div style={inputContainerStyle}>
                    <h5>Gene 2</h5>
                    <GenePicker />
                </div>
                <div style={inputContainerStyle}>
                    <h5>Method</h5>
                    <input type="text"/>
                </div>
                
            </div>
        );
    }
}

GeneGene.propTypes = {
    annotationData: React.PropTypes.object
};

export default GeneGene;
