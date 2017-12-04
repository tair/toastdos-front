"use strict";

import React from 'react';
import { connect } from 'react-redux';
import GeneTermAnnotation from 'ui/annotation/geneTerm';
import {
    update,
    addEvidenceWith,
    clearEvidenceWith,
    removeEvidenceWith,
} from 'domain/geneTermAnnotation/actions';
import {
    geneTermAnnotationSelector,
    needsEvidenceWithSelector,
} from 'domain/geneTermAnnotation/selectors';

const ConnectedGeneTermAnnotation = connect(
    (state, ownProps) => ({
        geneTermAnnotation: geneTermAnnotationSelector(state, ownProps.localId),
        needsEvidenceWith: needsEvidenceWithSelector(state, ownProps.localId),
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
    })
)(GeneTermAnnotation);

ConnectedGeneTermAnnotation.propTypes = {
    localId: React.PropTypes.string,
};

export default ConnectedGeneTermAnnotation;
