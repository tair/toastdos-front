"use strict";

import { connect } from 'react-redux';

import GeneList from './geneList';
import {
        addNewGene,
        removeGene,
        AttemptValidateGeneAsync,
        updateGeneData
    } from '../../actions';
import generateId from "lib/idGenerator";

const ConnectedGeneList = connect(
    state => ({
        geneIndex: state.submission.geneIndex,
        geneOrder: state.submission.geneOrder
    }),
    dispatch => ({
        onGeneAddClick: () => dispatch(addNewGene(generateId())),
        removeGene: i => dispatch(removeGene(i)),
        validateGeneData: (localId, geneData) => dispatch(new AttemptValidateGeneAsync(localId, geneData)),
        updateGeneData: (localId, geneData) => dispatch(updateGeneData(localId, geneData)),
    })
)(GeneList);

export default ConnectedGeneList;
