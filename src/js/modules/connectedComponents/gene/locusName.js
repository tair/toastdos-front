"use strict";

import React from 'react';
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
    dipatch => ({})
)((GeneLocusName));

ConnectedGeneLocusName.propTypes = {
    localId: React.PropTypes.string,
};

export default ConnectedGeneLocusName;
