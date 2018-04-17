"use strict";

import PropTypes from 'prop-types';
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
    localId: PropTypes.string,
};

ConnectedPublicationFieldReadOnly.defaultProps = {
    localId: '',
};

export default ConnectedPublicationFieldReadOnly;
