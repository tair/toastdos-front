"use strict";

import {
    REQUEST_USER_INFO,
    SUCCESS_USER_INFO,
    FAIL_USER_INFO
} from "../actions/userInfo";

import {
    NO_TOKEN_LOADED,
    LOGOUT
} from '../actions/authentication';

const defaultState = {
    isFetching: false,
    userInfo: null,
    fetchError: null,
    initializing: true
};


export default function handleAction(state = defaultState, action) {
    switch (action.type) {
    case REQUEST_USER_INFO:
        return Object.assign({}, state, {
            isFetching: true
        });
    case SUCCESS_USER_INFO:
        return Object.assign({}, state, {
            isFetching: false,
            userInfo: action.userInfo,
            initializing: false
        });
    case FAIL_USER_INFO:
        return Object.assign({}, state, {
            isFetching: false,
            fetchError: action.error
        });
    case LOGOUT:
        return Object.assign({}, state, {
            userInfo: null
        });
    case NO_TOKEN_LOADED:
        return Object.assign({}, state, {
            initializing: false
        });
    default:
        return state;
    }
}
