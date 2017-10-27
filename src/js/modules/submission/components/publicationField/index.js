"use strict";

import { connect } from 'react-redux';
import PublicationField from './publicationField';
import { changePublicationId, AttemptValidatePublicationAsync } from '../../actions';

const ConnectedPublicationField = connect(
    state => ({
        publicationIdValue: state.submission.publicationIdValue,
        publicationValidation: state.submission.publicationValidation,
        publicationInfo: state.submission.publicationInfo,
    }),
    dispatch => ({
        attemptValidatePublication: (publicationId) => dispatch(new AttemptValidatePublicationAsync(publicationId))
    })
)(PublicationField);

ConnectedPublicationField.defaultProps = {
    ...PublicationField.defaultProps
};

export default ConnectedPublicationField;
