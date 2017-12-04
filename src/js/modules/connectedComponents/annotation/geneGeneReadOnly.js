"use strict";

import React from 'react';
import { connect } from 'react-redux';
import GeneGeneAnnotationReadOnly from 'ui/annotation/geneGeneReadOnly';
import { geneGeneAnnotationSelector } from 'domain/geneGeneAnnotation/selectors';

const ConnectedGeneGeneAnnotationReadOnly = connect(
    (state, ownProps) => ({
        geneGeneAnnotation: geneGeneAnnotationSelector(state, ownProps.localId),
    }),
    dispatch => ({})
)(GeneGeneAnnotationReadOnly);

ConnectedGeneGeneAnnotationReadOnly.propTypes = {
    localId: React.PropTypes.string,
};

export default ConnectedGeneGeneAnnotationReadOnly;
