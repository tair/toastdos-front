"use strict";

import React from 'react';
import { connect } from 'react-redux';
import GeneTermAnnotation from 'ui/annotation/geneTerm';
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
        keywordValid: ownProps.curating ?
            keywordValidIdSelector(state, ownProps.localId) :
            keywordValidSelector(state, ownProps.localId) ,
        methodValid: ownProps.curating ?
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
    localId: React.PropTypes.string,
    curating: React.PropTypes.bool,
};

export default ConnectedGeneTermAnnotation;
