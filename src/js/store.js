"use strict";
/* global process */
import { createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';
import reducer from './reducers';

let DevTools = (process.env.NODE_ENV !== 'production') ? 
require('components/devTools/devTools').default : f => f;

let enhancements = [ applyMiddleware(thunk) ];
process.env.NODE_ENV === 'production' ? f => f :
enhancements.push(DevTools.instrument());

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
