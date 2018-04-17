"use strict";

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AnnotationEntryReadOnly from 'ui/annotation/entryReadOnly';
import { annotationSelector } from 'domain/annotation/selectors';

const ConnectedAnnotationEntryReadOnly = connect(
    (state, ownProps) => ({
        annotation: annotationSelector(state, ownProps.localId),
    }),
    () => ({})
)(AnnotationEntryReadOnly);

ConnectedAnnotationEntryReadOnly.propTypes = {
    localId: PropTypes.string,
};

export default ConnectedAnnotationEntryReadOnly;
