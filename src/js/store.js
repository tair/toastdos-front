"use strict";
/* global process */
import { createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';
import reducer from './reducers';

// Only load the dev tools in development
let DevTools = (process.env.NODE_ENV === 'development') ? 
require('components/devTools/devTools').default : f => f;

let enhancements = [ applyMiddleware(thunk) ];
(process.env.NODE_ENV === 'development') ?
enhancements.push(DevTools.instrument()) : null;

const enhancer = compose(
  ...enhancements
);

let initialState = {};

let store = createStore(
    reducer,
    initialState,
    enhancer
);

export default store;
