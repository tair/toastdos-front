"use strict"

import {connect} from 'react-redux';
import Home from './home';

const ConnectedHome = connect(
    state => ({
        //...
    }),
    dispatch => ({

    })
)(Home);

export default ConnectedHome;
