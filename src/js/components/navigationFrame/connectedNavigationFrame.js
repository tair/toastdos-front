"use strict";

import { connect } from 'react-redux';
import NavigationFrame from './navigationFrame';

const ConnectedNavigationFrame = connect(
    state => ({
        isAuthenticated: state.authentication.isAuthenticated,
        userName: state.authentication.isAuthenticated ? 
            state.userInfo.user_name : 
            null
    })
)(NavigationFrame);


export default ConnectedNavigationFrame;
