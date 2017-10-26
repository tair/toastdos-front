"use strict";

import React from 'react';
import { Label, Button, Row, Col } from 'reactstrap';

import GenePicker from '../genePicker';
import KeywordTextInput from '../../../keywordTextInput';

const inputContainerStyle = {
    display: "inline-block",
    padding: "10px"
};

class GeneGene extends React.Component {
    constructor(props) {
        super(props);
    
    }


    render() {
        return (
            <div>
                <Row className="align-items-end">
                    <Col xs="3" className="text-right d-table-cell">
                        <Label className="align-center">
                            Gene 1
                        </Label>
                    </Col>
                    <Col>
                        <GenePicker
                            onChange={value => this.props.onDataChange(
                                Object.assign({}, this.props.annotationData.data, {
                                    gene1LocalId: value
                                })
                            )}
                            value={this.props.annotationData.data.gene1LocalId}
                        />
                    </Col>
                </Row>
                <Row className="align-items-end mt-3">
                    <Col xs="3" className="text-right d-table-cell">
                        <Label className="align-center">
                            Gene 2
                        </Label>
                    </Col>
                    <Col>
                        <GenePicker
                            onChange={value => this.props.onDataChange(
                                Object.assign({}, this.props.annotationData.data, {
                                    gene2LocalId: value
                                })
                            )}
                            value={this.props.annotationData.data.gene2LocalId}
                        />
                    </Col>
                </Row>
                <Row className="align-items-end mt-3">
                    <Col xs="3" className="text-right d-table-cell">
                        <Label className="align-center">
                            Method
                        </Label>
                    </Col>
                    <Col>
                        <KeywordTextInput
                            onChange={value => this.props.onDataChange(
                                Object.assign({}, this.props.annotationData.data, {
                                    methodName: value,
                                    methodId: null,
                                    methodEvidenceCode: null,
                                })
                            )}
                            onSelect={(id, value) => this.props.onDataChange(
                                Object.assign({}, this.props.annotationData.data, {
                                    methodName: value.name,
                                    methodId: id,
                                    methodEvidenceCode: null,
                                })
                            )}
                            placeholder="e.g. Enzyme Assay"
                            value={this.props.annotationData.data.methodName}
                            searchScope="eco"
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

GeneGene.propTypes = {
    annotationData: React.PropTypes.object,
    onDataChange: React.PropTypes.func
};

export default GeneGene;
