"use strict";

import { connect } from 'react-redux';
import NavigationFrame from './navigationFrame';
import AuthenticationModule from 'modules/authentication';

const ConnectedNavigationFrame = connect(
    state => ({
        isAuthenticated: AuthenticationModule.selectors.isAuthenticated(state),
        userName: state.userInfo.user_name,
        userRoles: state.userInfo.user_roles,
        initializing: state.authentication.initializing,
    })
)(NavigationFrame);


export default ConnectedNavigationFrame;
