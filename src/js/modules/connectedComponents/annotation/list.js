"use strict";

import React from 'react';
import { connect } from 'react-redux';
import AnnotationList from 'ui/annotation/list';
import {
    annotationFormats,
    annotationTypes,
    annotationTypeData,
} from 'domain/annotation/constants';
import {
    changeAnnotationType,
    updateAnnotationData,
    addEvidenceWith,
} from 'domain/annotation/actions';

const ConnectedAnnotationList = connect(
    (state, ownProps) => ({
        curating: false, //state.submission.curating,
    }),
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
};

export default ConnectedAnnotationList;
