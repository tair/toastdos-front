"use strict";

import { connect } from 'react-redux';
import NavigationFrame from './navigationFrame';
import { logout } from '../../actions/authentication';

const ConnectedNavigationFrame = connect(
    state => ({
        isAuthenticated: state.authentication.isAuthenticated
    }),
    dispatch => ({
        onLogoutClick: () => dispatch(logout())
    })
)(NavigationFrame);


export default ConnectedNavigationFrame;
