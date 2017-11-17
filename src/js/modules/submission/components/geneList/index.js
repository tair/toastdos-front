"use strict";

import { connect } from 'react-redux';

import GeneList from './geneList';
import {
        addNewGene,
        removeGene,
        AttemptValidateGeneAsync,
        updateGeneData,
        clearGene,
    } from '../../actions';
import generateId from "lib/idGenerator";

const ConnectedGeneList = connect(
    state => ({
        curating: state.submission.curating,
        geneIndex: state.submission.geneIndex,
        geneOrder: state.submission.geneOrder
    }),
    dispatch => ({
        onGeneAddClick: () => dispatch(addNewGene(generateId())),
        removeGene: i => dispatch(removeGene(i)),
        validateGeneData: (localId, geneData) => dispatch(new AttemptValidateGeneAsync(localId, geneData)),
        updateGeneData: (localId, geneData) => dispatch(updateGeneData(localId, geneData)),
        clearGene: (geneId) => dispatch(clearGene(geneId))
    })
)(GeneList);

export default ConnectedGeneList;
