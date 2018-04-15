"use strict";

import React from 'react';
import PropTypes from 'prop-types';
import SingleGene from 'ui/gene/singleGene';
import { validationStates } from 'lib/validation';

class SingleGeneContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            locusNameValue: this.props.locusName,
            geneSymbolValue: this.props.geneSymbol,
            fullNameValue: this.props.fullName
        };

        this.handleGeneSymbolChange = this.handleGeneSymbolChange.bind(this);
        this.handleFullNameChange = this.handleFullNameChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            locusNameValue: nextProps.locusName,
            geneSymbolValue: nextProps.geneSymbol,
            fullNameValue: nextProps.fullName
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
        this.props.updateGeneData({
            finalizedGeneSymbol: event.target.value
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
        this.props.updateGeneData({
            finalizedFullName: event.target.value
        });
    }

    render() {
        return React.createElement(SingleGene,{
            locusNameValue: this.state.locusNameValue,
            geneSymbolValue: this.state.geneSymbolValue,
            fullNameValue: this.state.fullNameValue,
            onGeneSymbolChange: this.handleGeneSymbolChange,
            onFullNameChange: this.handleFullNameChange,
            validateGeneData: this.props.validateGeneData,
            onRemoveClick: this.props.onRemoveClick,
            title: this.props.title,
            validationError: this.props.validationError,
            validationState: this.props.validationState,
            reviewValidated: this.props.reviewValidated,
        });
    }
}

SingleGeneContainer.propTypes = {
    title: PropTypes.string,
    locusName: PropTypes.string,
    geneSymbol: PropTypes.string,
    fullName: PropTypes.string,
    onRemoveClick: PropTypes.func,
    validateGeneData: PropTypes.func,
    updateGeneData: PropTypes.func,
    validationError: PropTypes.string,
    validationState: PropTypes.string,
    reviewValidated: PropTypes.number,
};

SingleGeneContainer.defaultProps = {
    title: "",
    locusName: "",
    geneSymbol: "",
    fullName: "",
    onRemoveClick: () => {},
    validateGeneData: () => {},
    updateGeneData: () => {},
    validationError: "",
    validationState: validationStates.NOT_VALIDATED,
    reviewValidated: 0,
};

export default SingleGeneContainer;
