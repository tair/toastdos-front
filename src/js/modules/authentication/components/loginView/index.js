"use strict";

import { connect } from 'react-redux';
import LoginView from './loginView';

import { requestLogin } from '../../actions';

const ConnectedLoginView = connect(
    state => ({
        isAuthenticated: state.authentication.isAuthenticated,
        isAuthenticating: state.authentication.isFetching
    }),
    dispatch => ({
        attemptLogin: authCode => dispatch(requestLogin(authCode))
    })
)(LoginView);


export default ConnectedLoginView;
