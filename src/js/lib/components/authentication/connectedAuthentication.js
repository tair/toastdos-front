"use strict";

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { AuthenticationModiule } from 'modules/authetnication';
import Authentication from './authentication';

const ConnectedAuthentication = connect(
    createStructuredSelector({
        isAuthenticated: AuthenticationModiule.selectors.isAuthenticated
    })
)(Authentication);

export default ConnectedAuthentication;
