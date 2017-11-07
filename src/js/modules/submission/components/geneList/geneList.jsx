"use strict";

import React from 'react';
import SingleGene from './subcomponents/singleGene';
import { Alert, Button, Row, Col } from 'reactstrap';

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
                                <Col sm={{size:4, offset:4}} className="justify-content-sm-center">
                                    <Button block color="success"
                                        onClick={this.props.onGeneAddClick}
                                        >
                                        <span className="fa fa-plus" title="Add Gene"></span> Add Gene
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
    geneIndex: React.PropTypes.object,
    geneOrder: React.PropTypes.arrayOf(
        React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string])
    ),
    onGeneAddClick: React.PropTypes.func,
    removeGene: React.PropTypes.func,
    clearGene: React.PropTypes.func,
    validateGeneData: React.PropTypes.func,
};

GeneList.defaultProps = {
    geneIndex: {},
    geneOrder: [],
    onGeneAddClick: () => {},
    removeGene: () => {},
    clearGene: () => {},
    validateGeneData: () => {},
};


export default GeneList;
