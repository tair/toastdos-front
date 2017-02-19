"use strict";

import reducer from './reducer';
import * as constants from './constants';
import LoginView from './components/loginView';
import TokenWatchdog from './components/TokenWatchdog';
import * as actionTypes from './actionTypes';
import * as actions from './actions';
import * as selectors from './selectors';

export default {
    components: {
        LoginView,
        TokenWatchdog
    },
    actions,
    actionTypes,
    constants,
    reducer,
    selectors
};
