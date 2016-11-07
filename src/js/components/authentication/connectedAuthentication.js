"use strict";

import { connect } from 'react-redux';
import Authentication from './authentication';

const ConnectedAuthentication = connect(
    state => ({
        isAuthenticated: state.authentication.isAuthenticated
    })
)(Authentication);

export default ConnectedAuthentication;
