"use strict";


export const REQUEST_LOGIN = "REQUEST_LOGIN";
export const SUCCESS_LOGIN = "SUCCESS_LOGIN";
export const FAIL_LOGIN = "FAIL_LOGIN";

/**
 * Create a new REQUEST_LOGIN action and attempt to log in
 * @param  {String} authCode - the auth code given bcak by orcID oAuth
 */
export function requestLogin(authCode) {
	return dispatch => {
        // call async login function...
        
    }
}

export function loginSuccess(logindata) {
    return {
        type: SUCCESS_LOGIN
    }
}

export function resetCounter() {
	return {
		type: FAIL_LOGIN
	}
}
