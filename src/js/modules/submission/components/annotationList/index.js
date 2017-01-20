"use strict";

import { connect } from 'react-redux';

import generateId from 'lib/idGenerator';
import AnnotationList from './annotationList';
import {
        addNewAnnotation,
        changeAnnotationType,
        removeAnnotation,
        updateAnnotationData
    } from '../../actions';

const ConnectedAnnotationList = connect(
    state => ({
        annotationIndex: state.submission.annotationIndex,
        annotationOrder: state.submission.annotationOrder
    }),
    dispatch => ({
        onAnnotationAddClick: () => dispatch(addNewAnnotation(generateId())),
        handleAnnotationTypeChange: (localId, annotationType) => dispatch(changeAnnotationType(localId, annotationType)),
        removeAnnotation: localId => dispatch(removeAnnotation(localId)),
        updateAnnotationData: (localId, data) => dispatch(updateAnnotationData(localId, data))
    })
)(AnnotationList);

export default ConnectedAnnotationList;
