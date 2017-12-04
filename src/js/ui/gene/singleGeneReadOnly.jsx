"use strict";

import React from 'react';
import { Card, CardHeader, CardBody, Label, Col, Row } from 'reactstrap';

class SingleGeneReadOnly extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
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
    gene: React.PropTypes.shape({
        localId: React.PropTypes.string,
        geneSymbolId: React.PropTypes.string,
        finalizedLocusName: React.PropTypes.string,
        finalizedGeneSymbol: React.PropTypes.string,
        finalizedFullName: React.PropTypes.string,
    }).isRequired,
};

SingleGeneReadOnly.defaultProps = {
    gene: {},
};


export default SingleGeneReadOnly;
