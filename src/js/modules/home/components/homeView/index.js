"use strict";

import {connect} from 'react-redux';
import HomeView from './homeView';

const ConnectedHomeView = connect(
    // state => ({
    //     //...
    // }),
    // dispatch => ({

    // })
)(HomeView);

export default ConnectedHomeView;
