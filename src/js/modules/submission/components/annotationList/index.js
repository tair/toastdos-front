"use strict";

import { connect } from 'react-redux';

import generateId from 'lib/idGenerator';
import AnnotationList from './annotationList';
import {
        addNewAnnotation,
        changeAnnotationType,
        removeAnnotation
    } from '../../actions';

const ConnectedAnnotationList = connect(
    state => ({
        annotationIndex: state.submission.annotationIndex,
        annotationOrder: state.submission.annotationOrder
    }),
    dispatch => ({
        onAnnotationAddClick: () => dispatch(addNewAnnotation(generateId())),
        handleAnnotationTypeChange: (localId, annotationType) => dispatch(changeAnnotationType(localId, annotationType)),
        removeAnnotation: localId => dispatch(removeAnnotation(localId))
    })
)(AnnotationList);

export default ConnectedAnnotationList;
