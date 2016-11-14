"use strict";

import {connect} from 'react-redux';
import UserProfilePanel from './userProfilePanel';
import { logout } from '../../actions/authentication';
import jwtdecode from 'jwt-decode';

const ConnectedUserProfilePanel = connect(
    state => {
        if(!state.authentication.isAuthenticated) {
            return {};
        }
        let decodedJWT = jwtdecode(state.authentication.jwt);
        return {
            name: decodedJWT.user_name,
            orcid: decodedJWT.user_orcid_id
        };
    },
    dispatch => ({
        onLogoutClick: () => dispatch(logout())
    })
)(UserProfilePanel);

export default ConnectedUserProfilePanel;
