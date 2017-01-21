"use strict";

import { connect } from 'react-redux';

import GenePicker from './genePicker';

const ConnectedGenePicker = connect(
    state => ({
        geneIndex: state.submission.geneIndex,
        geneOrder: state.submission.geneOrder
    })
)(GenePicker);

export default ConnectedGenePicker;
