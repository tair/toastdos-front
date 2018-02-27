"use strict";

import React from 'react';
import { connect } from 'react-redux';
import AnnotationListReadOnly from 'ui/annotation/listCurationReadOnly';
import { pendingListSelector, reviewedListSelector } from 'domain/annotation/selectors';

const ConnectedCurationAnnotationListReadOnly = connect(
    (state, ownProps) => ({
        pendingAnnotations: pendingListSelector(state, ownProps.annotationOrder),
        reviewedAnnotations: reviewedListSelector(state, ownProps.annotationOrder),
    }),
    () => ({})
)(AnnotationListReadOnly);

ConnectedCurationAnnotationListReadOnly.propTypes = {
    annotationOrder: React.PropTypes.arrayOf(React.PropTypes.string),
};

ConnectedCurationAnnotationListReadOnly.defaultProps = {
    annotationOrder: [],
};

export default ConnectedCurationAnnotationListReadOnly;
