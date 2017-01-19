"use strict";

import React from 'react';

const inputContainerStyle = {
    display: "inline-block",
    padding: "10px"
};

class GeneTerm extends React.Component {
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
            <div>
                <div style={inputContainerStyle}>
                    <h5>Gene</h5>
                    <select>
                        {
                            this.props.geneOrder.filter(
                                geneId => this.props.geneIndex[geneId].finalized
                            ).map(this.generateGeneOption)
                        }
                    </select>
                </div>
            </div>
        );
    }
}

GeneTerm.propTypes = {
    geneIndex: React.PropTypes.object,
    geneOrder: React.PropTypes.arrayOf(
        React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.string
        ])
    )
};

export default GeneTerm;
