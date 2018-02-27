"use strict";

import React from 'react';
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
    localId: React.PropTypes.string,
};

export default ConnectedAnnotationEntryReadOnly;
