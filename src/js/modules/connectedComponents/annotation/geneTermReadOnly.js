"use strict";

import PropTypes from 'prop-types';
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
    ()  => ({})
)(GeneTermAnnotationReadOnly);

ConnectedGeneTermAnnotationReadOnly.propTypes = {
    localId: PropTypes.string,
};

export default ConnectedGeneTermAnnotationReadOnly;
