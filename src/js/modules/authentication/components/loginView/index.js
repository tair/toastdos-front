"use strict";

import { connect } from 'react-redux';
import LoginView from './loginView';
import { createStructuredSelector } from 'reselect';

import { requestLogin } from '../../actions';
import { isAuthenticated, isAuthenticating, loginError } from '../../selectors';

const ConnectedLoginView = connect(
    createStructuredSelector({
        isAuthenticated: isAuthenticated,
        isAuthenticating: isAuthenticating,
        loginError,
    }),
    dispatch => ({
        attemptLogin: authCode => dispatch(requestLogin(authCode))
    })
)(LoginView);


export default ConnectedLoginView;
