"use strict";

import {connect} from 'react-redux';
import UserProfilePanel from './userProfilePanel';
import { logout } from '../../actions/authentication';
import { requestUpdateUserInfo } from '../../actions/userInfo';
// import jwtdecode from 'jwt-decode';

const ConnectedUserProfilePanel = connect(
    state => ({
        name: state.userInfo.user_name,
        orcid: state.userInfo.user_orcid_id,
        email: state.userInfo.user_email
    }),
    dispatch => ({
        onLogoutClick: () => dispatch(logout()),
        onEmailChange: email => dispatch(requestUpdateUserInfo({email_address: email}))
    })
)(UserProfilePanel);

export default ConnectedUserProfilePanel;
