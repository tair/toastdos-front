"use strict";

import React from 'react';
import CustomTextInput from "lib/components/customTextInput";
import { Card, CardHeader, CardBody,
    Label, FormGroup,
    Button, ButtonGroup, Col, Row } from 'reactstrap';


class SingleGene extends React.Component {
    constructor(props) {
        super(props);

        this.handleFieldBlur = this.handleFieldBlur.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if(!this.props.finalized && prevProps.finalized) {
            this.locusNameField.focus();
        }   
    }

    handleFieldBlur() {
        // add small delay to ensure focus triggered for next field
        setTimeout(() => {
            if(this.locusNameField === document.activeElement) {
                return;
            }

            if(this.geneSymbolField === document.activeElement) {
                return;
            }

            if(this.fullNameField === document.activeElement) {
                return;
            }

            this.props.onBlur();
        }, 100);
    }

    render() {

        const locusNameInput = (
            <CustomTextInput
                value={this.props.locusNameValue}
                onChange={this.props.onLocusNameChange}
                inputRef={ref => (this.locusNameField = ref)}
                onKeyDown={this.props.onKeyDown}
                onBlur={this.handleFieldBlur}
                disabled={this.props.validating}
                readOnly={this.props.finalized ? "readonly" : ""}
                placeholder="e.g. AT2G23380"
            />);

        const geneSymbolInput = (
            <CustomTextInput
                value={this.props.geneSymbolValue}
                onChange={this.props.onGeneSymbolChange}
                inputRef={ref => (this.geneSymbolField = ref)}
                onKeyDown={this.props.onKeyDown}
                onBlur={this.handleFieldBlur}
                disabled={this.props.validating}
                readOnly={this.props.finalized ? "readonly" : ""}
                placeholder="e.g. CLF"
            />);

        const fullNameInput = (
            <CustomTextInput
                value={this.props.fullNameValue}
                onChange={this.props.onFullNameChange}
                inputRef={ref => (this.fullNameField = ref)}
                onKeyDown={this.props.onKeyDown}
                onBlur={this.handleFieldBlur}
                disabled={this.props.validating}
                readOnly={this.props.finalized ? "readonly" : ""}
                placeholder="e.g. CURLY LEAF"
            />
        );


        return (
            <Card className="single-gene">
                <CardHeader>
                    <Row>
                        <Col>
                        {this.props.title}
                        </Col>
                        <Col className="text-right input-container">
                            <ButtonGroup>
                                {this.props.finalized ?
                                (<Button color="warning" size="sm"
                                    className="edit-button-container"
                                    onClick={this.props.onEditClick}
                                    >
                                    <span className="fa fa-pencil"
                                        style={{
                                            fontSize: "1.3em",
                                            cursor: "pointer"
                                        }}
                                    >
                                    </span>
                                </Button>) : null}
                                <Button color="danger" size="sm"
                                    onClick={this.props.onRemoveClick}
                                >
                                    <span className="fa fa-close" title="Remove Gene"></span>
                                </Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody className={this.props.finalized ? "bg-light": null}>
                    <Row>
                        <Col>
                            <Label>
                                Locus Name
                                {locusNameInput}
                            </Label>
                        </Col>
                        <Col>
                            <Label>
                                Gene Symbol
                                {geneSymbolInput}
                            </Label>
                        </Col>
                        <Col>
                            <Label>
                                Full Gene Name
                                {fullNameInput}
                            </Label>
                        </Col>
                    </Row>
                    <div>
                        {this.props.validating ? (<span>Validating...</span>) : null}
                        {this.props.validationError ?
                            (<span>{this.props.validationError}</span>) : null}
                    </div>
                </CardBody>
            </Card>
        );
    }
}

SingleGene.propTypes = {
    locusNameValue: React.PropTypes.string,
    geneSymbolValue: React.PropTypes.string,
    fullNameValue: React.PropTypes.string,
    onLocusNameChange: React.PropTypes.func,
    onGeneSymbolChange: React.PropTypes.func,
    onFullNameChange: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    onRemoveClick: React.PropTypes.func,
    onEditClick: React.PropTypes.func,
    title: React.PropTypes.string,
    validating: React.PropTypes.bool,
    validationError: React.PropTypes.string,
    finalized: React.PropTypes.bool
};

SingleGene.defaultProps = {
    locusNameValue: "",
    geneSymbolValue: "",
    fullNameValue: "",
    onLocusNameChange: () => {},
    onGeneSymbolChange: () => {},
    onFullNameChange: () => {},
    onBlur: () => {},
    onKeyDown: () => {},
    onRemoveClick: () => {},
    onEditClick: () => {},
    title: "",
    validating: false,
    validationError: "",
    finalized: false
};


export default SingleGene;
