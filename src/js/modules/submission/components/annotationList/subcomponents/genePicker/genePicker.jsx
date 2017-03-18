"use strict";

import React from 'react';

import CustomSelect from 'lib/components/customSelect';

class GenePicker extends React.Component {
    constructor(props) {
        super(props);
        
        this.generateGeneOption = this.generateGeneOption.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    generateGeneOption(geneId) {
        let currGene = this.props.geneIndex[geneId];
        return (
            <option
                value={geneId}
                key={`gene_choice_${geneId}`}
            >
                {currGene.finalizedLocusName}
            </option>
        );
    }

    handleChange(event) {
        this.props.onChange(event.target.value);
    }

    render() {
        return (
            <CustomSelect
                onChange={this.handleChange}
                value={this.props.value}
            >
                {
                    this.props.geneOrder.filter(
                        geneId => this.props.geneIndex[geneId].finalized
                    ).map(this.generateGeneOption)
                }
            </CustomSelect>
        );
    }
}

GenePicker.propTypes = {
    geneIndex: React.PropTypes.object,
    geneOrder: React.PropTypes.arrayOf(
        React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.string
        ])
    ),
    onChange: React.PropTypes.func,
    value: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
    ])
};

GenePicker.defaultProps = {
    onChange: () => {},
    value: ""
};

export default GenePicker;