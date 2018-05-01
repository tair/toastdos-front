"use strict";

import {connect} from 'react-redux';
import AddEmailPanel from './addEmailPanel';

import { requestUpdateUserInfo } from '../../actions';
// import jwtdecode from 'jwt-decode';

const ConnectedAddEmailPanel = connect(
    state => ({
        email: state.userInfo.user_email
    }),
    dispatch => ({
        onEmailChange: email => dispatch(requestUpdateUserInfo({email_address: email}))
    })
)(AddEmailPanel);

export default ConnectedAddEmailPanel;
