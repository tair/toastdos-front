"use strict";

import React from 'react';
import SingleGene from './singleGene';

class SingleGeneContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            locusNameValue: this.props.locusName,
            geneSymbolValue: this.props.geneSymbol,
            fullNameValue: this.props.fullName
        };
        
        this.attemptToFinalize = this.attemptToFinalize.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleLocusNameChange = this.handleLocusNameChange.bind(this);
        this.handleGeneSymbolChange = this.handleGeneSymbolChange.bind(this);
        this.handleFullNameChange = this.handleFullNameChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.finalized) {
            this.setState({
                locusNameValue: nextProps.locusName,
                geneSymbolValue: nextProps.geneSymbol,
                fullNameValue: nextProps.fullName
            });
        }
    }

    /**
     * Event handler for changing the value of the LocusName field
     * @param  {Event} event - the onChange event
     */
    handleLocusNameChange(event) {
        this.setState({
            locusNameValue: event.target.value
        });
    }

    /**
     * Event handler for changing the value of the GeneSymbol
     * @param  {Evemt} event - the onChange event
     */
    handleGeneSymbolChange(event) {
        this.setState({
            geneSymbolValue: event.target.value
        });
    }

    /**
     * Event handler for changing the value of the FullName
     * @param  {Event} event - the onChange event
     */
    handleFullNameChange(event) {
        this.setState({
            fullNameValue: event.target.value
        });
    }

    attemptToFinalize() {
        // local validation
        // submit to backend
        if(this.state.locusNameValue) {
            this.props.validateGeneData({
                locusName: this.state.locusNameValue,
                geneSymbol: this.state.geneSymbolValue,
                fullName: this.state.fullNameValue 
            });
        }
    }

    handleKeyPress(event) {
        if(event.keyCode === 13) {
            this.attemptToFinalize();
        }
    }

    render() {
        return React.createElement(SingleGene,{
            locusNameValue: this.state.locusNameValue,
            geneSymbolValue: this.state.geneSymbolValue,
            fullNameValue: this.state.fullNameValue,
            onLocusNameChange: this.handleLocusNameChange,
            onGeneSymbolChange: this.handleGeneSymbolChange,
            onFullNameChange: this.handleFullNameChange,
            onBlur: this.attemptToFinalize,
            onKeyDown: this.handleKeyPress,
            onRemoveClick: this.props.onRemoveClick,
            onEditClick: this.props.onEditClick,
            title: this.props.title,
            validating: this.props.validating,
            finalized: this.props.finalized
        });
    }
}

SingleGeneContainer.propTypes = {
    title: React.PropTypes.string,
    locusName: React.PropTypes.string,
    geneSymbol: React.PropTypes.string,
    fullName: React.PropTypes.string,
    onRemoveClick: React.PropTypes.func,
    onEditClick: React.PropTypes.func,
    validateGeneData: React.PropTypes.func,
    validating: React.PropTypes.bool,
    finalized: React.PropTypes.bool
};

SingleGeneContainer.defaultProps = {
    title: "",
    locusName: "",
    geneSymbol: "",
    fullName: "",
    onRemoveClick: () => {},
    onEditClick: () => {},
    validateGeneData: () => {},
    validating: false,
    finalized: false
};

export default SingleGeneContainer;
