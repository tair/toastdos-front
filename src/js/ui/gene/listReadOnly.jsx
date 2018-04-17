"use strict";

import React from 'react';
import PropTypes from 'prop-types';
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
                    localId={geneLocalId}
                    compact={this.props.compact} />
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
    geneOrder: PropTypes.arrayOf(PropTypes.string),
    curating: PropTypes.bool,
    compact: PropTypes.bool
};

GeneListReadOnly.defaultProps = {
    geneOrder: [],
    curating: false,
    compact: true,
};


export default GeneListReadOnly;
