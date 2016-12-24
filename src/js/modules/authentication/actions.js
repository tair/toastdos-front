"use strict";

import jwtDecode from 'jwt-decode';

import { login } from "lib/api";
import * as actions from './actionTypes';
// todo fix reference
// import { requestUserInfo } from './userInfo';
import userInfoModule from 'modules/userInfo';
/**
 * Create a new REQUEST_LOGIN action and attempt to log in
 * @param  {String} authCode - the auth code given bcak by orcID oAuth
 */
export function requestLogin(authCode) {
    return dispatch => {
        // call async login function...
        dispatch({type: actions.REQUEST_LOGIN});
        return login(authCode, (err, data) => {
            if(err) {
                return dispatch(loginFail(err));
            }
            return dispatch(loginSuccess(data));
        });
    };
}

/**
 * Create a new FAIL_LOGIN action.
 * @param  {Error} err - the login error
 * @return {Object} - the action
 */
function loginFail(err) {
    return {
        type: actions.FAIL_LOGIN,
        error: err
    };
}

/**
 * Create a new SUCCESS_LOGIN action.
 * @param  {Object} logindata - the login data returned
 * @return {Object} - the action
 */
function loginSuccess(logindata) {
    sessionStorage.setItem('account_jwt', logindata.jwt);
    let decoded = jwtDecode(logindata.jwt);

    return dispatch => {
        dispatch({
            type: actions.SUCCESS_LOGIN,
            jwt: logindata.jwt
        });
        
        return dispatch(userInfoModule.actions.requestUserInfo(decoded.user_id));
    };
}

/**
 * Logout user, create LOGOUT action.
 * @return {Object} - the action
 */
export function logout() {
    // clear from sessionstorage
    sessionStorage.removeItem('account_jwt');
    return {
        type: actions.LOGOUT
    };
}

/**
 * Action creator to perform initialization tasks
 */
export function initialize() {
    return dispatch => {
        let jwt = sessionStorage.getItem('account_jwt');
        if(jwt) {
            dispatch({
                type: actions.TOKEN_LOADED,
                jwt: jwt
            });
            let decoded = jwtDecode(jwt);
            return dispatch(userInfoModule.actions.requestUserInfo(decoded.user_id));
        }

        return dispatch({
            type: actions.NO_TOKEN_LOADED
        });
    };
}