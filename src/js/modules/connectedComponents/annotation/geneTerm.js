"use strict";

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GeneTermAnnotation from 'ui/annotation/geneTerm';
import { annotationStatusFormats } from 'domain/annotation/constants';
import {
    update,
    addEvidenceWith,
    clearEvidenceWith,
    removeEvidenceWith,
    updateEvidenceWithRelation,
} from 'domain/geneTermAnnotation/actions';
import {
    geneTermAnnotationSelector,
    needsEvidenceWithSelector,
    evidenceWithRelationSelector,
    allEvidenceWithValidSelector,
    keywordValidSelector,
    methodValidSelector,
    keywordValidIdSelector,
    methodValidIdSelector,
} from 'domain/geneTermAnnotation/selectors';

const ConnectedGeneTermAnnotation = connect(
    (state, ownProps) => ({
        geneTermAnnotation: geneTermAnnotationSelector(state, ownProps.localId),
        needsEvidenceWith: needsEvidenceWithSelector(state, ownProps.localId),
        evidenceWithRelation: evidenceWithRelationSelector(state, ownProps.localId),
        keywordValid: ownProps.curating &&
            ownProps.annotationStatus == annotationStatusFormats.ACCEPTED ?
            keywordValidIdSelector(state, ownProps.localId) :
            keywordValidSelector(state, ownProps.localId) ,
        methodValid: ownProps.curating &&
            ownProps.annotationStatus == annotationStatusFormats.ACCEPTED ?
            methodValidIdSelector(state, ownProps.localId) :
            methodValidSelector(state, ownProps.localId),
        ewValid: allEvidenceWithValidSelector(state, ownProps.localId),
    }),
    (dispatch, ownProps) => ({
        onDataChange: (data) => dispatch(update(ownProps.localId, data)),
        onEvidenceWithAddClick: () => dispatch(addEvidenceWith(ownProps.localId)),
        clearEvidenceWith: (evidenceWithId) => dispatch(
            clearEvidenceWith(ownProps.localId, evidenceWithId)
        ),
        removeEvidenceWith: (evidenceWithId) => dispatch(
            removeEvidenceWith(ownProps.localId, evidenceWithId)
        ),
        updateEvidenceWithRelation: (relation) => dispatch(
            updateEvidenceWithRelation(ownProps.localId, relation)
        ),
    })
)(GeneTermAnnotation);

ConnectedGeneTermAnnotation.propTypes = {
    localId: PropTypes.string,
    curating: PropTypes.bool,
};

export default ConnectedGeneTermAnnotation;
