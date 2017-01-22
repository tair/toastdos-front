"use strict";

import React from 'react';
import CustomTextInput from "lib/components/customTextInput";

const containerStyle = {
    padding: "5px"
};

const inputContainerStyle = {
    display: "inline-block",
    padding: "10px"
};

const headingStyle = {
    margin: 0,
    marginBottom: "5px"
};

const fieldHeadingStyle = {
    margin: 0,
    marginBottom: "5px"
};


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
            />);

        const fullNameInput = (
            <CustomTextInput
                value={this.props.fullNameValue}
                onChange={this.props.onFullNameChange}
                inputRef={ref => (this.fullNameField = ref)}
                onKeyDown={this.props.onKeyDown}
                onBlur={this.handleFieldBlur}
                disabled={this.props.validating}
            />
        );


        return (
            <div style={containerStyle}>
                <h4 style={headingStyle}>
                    {this.props.title}
                </h4>
                <div style={inputContainerStyle}>
                    <h5 style={fieldHeadingStyle}>
                        Locus Name
                    </h5>
                    {this.props.finalized ? 
                        (
                            <span>{this.props.locusNameValue}</span>
                        ) 
                    : locusNameInput}
                </div>
                <div style={inputContainerStyle}>
                    <h5 style={fieldHeadingStyle}>
                        Gene Symbol
                    </h5>
                    {this.props.finalized ? 
                        (
                            <span>{this.props.geneSymbolValue}</span>
                        ) 
                    : geneSymbolInput}
                </div>
                <div style={inputContainerStyle}>
                    <h5 style={fieldHeadingStyle}>
                        Full Gene Name
                    </h5>
                    {this.props.finalized ? 
                        (
                            <span>{this.props.fullNameValue}</span>
                        ) 
                    : fullNameInput}
                </div>
                {this.props.finalized ?
                (<div style={inputContainerStyle}>
                    <span
                        className="fa fa-pencil"
                        style={{
                            fontSize: "1.3em",
                            cursor: "pointer"
                        }}
                        onClick={this.props.onEditClick}
                    >
                   </span> 
                </div>) : null}
                <div>
                    <button onClick={this.props.onRemoveClick}>
                        Remove Gene
                    </button>
                    {this.props.validating ? (<span>Validating...</span>) : null}
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
    finalized: false
};


export default SingleGene;
