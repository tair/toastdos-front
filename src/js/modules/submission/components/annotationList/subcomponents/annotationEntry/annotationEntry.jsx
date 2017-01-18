"use strict";

import React from 'react';

import {
        annotationTypes,
        annotationTypeData
    } from "../../../../constants";

class AnnotationEntry extends React.Component {
    constructor(props) {
        super(props);

        this.generateTypeOption = this.generateTypeOption.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
    }

    generateTypeOption(typeId) {
        let currType = annotationTypeData[typeId];

        return (
            <option
                key={`atype_${typeId}`}
                value={typeId}
            >
                {currType.name}
            </option>
        );
    }

    handleTypeChange(event) {
        this.props.onTypeChange(event.target.value);
    }

    render() {
        return (
            <div>
                <h4>{this.props.title}</h4>
                <div>
                    <select
                        name="Annotation Type"
                        id="annotation_type"
                        onChange={this.handleTypeChange}
                        value={this.props.annotationType}
                    >
                        {Object.keys(annotationTypes).map(this.generateTypeOption)}
                    </select>
                </div>
                <div>
                    <button>Remove Annotation</button>
                </div>
            </div>
        );
    }
 }

AnnotationEntry.propTypes = {
    annotationType: React.PropTypes.oneOf(Object.keys(annotationTypes)),
    title: React.PropTypes.string,
    onTypeChange: React.PropTypes.func
};

export default AnnotationEntry;
