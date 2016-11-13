"use strict";

import {connect} from 'react-redux';
import UserProfilePanel from './userProfilePanel';
import { logout } from '../../actions/authentication';

const ConnectedUserProfilePanel = connect(
    null,
    dispatch => ({
        onLogoutClick: () => dispatch(logout())
    })
)(UserProfilePanel);

export default ConnectedUserProfilePanel;
