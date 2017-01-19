"use strict";

import React from 'react';

class GenePicker extends React.Component {
    constructor(props) {
        super(props);
        
        this.generateGeneOption = this.generateGeneOption.bind(this);
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

    render() {
        return (
            <select>
                {
                    this.props.geneOrder.filter(
                        geneId => this.props.geneIndex[geneId].finalized
                    ).map(this.generateGeneOption)
                }
            </select>
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
    onChange: React.PropTypes.func
};

GenePicker.defaultProps = {
    onChange: () => {}
};

export default GenePicker;
