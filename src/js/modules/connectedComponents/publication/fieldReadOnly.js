"use strict";

import React from 'react';
import { connect } from 'react-redux';
import PublicationFieldReadOnly from 'ui/publication/fieldReadOnly';
import { publicationSelector } from 'domain/publication/selectors';

const ConnectedPublicationFieldReadOnly = connect(
    (state, ownProps) => ({
        ...publicationSelector(state, ownProps.localId),
    }),
    () => ({})
)(PublicationFieldReadOnly);

ConnectedPublicationFieldReadOnly.propTypes = {
    localId: React.PropTypes.string,
};

ConnectedPublicationFieldReadOnly.defaultProps = {
    localId: '',
};

export default ConnectedPublicationFieldReadOnly;
