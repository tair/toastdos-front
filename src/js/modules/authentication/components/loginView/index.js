"use strict";

import { connect } from 'react-redux';
import LoginView from './loginView';
import { createStructuredSelector } from 'reselect';

import { requestLogin } from '../../actions';
import { isAuthenticated, isAuthenticating } from '../../selectors';

const ConnectedLoginView = connect(
    createStructuredSelector({
        isAuthenticated: isAuthenticated,
        isAuthenticating: isAuthenticating
    }),
    dispatch => ({
        attemptLogin: authCode => dispatch(requestLogin(authCode))
    })
)(LoginView);


export default ConnectedLoginView;
