"use strict";

import React from 'react';
import { connect } from 'react-redux';
import PublicationField from 'ui/publication/field';
import { publicationSelector } from 'domain/publication/selectors';
import { attemptValidatePublication } from 'domain/publication/actions';

const ConnectedPublicationField = connect(
    (state, ownProps) => ({
        ...publicationSelector(state, ownProps.localId),
    }),
    (dispatch, ownProps) => ({
        attemptValidatePublication: (publicationId) => dispatch(
            attemptValidatePublication(ownProps.localId, publicationId)
        ),
    })
)(PublicationField);

ConnectedPublicationField.propTypes = {
    localId: React.PropTypes.string,
};

ConnectedPublicationField.defaultProps = {
    localId: '',
};

export default ConnectedPublicationField;
