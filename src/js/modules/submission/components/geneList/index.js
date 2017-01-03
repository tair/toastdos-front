"use strict";

import { connect } from 'react-redux';

import GeneList from './geneList';
import { addNewGene, removeGene } from '../../actions';
import generateId from "lib/idGenerator";

const ConnectedGeneList = connect(
    state => ({
        geneIndex: state.submission.geneIndex,
        geneOrder: state.submission.geneOrder
    }),
    dispatch => ({
        onGeneAddClick: () => dispatch(addNewGene(generateId())),
        removeGene: i => dispatch(removeGene(i))
    })
)(GeneList);

export default ConnectedGeneList;
