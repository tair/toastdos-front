"use strict";

import PropTypes from 'prop-types';
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
    addGene: PropTypes.func,
    removeGene: PropTypes.func,
    geneOrder: PropTypes.array,
    annotationOrder: PropTypes.array,
    addAnnotation: PropTypes.func,
    curating: PropTypes.bool,
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
