"use strict";

import { login } from "../lib/api";

export const REQUEST_LOGIN = "REQUEST_LOGIN";
export const SUCCESS_LOGIN = "SUCCESS_LOGIN";
export const FAIL_LOGIN = "FAIL_LOGIN";
export const LOGOUT = "LOGOUT";

/**
 * Create a new REQUEST_LOGIN action and attempt to log in
 * @param  {String} authCode - the auth code given bcak by orcID oAuth
 */
export function requestLogin(authCode) {
    return dispatch => {
        // call async login function...
        dispatch({type: REQUEST_LOGIN});
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
        type: FAIL_LOGIN,
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
    return {
        type: SUCCESS_LOGIN,
        jwt: logindata.jwt
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
        type: LOGOUT
    };
}