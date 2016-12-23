"use strict";

import * as actionTypes from './actionTypes';

import authenticationModule from 'modules/authentication';

const defaultState = {
    isFetching: false,
    user_name: null,
    user_orcid_id: null,
    user_email: null,
    fetchError: null,
    initializing: true,
    attemptingUpdate: false,
    updateError: null
};


export default function handleAction(state = defaultState, action) {
    switch (action.type) {
    case actionTypes.REQUEST_USER_INFO:
        return Object.assign({}, state, {
            isFetching: true,
            initializing: true
        });
    case actionTypes.REFRESH_USER_INFO:
        return Object.assign({}, state, {
            isFetching: true
        });
    case actionTypes.SUCCESS_USER_INFO:
        return Object.assign({}, state, {
            isFetching: false,
            user_name: action.userInfo.name,
            user_orcid_id: action.userInfo.orcid_id,
            user_email: action.userInfo.email_address,
            initializing: false
        });
    case actionTypes.FAIL_USER_INFO:
        return Object.assign({}, state, {
            isFetching: false,
            fetchError: action.error
        });
    case actionTypes.REQUEST_UPDATE_USER_INFO:
        return Object.assign({}, state, {
            attemptingUpdate: true
        });
    case actionTypes.SUCCESS_UPDATE_USER_INFO:
        return Object.assign({}, state, {
            attemptingUpdate: false,
            user_name: action.userInfo.name,
            user_orcid_id: action.userInfo.orcid_id,
            user_email: action.userInfo.email_address
        });
    case actionTypes.FAIL_UPDATE_USER_INFO:
        return Object.assign({}, state, {
            attemptingUpdate: false,
            updateError: action.error
        });
    case authenticationModule.actionTypes.LOGOUT:
        return Object.assign({}, state, {
            user_name: null
        });
    case authenticationModule.actionTypes.NO_TOKEN_LOADED:
        return Object.assign({}, state, {
            initializing: false
        });
    default:
        return state;
    }
}
