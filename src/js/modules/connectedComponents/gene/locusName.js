"use strict";

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class GeneLocusName extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <span>{this.props.geneLocusName}</span>;
    }
}

const ConnectedGeneLocusName = connect(
    (state,ownProps) => ({
        geneLocusName: state.domain.gene.byLocalId[ownProps.localId].finalizedLocusName,
    }),
    () => ({})
)((GeneLocusName));

ConnectedGeneLocusName.propTypes = {
    localId: PropTypes.string,
};

export default ConnectedGeneLocusName;
