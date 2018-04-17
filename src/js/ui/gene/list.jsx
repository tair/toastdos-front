"use strict";

import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Row, Col } from 'reactstrap';
import SingleGene from 'modules/connectedComponents/gene/singleGene';

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
                title={`Locus ${index + 1}`}
                onRemoveClick={(this.props.geneOrder.length === 1) ? (
                    () => this.props.clearGene(geneId)
                ):(
                    () => this.props.removeGene(geneId)
                )}
                validateGeneData={this.props.validateGeneData.bind(this, geneId)}
                updateGeneData={this.props.updateGeneData.bind(this, geneId)}
                locusName={geneData.finalizedLocusName}
                geneSymbol={geneData.finalizedGeneSymbol}
                fullName={geneData.finalizedFullName}
                validationError={geneData.validationError}
                validationState={geneData.validationState}
                reviewValidated={this.props.reviewValidated}
            />
        );
    }

    render() {
        return (
            <div className="gene-list-container">
                <div className="gene-list">
                    <Row>
                        <Col>
                            <h4>2. Genes</h4>
                            <Alert color="light">Enter genes with a UniProt ID, AGI locus ID, or RNA Central ID. Optionally enter a gene symbol and full name.</Alert>
                        </Col>
                        <Col sm={{size:9}}>
                            {(this.props.geneOrder.length <= 0) ?
                            (
                                <Alert color="secondary">
                                    <span className="empty-message">
                                        No Genes
                                    </span>
                                </Alert>
                            ) : null
                            }
                            {this.props.geneOrder.map(this.generateGene)}
                            <Row className="justify-content-sm-center mt-3 mb-3">
                                <Col sm='4' className="justify-content-sm-center">
                                    <Button block color="success"
                                        onClick={this.props.onGeneAddClick}
                                        >
                                        <span className="fa fa-plus" title="Add Gene"></span> Add Another Gene
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

GeneList.propTypes = {
    geneIndex: PropTypes.object,
    geneOrder: PropTypes.arrayOf(PropTypes.string),
    onGeneAddClick: PropTypes.func,
    removeGene: PropTypes.func,
    clearGene: PropTypes.func,
    validateGeneData: PropTypes.func,
    reviewValidated: PropTypes.number,
    curating: PropTypes.bool
};

GeneList.defaultProps = {
    geneIndex: {},
    geneOrder: [],
    onGeneAddClick: () => {},
    removeGene: () => {},
    clearGene: () => {},
    validateGeneData: () => {},
    reviewValidated: 0,
    curating: false,
};


export default GeneList;
