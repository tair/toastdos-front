"use strict";

import {
    REQUEST_LOGIN,
    SUCCESS_LOGIN,
    FAIL_LOGIN,
    LOGOUT,
    TOKEN_LOADED,
    NO_TOKEN_LOADED
} from "../actions/authentication";

const defaultState = {
    isAuthenticated: false,
    isFetching: false,
    jwt: null,
    loginError: null,
    initializing: true
};



export default function handleAction(state = defaultState, action) {
    switch (action.type) {
    case REQUEST_LOGIN:
        return Object.assign({}, state, {
            isFetching: true,
            initializing: true
        });
    case SUCCESS_LOGIN:
        return Object.assign({}, state, {
            isFetching: false,
            isAuthenticated: true,
            jwt: action.jwt,
            initializing: false
        });
    case FAIL_LOGIN:
        return Object.assign({}, state, {
            isFetching: false,
            isAuthenticated: false,
            jwt: null,
            loginError: action.error,
            initializing: false
        });
    case LOGOUT:
        return Object.assign({}, state, {
            isFetching: false,
            isAuthenticated: false,
            jwt: null,
            loginError: null
        });
    case TOKEN_LOADED:
        return Object.assign({}, state, {
            isAuthenticated: true,
            jwt: action.jwt,
            initializing: false 
        });
    case NO_TOKEN_LOADED:
        return Object.assign({}, state, {
            initializing: false
        });
    default:
        return state;
    }
}

