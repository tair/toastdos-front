"use strict";

import React from 'react';

const inputContainerStyle = {
    display: "inline-block",
    padding: "10px"
};

class GeneGene extends React.Component {
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
                    <h5>Gene 1</h5>
                    <select>
                        {
                            this.props.geneOrder.filter(
                                geneId => this.props.geneIndex[geneId].finalized
                            ).map(this.generateGeneOption)
                        }
                    </select>
                </div>
                <div style={inputContainerStyle}>
                    <h5>Gene 2</h5>
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

GeneGene.propTypes = {
    geneIndex: React.PropTypes.object,
    geneOrder: React.PropTypes.arrayOf(
        React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.string
        ])
    )
};

export default GeneGene;
