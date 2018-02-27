"use strict";

import React from 'react';
import { connect } from 'react-redux';
import AnnotationList from 'ui/annotation/list';
import {
    changeAnnotationType,
    updateAnnotationData,
    addEvidenceWith,
} from 'domain/annotation/actions';

const ConnectedAnnotationList = connect(
    () => ({}),
    (dispatch, ownProps) => ({
        onAnnotationAddClick: () => ownProps.addAnnotation(),
        removeAnnotation: localId => ownProps.removeAnnotation(localId),
        handleAnnotationTypeChange: (localId, annotationType) => dispatch(changeAnnotationType(localId, annotationType)),
        updateAnnotationData: (localId, data) => dispatch(updateAnnotationData(localId, data)),
        addEvidenceWith: annotationId => dispatch(addEvidenceWith(annotationId)),
    })
)(AnnotationList);

ConnectedAnnotationList.propTypes = {
    addAnnotation: React.PropTypes.func,
    removeAnnotation: React.PropTypes.func,
    curating: React.PropTypes.bool,
};

ConnectedAnnotationList.defaultProps = {
    addAnnotation: () => {},
    removeAnnotation: () => {},
    curating: false,
};

export default ConnectedAnnotationList;
