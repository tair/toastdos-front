"use strict"

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authentication from "./authentication";

export default combineReducers({
    authentication,
    routing: routerReducer
});
