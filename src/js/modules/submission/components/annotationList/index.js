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
        AttemptValidateEvidenceWithAsync,
        removeEvidenceWith,
    } from '../../actions';

import {
        hasValidGene,
        hasAllValidGenes,
    } from '../../selectors';

const ConnectedAnnotationList = connect(
    state => ({
        annotationIndex: state.submission.annotationIndex,
        annotationOrder: state.submission.annotationOrder,
        hasValidGene: hasValidGene(state),
        hasAllValidGenes: hasAllValidGenes(state),
    }),
    dispatch => ({
        onAnnotationAddClick: () => dispatch(addNewAnnotation(generateId())),
        handleAnnotationTypeChange: (localId, annotationType) => dispatch(changeAnnotationType(localId, annotationType)),
        removeAnnotation: localId => dispatch(removeAnnotation(localId)),
        updateAnnotationData: (localId, data) => dispatch(updateAnnotationData(localId, data)),
        addEvidenceWith: annotationId => dispatch(addEvidenceWith(annotationId, generateId())),
        validateEvidenceWith: (annotationId, evidenceWithId, locusName) => dispatch(new AttemptValidateEvidenceWithAsync(annotationId, evidenceWithId, locusName)),
        removeEvidenceWith: (annotationId, evidenceWithId) => dispatch(removeEvidenceWith(annotationId, evidenceWithId)),
    })
)(AnnotationList);

export default ConnectedAnnotationList;
