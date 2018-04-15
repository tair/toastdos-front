"use strict";

import PropTypes from 'prop-types';
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
    annotationOrder: PropTypes.arrayOf(PropTypes.string),
};

ConnectedCurationAnnotationListReadOnly.defaultProps = {
    annotationOrder: [],
};

export default ConnectedCurationAnnotationListReadOnly;
