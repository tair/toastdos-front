"use strict";

import {REQUEST_LOGIN, SUCCESS_LOGIN, FAIL_LOGIN} from "../actions/authentication";

const defaultState = {
	isAuthenticated: false,
    isFetching: false,
	jwt: null,
    loginError: null
};



export default function handleAction(state = defaultState, action) {
    switch (action.type) {
        case REQUEST_LOGIN:
            return Object.assign({}, state, {
                isFetching: true
            });
        case SUCCESS_LOGIN:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: true,
                jwt: action.jwt
            });
        case FAIL_LOGIN:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                jwt: null,
                loginError: action.error
            });
        default:
            return state;
    }
}

