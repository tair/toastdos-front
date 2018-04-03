"use strict";

import { connect } from 'react-redux';
import ValidatedField from 'ui/validatedField';
import { reviewValidated } from 'modules/submission/selectors';

const ConnectedValidatedField = connect(
    state => ({
        reviewValidated: reviewValidated(state),
    }),
    () => ({})
)(ValidatedField);

export default ConnectedValidatedField;
