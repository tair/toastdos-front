"use strict";

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GenePicker from 'ui/gene/picker';
import { geneValidListSelector } from 'domain/gene/selectors';

const ConnectedGenePicker = connect(
    (state, ownProps) => ({
        genes: geneValidListSelector(state, ownProps.geneOrder),
    })
)(GenePicker);

ConnectedGenePicker.propTypes = {
    geneOrder: PropTypes.array,
};

export default ConnectedGenePicker;
