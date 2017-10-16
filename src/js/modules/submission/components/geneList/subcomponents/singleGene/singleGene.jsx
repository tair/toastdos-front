"use strict";

import React from 'react';
import CustomTextInput from "lib/components/customTextInput";
import { Button, ButtonGroup, Col, Row } from 'reactstrap';


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
                placeholder="e.g. CURLY LEAF"
            />
        );


        return (
            <div className="single-gene">
                <h4>
                    {this.props.title}
                </h4>
                <Row className="input-group">
                    <Col className="input-container">
                        <h5>
                            Locus Name
                        </h5>
                        {this.props.finalized ? 
                            (
                                <span>
                                    {this.props.locusNameValue ?
                                        this.props.locusNameValue : (<em className="light-text">None</em>)}
                                </span>
                            ) 
                        : locusNameInput}
                    </Col>
                    <Col className="input-container">
                        <h5>
                            Gene Symbol
                        </h5>
                        {this.props.finalized ? 
                            (
                                <span>
                                    {this.props.geneSymbolValue ?
                                        this.props.geneSymbolValue : (<em className="light-text">None</em>)}
                                </span>
                            ) 
                        : geneSymbolInput}
                    </Col>
                    <Col className="input-container">
                        <h5>
                            Full Gene Name
                        </h5>
                        {this.props.finalized ? 
                            (
                                <span>
                                    {this.props.fullNameValue ?
                                        this.props.fullNameValue : (<em className="light-text">None</em>)}
                                </span>
                            ) 
                        : fullNameInput}
                    </Col>
                    <ButtonGroup>
                        {this.props.finalized ?
                        (<Button color="warning" size="sm"
                            className="edit-button-container">
                            <span
                                className="fa fa-pencil"
                                style={{
                                    fontSize: "1.3em",
                                    cursor: "pointer"
                                }}
                                onClick={this.props.onEditClick}
                            >
                        </span>
                        </Button>) : null}
                        <Button color="danger" size="sm"
                            onClick={this.props.onRemoveClick}
                        >
                            <span className="fa fa-close" title="Remove Gene"></span>
                        </Button>
                    </ButtonGroup>
                </Row>
                <div>
                    {this.props.validating ? (<span>Validating...</span>) : null}
                    {this.props.validationError ? 
                        (<span>{this.props.validationError}</span>) : null}
                </div>
            </div>
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
