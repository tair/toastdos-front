"use strict";

import React from 'react';
import CustomTextInput from "lib/components/customTextInput";

// const containerStyle = {
//     padding: "5px"
// };

// const inputContainerStyle = {
//     display: "inline-block",
//     padding: "10px"
// };

// const headingStyle = {
//     margin: 0,
//     marginBottom: "5px"
// };

// const fieldHeadingStyle = {
//     margin: 0,
//     marginBottom: "5px"
// };


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
                <div className="input-group">
                    <div className="input-container">
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
                    </div>
                    <div className="input-container">
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
                    </div>
                    <div className="input-container">
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
                    </div>
                    {this.props.finalized ?
                    (<div className="edit-button-container">
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
                </div>
                <div>
                    <button
                        className="btn btn-secondary"
                        onClick={this.props.onRemoveClick}
                    >
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
