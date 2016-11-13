"use strict";

import { connect } from 'react-redux';
import NavigationFrame from './navigationFrame';
import jwtdecode from 'jwt-decode';

const ConnectedNavigationFrame = connect(
    state => ({
        isAuthenticated: state.authentication.isAuthenticated,
        userName: state.authentication.isAuthenticated ? jwtdecode(state.authentication.jwt).user_name : null
    })
)(NavigationFrame);


export default ConnectedNavigationFrame;
