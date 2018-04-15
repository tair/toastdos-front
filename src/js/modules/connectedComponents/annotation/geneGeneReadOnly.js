"use strict";

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GeneGeneAnnotationReadOnly from 'ui/annotation/geneGeneReadOnly';
import { geneGeneAnnotationSelector } from 'domain/geneGeneAnnotation/selectors';

const ConnectedGeneGeneAnnotationReadOnly = connect(
    (state, ownProps) => ({
        geneGeneAnnotation: geneGeneAnnotationSelector(state, ownProps.localId),
    }),
    () => ({})
)(GeneGeneAnnotationReadOnly);

ConnectedGeneGeneAnnotationReadOnly.propTypes = {
    localId: PropTypes.string,
};

export default ConnectedGeneGeneAnnotationReadOnly;
