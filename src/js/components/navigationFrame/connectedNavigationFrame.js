"use strict";

import { connect } from 'react-redux';
import NavigationFrame from './navigationFrame';

const ConnectedNavigationFrame = connect(
    state => ({
        isAuthenticated: state.authentication.isAuthenticated
    })
)(NavigationFrame);


export default ConnectedNavigationFrame;
