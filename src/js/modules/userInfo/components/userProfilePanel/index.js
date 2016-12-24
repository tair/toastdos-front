"use strict";

import {connect} from 'react-redux';
import UserProfilePanel from './userProfilePanel';
import authenticationModule from 'modules/authentication';
import { requestUpdateUserInfo } from '../../actions';
// import jwtdecode from 'jwt-decode';

const ConnectedUserProfilePanel = connect(
    state => ({
        name: state.userInfo.user_name,
        orcid: state.userInfo.user_orcid_id,
        email: state.userInfo.user_email
    }),
    dispatch => ({
        onLogoutClick: () => dispatch(authenticationModule.actions.logout()),
        onEmailChange: email => dispatch(requestUpdateUserInfo({email_address: email}))
    })
)(UserProfilePanel);

export default ConnectedUserProfilePanel;
