"use strict";

import * as actionTypes from './actionTypes';

const defaultState = {
    isFetching: false,
    jwt: null,
    loginError: null,
    initializing: true
};



export default function handleAction(state = defaultState, action) {
    switch (action.type) {
    case actionTypes.REQUEST_LOGIN:
        return Object.assign({}, state, {
            isFetching: true,
            initializing: false
        });
    case actionTypes.SUCCESS_LOGIN:
        return Object.assign({}, state, {
            isFetching: false,
            isAuthenticated: true,
            jwt: action.jwt,
            initializing: false
        });
    case actionTypes.FAIL_LOGIN:
        return Object.assign({}, state, {
            isFetching: false,
            isAuthenticated: false,
            jwt: null,
            loginError: action.error,
            initializing: false
        });
    case actionTypes.LOGOUT:
        return Object.assign({}, state, {
            isFetching: false,
            isAuthenticated: false,
            jwt: null,
            loginError: null
        });
    case actionTypes.TOKEN_LOADED:
        return Object.assign({}, state, {
            isAuthenticated: true,
            jwt: action.jwt,
            initializing: false
        });
    case actionTypes.NO_TOKEN_LOADED:
        return Object.assign({}, state, {
            initializing: false
        });
    default:
        return state;
    }
}

