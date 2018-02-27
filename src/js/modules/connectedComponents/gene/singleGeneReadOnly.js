"use strict";

import React from 'react';
import { connect } from 'react-redux';
import SingleGeneReadOnly from 'ui/gene/singleGeneReadOnly';
import { geneSelector } from 'domain/gene/selectors';

const ConnectedSingleGeneReadOnly = connect(
    (state, ownProps) => ({
        gene: geneSelector(state, ownProps.localId),
    }),
    () => ({})
)(SingleGeneReadOnly);

ConnectedSingleGeneReadOnly.propTypes = {
    localId: React.PropTypes.string,
};

export default ConnectedSingleGeneReadOnly;
