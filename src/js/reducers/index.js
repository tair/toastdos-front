"use strict";

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authentication from "./authentication";
import userInfo from "./userInfo";

export default combineReducers({
    authentication,
    userInfo,
    routing: routerReducer
});
