"use strict";

import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody, Label, Col, Row } from 'reactstrap';

class SingleGeneReadOnly extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return this.props.compact ? this.renderCompact() : this.renderLarge();
    }

    renderCompact() {
        const gene = this.props.gene;
        const textArray = [gene.finalizedLocusName];
        if (gene.finalizedGeneSymbol) {
            textArray.push(gene.finalizedGeneSymbol);
        }

        if (gene.finalizedFullName) {
            textArray.push(gene.finalizedFullName);
        }

        return (<div> {textArray.join(", ")} </div>);
    }

    renderLarge() {
        let gene = this.props.gene;
        return (
            <Card key={gene.localId} className="mb-3">
                <CardHeader>
                    {gene.finalizedLocusName}
                </CardHeader>
                {(gene.finalizedGeneSymbol || gene.finalizedFullName) ? (
                <CardBody>
                    <Row>
                        <Col xs="3" className="text-right d-table-cell">
                            <Label className="align-center">
                                Symbol:
                            </Label>
                        </Col>
                        <Col>
                            {gene.finalizedGeneSymbol}
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col xs="3" className="text-right d-table-cell">
                            <Label className="align-center">
                                Full Name:
                            </Label>
                        </Col>
                        <Col>
                            {gene.finalizedFullName}
                        </Col>
                    </Row>
                </CardBody>
                ) : null}
            </Card>
        );
    }
}

SingleGeneReadOnly.propTypes = {
    gene: PropTypes.shape({
        localId: PropTypes.string,
        geneSymbolId: PropTypes.string,
        finalizedLocusName: PropTypes.string,
        finalizedGeneSymbol: PropTypes.string,
        finalizedFullName: PropTypes.string,
    }).isRequired,
    compact: React.PropTypes.bool
};

SingleGeneReadOnly.defaultProps = {
    gene: {},
    compact: true,
};


export default SingleGeneReadOnly;
