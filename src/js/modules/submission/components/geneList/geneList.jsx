"use strict";

import React from 'react';
import SingleGene from './subcomponents/singleGene';

class GeneList extends React.Component {
    constructor(props) {
        super(props);
        
        this.generateGene = this.generateGene.bind(this);
    }

    generateGene(geneId, index) {
        let geneData = this.props.geneIndex[geneId];
        return (
            <SingleGene
                key={`gene_${geneData.localId}`}
                title={`Gene ${index + 1}`}
                onRemoveClick={() => this.props.removeGene(geneId)}
                validateGeneData={this.props.validateGeneData.bind(this, geneId)}
                onEditClick={this.props.editGeneData.bind(this, geneId)}
                validating={geneData.validating}
                locusName={geneData.finalizedLocusName}
                geneSymbol={geneData.finalizedGeneSynmbol}
                fullName={geneData.finalizedFullName}
                finalized={geneData.finalized}
            />
        );
    }

    render() {
        return (
            <div className="gene-list-container">
                <div className="gene-list">
                    <h2>Genes</h2>
                    {this.props.geneOrder.map(this.generateGene)}
                    
                </div>
                <button
                    className="btn btn-secondary"
                    onClick={this.props.onGeneAddClick}
                >
                    Add Gene
                </button>
            </div>
        );
    }
}

GeneList.propTypes = {
    geneIndex: React.PropTypes.object,
    geneOrder: React.PropTypes.arrayOf(
        React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string])
    ),
    onGeneAddClick: React.PropTypes.func,
    removeGene: React.PropTypes.func,
    validateGeneData: React.PropTypes.func,
    editGeneData: React.PropTypes.func
};

GeneList.defaultProps = {
    geneIndex: {},
    geneOrder: [],
    onGeneAddClick: () => {},
    removeGene: () => {},
    validateGeneData: () => {},
    editGeneData: () => {}
};


export default GeneList;
