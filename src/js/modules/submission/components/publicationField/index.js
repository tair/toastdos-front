"use strict";

import { connect } from 'react-redux';
import PublicationField from './publicationField';
import { AttemptValidatePublicationAsync } from '../../actions';

const ConnectedPublicationField = connect(
    state => ({
        ...state.submission.publication,
    }),
    dispatch => ({
        attemptValidatePublication: (publicationId) => dispatch(new AttemptValidatePublicationAsync(publicationId))
    })
)(PublicationField);

ConnectedPublicationField.defaultProps = {
    ...PublicationField.defaultProps
};

export default ConnectedPublicationField;
