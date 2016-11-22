"use strict";

import {connect} from 'react-redux';
import UserProfilePanel from './userProfilePanel';
import { logout } from '../../actions/authentication';
// import jwtdecode from 'jwt-decode';

const ConnectedUserProfilePanel = connect(
    state => ({
        name: state.userInfo.user_name,
        orcid: state.userInfo.user_orcid_id,
        email: state.userInfo.user_email
    }),
    dispatch => ({
        onLogoutClick: () => dispatch(logout())
    })
)(UserProfilePanel);

export default ConnectedUserProfilePanel;
