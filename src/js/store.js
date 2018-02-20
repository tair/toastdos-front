"use strict";
/* global process */
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { asyncActionMiddleware } from 'lib/asyncActionManager';

import authentication from 'modules/authentication';
import home from 'modules/home';
import navigation from 'modules/navigation';
import userInfo from 'modules/userInfo';
import domain from 'domain';
import submission from 'modules/submission';
import curationDetail from 'modules/curationDetail';
import curationOverview from 'modules/curationOverview';
import exportsView from 'modules/exportsView';

let reducer = combineReducers({
    [home.constants.name]: home.reducer,
    [authentication.constants.name]: authentication.reducer,
    [navigation.constants.name]: navigation.reducer,
    [userInfo.constants.name]: userInfo.reducer,
    [domain.constants.name]: domain.reducer,
    [submission.constants.name]: submission.reducer,
    [curationDetail.constants.name]: curationDetail.reducer,
    [curationOverview.constants.name]: curationOverview.reducer,
    [exportsView.constants.name]: exportsView.reducer,
    routing: routerReducer
});

// Only load the dev tools in development
let DevTools = (process.env.NODE_ENV === 'development') ? 
require('lib/components/devTools').default : f => f;

let enhancements = [ applyMiddleware(thunk, asyncActionMiddleware) ];
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
