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
            <Row>
                <Col>
                    <Label>
                        Gene 1
                        <GenePicker
                            onChange={value => this.props.onDataChange(
                                Object.assign({}, this.props.annotationData.data, {
                                    gene1LocalId: value
                                })
                            )}
                            value={this.props.annotationData.data.gene1LocalId}
                        />
                    </Label>
                </Col>
                <Col>
                    <Label>
                        Gene 2
                        <GenePicker
                            onChange={value => this.props.onDataChange(
                                Object.assign({}, this.props.annotationData.data, {
                                    gene2LocalId: value
                                })
                            )}
                            value={this.props.annotationData.data.gene2LocalId}
                        />
                    </Label>
                </Col>
                <Col>
                    <Label>
                        Method
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
                    </Label>
                </Col>
            </Row>
        );
    }
}

GeneGene.propTypes = {
    annotationData: React.PropTypes.object,
    onDataChange: React.PropTypes.func
};

export default GeneGene;
