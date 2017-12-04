"use strict";

import React from 'react';
import { connect } from 'react-redux';
import AnnotationEntry from 'ui/annotation/entry';
import { annotationSelector } from 'domain/annotation/selectors';
import {
    changeAnnotationType,
    addEvidenceWith,
    removeEvidenceWith,
} from 'domain/annotation/actions';

const ConnectedAnnotationEntry = connect(
    (state, ownProps) => ({
        annotation: annotationSelector(state, ownProps.localId),
    }),
    (dispatch, ownProps) => ({
        onAnnotationAddClick: () => dispatch(addAnnotation()),
        onTypeChange: (annotationType) => dispatch(
            changeAnnotationType(ownProps.localId, annotationType)
        ),
        removeAnnotation: localId => dispatch(removeAnnotation(localId)),
    })
)(AnnotationEntry);

ConnectedAnnotationEntry.propTypes = {
    localId: React.PropTypes.string,
};

export default ConnectedAnnotationEntry;
