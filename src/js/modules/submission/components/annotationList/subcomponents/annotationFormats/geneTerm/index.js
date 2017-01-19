"use strict";

import { connect } from 'react-redux';

import GeneTerm from './geneTerm';

const ConnectedGeneTerm = connect(
    state => ({
        geneIndex: state.submission.geneIndex,
        geneOrder: state.submission.geneOrder
    })
)(GeneTerm);

export default ConnectedGeneTerm;
