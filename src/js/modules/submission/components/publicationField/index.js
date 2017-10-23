"use strict";

import { connect } from 'react-redux';
import PublicationField from './publicationField';
import { changePublicationId } from '../../actions';

const ConnectedPublicationField = connect(
    state => ({
        publicationIdValue: state.submission.publicationIdValue
    }),
    dispatch => ({
        onBlur: e => dispatch(changePublicationId(e.target.value))
    })
)(PublicationField);

export default ConnectedPublicationField;
