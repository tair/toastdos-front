"use strict";

import React from 'react';
import { connect } from 'react-redux';
import GeneTermAnnotationReadOnly from 'ui/annotation/geneTermReadOnly';
import {
    geneTermAnnotationSelector,
    needsEvidenceWithSelector,
} from 'domain/geneTermAnnotation/selectors';

const ConnectedGeneTermAnnotationReadOnly = connect(
    (state, ownProps) => ({
        geneTermAnnotation: geneTermAnnotationSelector(state, ownProps.localId),
        needsEvidenceWith: needsEvidenceWithSelector(state, ownProps.localId),
    }),
    dispatch  => ({})
)(GeneTermAnnotationReadOnly);

ConnectedGeneTermAnnotationReadOnly.propTypes = {
    localId: React.PropTypes.string,
};

export default ConnectedGeneTermAnnotationReadOnly;
