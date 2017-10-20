"use strict";

import { connect } from 'react-redux';

import generateId from 'lib/idGenerator';
import AnnotationList from './annotationList';
import {
        addNewAnnotation,
        changeAnnotationType,
        removeAnnotation,
        updateAnnotationData,
        addEvidenceWith,
        validateEvidenceWith,
        removeEvidenceWith
    } from '../../actions';

import {
        hasValidGenes
    } from '../../selectors';

const ConnectedAnnotationList = connect(
    state => ({
        annotationIndex: state.submission.annotationIndex,
        annotationOrder: state.submission.annotationOrder,
        hasGenes: hasValidGenes(state)
    }),
    dispatch => ({
        onAnnotationAddClick: () => dispatch(addNewAnnotation(generateId())),
        handleAnnotationTypeChange: (localId, annotationType) => dispatch(changeAnnotationType(localId, annotationType)),
        removeAnnotation: localId => dispatch(removeAnnotation(localId)),
        updateAnnotationData: (localId, data) => dispatch(updateAnnotationData(localId, data)),
        addEvidenceWith: annotationId => dispatch(addEvidenceWith(annotationId, generateId())),
        validateEvidenceWith: (annotationId, evidenceWithId) => dispatch(validateEvidenceWith(annotationId, evidenceWithId)),
        removeEvidenceWith: (annotationId, evidenceWithId) => dispatch(removeEvidenceWith(annotationId, evidenceWithId))
    })
)(AnnotationList);

export default ConnectedAnnotationList;
