"use strict";

import React from 'react';
import { connect } from 'react-redux';
import GeneGeneAnnotation from 'ui/annotation/geneGene';
import {
    update,
    updateGene1,
    updateGene2,
} from 'domain/geneGeneAnnotation/actions';
import {
    geneGeneAnnotationSelector,
    geneGeneAnnotationValidSelector
} from 'domain/geneGeneAnnotation/selectors';

const ConnectedGeneGeneAnnotation = connect(
    (state, ownProps) => ({
        geneGeneAnnotation: geneGeneAnnotationSelector(state, ownProps.localId),
        isValid: geneGeneAnnotationValidSelector(state, ownProps.localId),
    }),
    (dispatch, ownProps) => ({
        onDataChange: (data) => dispatch(update(ownProps.localId, data)),
        updateGene1: (gene1LocalId) => dispatch(updateGene1(ownProps.localId, gene1LocalId)),
        updateGene2: (gene2LocalId) => dispatch(updateGene2(ownProps.localId, gene2LocalId)),
    })
)(GeneGeneAnnotation);

ConnectedGeneGeneAnnotation.propTypes = {
    localId: React.PropTypes.string,
};

export default ConnectedGeneGeneAnnotation;
