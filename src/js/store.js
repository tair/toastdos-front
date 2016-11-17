"use strict";
/* global process */
import { createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';
import reducer from './reducers';

let DevTools = null;
if(process.env.NODE_ENV !== 'production') {
    DevTools = require('components/devTools/devTools');
}

let enhancements = [ applyMiddleware(thunk) ];
process.env.NODE_ENV === 'production' ? null : enhancements.push(DevTools.instrument());

const enhancer = compose(
  ...enhancements
);

let initialState = {};

var jwt = sessionStorage.getItem('account_jwt');

if(jwt) {
    initialState.authentication = {
        isAuthenticated: true,
        jwt: jwt,
    };
}

let store = createStore(
    reducer,
    initialState,
    enhancer
);

export default store;
