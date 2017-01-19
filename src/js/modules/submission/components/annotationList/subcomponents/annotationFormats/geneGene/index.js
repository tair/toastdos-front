"use strict";

import { connect } from 'react-redux';

import GeneGene from './geneGene';

const ConnectedGeneGene = connect(
    state => ({
        geneIndex: state.submission.geneIndex,
        geneOrder: state.submission.geneOrder
    })
)(GeneGene);

export default ConnectedGeneGene;
