"use strict";

import React from 'react';
import { Alert } from 'reactstrap';
import SingleGeneReadOnly from 'modules/connectedComponents/gene/singleGeneReadOnly';

class GeneListReadOnly extends React.Component {
    constructor(props) {
        super(props);

        this.renderGenes = this.renderGenes.bind(this);
    }

    renderGenes(geneOrder) {
        return geneOrder.map(
            geneLocalId =>
                <SingleGeneReadOnly
                    key={geneLocalId}
                    localId={geneLocalId} />
        );
    }

    render() {
        return (
            <div className="gene-list-container">
                <div className="gene-list">
                    {(this.props.geneOrder.length <= 0) ?
                        <Alert color="secondary">
                            <span className="empty-message">
                                No Genes
                            </span>
                        </Alert>
                    :
                        this.renderGenes(this.props.geneOrder)
                    }
                </div>
            </div>
        );
    }
}

GeneListReadOnly.propTypes = {
    geneOrder: React.PropTypes.arrayOf(React.PropTypes.string),
    curating: React.PropTypes.bool
};

GeneListReadOnly.defaultProps = {
    geneOrder: [],
    curating: false,
};


export default GeneListReadOnly;