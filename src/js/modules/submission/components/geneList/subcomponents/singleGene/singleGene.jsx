"use strict";

import React from 'react';

const containerStyle = {
    padding: "5px"
};

const inputContainerStyle = {
    display: "inline-block",
    padding: "10px"
};

const inputStyle = {

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
        return (
            <div style={containerStyle}>
                <h4 style={headingStyle}>
                    {this.props.title}
                </h4>
                <div style={inputContainerStyle}>
                    <h5 style={fieldHeadingStyle}>
                        Locus Name
                    </h5>
                    <input
                        style={inputStyle}
                        type="text"
                        value={this.props.locusNameValue}
                        onChange={this.props.onLocusNameChange}
                        ref={ref => (this.locusNameField = ref)}
                        onKeyDown={this.props.onKeyDown}
                        onBlur={this.handleFieldBlur}
                    />
                </div>
                <div style={inputContainerStyle}>
                    <h5 style={fieldHeadingStyle}>
                        Gene Symbol
                    </h5>
                    <input
                        style={inputStyle}
                        type="text"
                        value={this.props.geneSymbolValue}
                        onChange={this.props.onGeneSymbolChange}
                        ref={ref => (this.geneSymbolField = ref)}
                        onKeyDown={this.props.onKeyDown}
                        onBlur={this.handleFieldBlur}
                    />
                </div>
                <div style={inputContainerStyle}>
                    <h5 style={fieldHeadingStyle}>
                        Full Gene Name
                    </h5>
                    <input
                        style={inputStyle}
                        type="text"
                        value={this.props.fullNameValue}
                        onChange={this.props.onFullNameChange}
                        ref={ref => (this.fullNameField = ref)}
                        onKeyDown={this.props.onKeyDown}
                        onBlur={this.handleFieldBlur}
                    />
                </div>
                <div>
                    <button onClick={this.props.onRemoveClick}>
                        Remove Gene
                    </button>
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
    title: React.PropTypes.string
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
    title: ""

};


export default SingleGene;
