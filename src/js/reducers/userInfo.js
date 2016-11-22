"use strict";

import {
    REQUEST_USER_INFO,
    SUCCESS_USER_INFO,
    FAIL_USER_INFO,
    UPDATE_USER_INFO
} from "../actions/userInfo";

import {
    NO_TOKEN_LOADED,
    LOGOUT
} from '../actions/authentication';

const defaultState = {
    isFetching: false,
    user_name: null,
    user_orcid_id: null,
    user_email: null,
    fetchError: null,
    initializing: true
};


export default function handleAction(state = defaultState, action) {
    switch (action.type) {
    case REQUEST_USER_INFO:
        return Object.assign({}, state, {
            isFetching: true,
            initializing: true
        });
    case UPDATE_USER_INFO:
        return Object.assign({}, state, {
            isFetching: true
        });
    case SUCCESS_USER_INFO:
        return Object.assign({}, state, {
            isFetching: false,
            user_name: action.userInfo.user_name,
            user_orcid_id: action.userInfo.user_orcid_id,
            user_email: action.userInfo.email,
            initializing: false
        });
    case FAIL_USER_INFO:
        return Object.assign({}, state, {
            isFetching: false,
            fetchError: action.error
        });
    case LOGOUT:
        return Object.assign({}, state, {
            user_name: null
        });
    case NO_TOKEN_LOADED:
        return Object.assign({}, state, {
            initializing: false
        });
    default:
        return state;
    }
}
