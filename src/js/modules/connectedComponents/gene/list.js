"use strict";

import React from 'react';
import { connect } from 'react-redux';
import GeneList from 'ui/gene/list';
import {
    attemptValidateGene,
    updateGeneData,
    clearGene,
} from 'domain/gene/actions';

const ConnectedGeneList = connect(
    (state) => ({
        // TODO: refactor geneList to select the genes it needs
        geneIndex: state.domain.gene.byLocalId
    }),
    (dispatch, ownProps) => ({
        onGeneAddClick: () => ownProps.addGene(),
        removeGene: geneLocalId => ownProps.removeGene(geneLocalId),
        validateGeneData: (localId, geneData) => dispatch(
            attemptValidateGene(localId, geneData,
                ownProps.geneOrder, ownProps.annotationOrder, ownProps.addAnnotation)
        ),
        updateGeneData: (localId, geneData) => dispatch(updateGeneData(localId, geneData)),
        clearGene: (geneId) => dispatch(clearGene(geneId))
    })
)(GeneList);

ConnectedGeneList.propTypes = {
    addGene: React.PropTypes.func,
    removeGene: React.PropTypes.func,
    geneOrder: React.PropTypes.array,
    annotationOrder: React.PropTypes.array,
    addAnnotation: React.PropTypes.func,
    curating: React.PropTypes.bool,
};

ConnectedGeneList.defaultProps = {
    addGene: () => {},
    removeGene: () => {},
    geneOrder: [],
    annotationOrder: [],
    addAnnotation: () => {},
    curating: false,
};

export default ConnectedGeneList;
