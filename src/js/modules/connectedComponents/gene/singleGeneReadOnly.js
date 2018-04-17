"use strict";

import PropTypes from 'prop-types';
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
    localId: PropTypes.string,
};

export default ConnectedSingleGeneReadOnly;
