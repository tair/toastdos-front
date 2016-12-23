"use strict";

import reducer from './reducer';
import * as constants from './constants';
import LoginView from './components/loginView';
import * as actionTypes from './actionTypes';
import * as actions from './actions';

export default {
    components: {
        LoginView
    },
    actions,
    actionTypes,
    constants,
    reducer
};
