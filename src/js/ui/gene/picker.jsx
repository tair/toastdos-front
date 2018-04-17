"use strict";

import React from 'react';
import PropTypes from 'prop-types';
import CustomSelect from 'lib/components/customSelect';

class GenePicker extends React.Component {
    constructor(props) {
        super(props);

        this.generateGeneOption = this.generateGeneOption.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.setDefaultGene = this.setDefaultGene.bind(this);
        if (this.props.value == '') {
            this.setDefaultGene();
        }
    }

    generateGeneOption(currGene) {
        return (
            <option
                value={currGene.localId}
                key={`gene_choice_${currGene.localId}`}
            >
                {currGene.finalizedLocusName}
            </option>
        );
    }

    handleChange(event) {
        this.props.onChange(event.target.value);
    }

    setDefaultGene() {
        if (this.props.genes.length > 0) {
            this.props.onChange(this.props.genes[0].localId);
        }
    }

    componentDidUpdate(prevProps) {
        // Set the default gene again if the type changes
        // or if the gene is no longer in the gene list
        if ( prevProps.typeLocalId != this.props.typeLocalId
            || undefined === this.props.genes.find(
                val => val.localId == this.props.value
            )
        ) {
            this.setDefaultGene();
        }
    }

    render() {
        return (
            <CustomSelect
                onChange={this.handleChange}
                value={this.props.value}
            >
                { this.props.genes.map(this.generateGeneOption) }
            </CustomSelect>
        );
    }
}

GenePicker.propTypes = {
    genes: PropTypes.array,
    typeLocalId: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};

GenePicker.defaultProps = {
    typeLocalId: '',
    onChange: () => {},
    value: ""
};

export default GenePicker;
