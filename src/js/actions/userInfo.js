"use strict";

import { getUserInfo, updateUserInfo } from '../lib/api';
import jwtDecode from 'jwt-decode';

export const REQUEST_USER_INFO = "REQUEST_USER_INFO";
export const REFRESH_USER_INFO = "REFRESH_USER_INFO";
export const SUCCESS_USER_INFO = "SUCCESS_USER_INFO";
export const FAIL_USER_INFO = "FAIL_USER_INFO";
export const REQUEST_UPDATE_USER_INFO = "REQUEST_UPDATE_USER_INFO";
export const SUCCESS_UPDATE_USER_INFO = "SUCCESS_UPDATE_USER_INFO";
export const FAIL_UPDATE_USER_INFO = "FAIL_UPDATE_USER_INFO";

/**
 * Create a new FAIL_USER_INFO action
 * @param  {Error} err - request error that happened
 * @return {Objet}     - the action
 */
function userInfoFail(err) {
    return {
        type: FAIL_USER_INFO,
        error: err
    };
}

/**
 * Create a new SUCCESS_USER_INFO action
 * @param  {Object} userInfo - the user information
 * @return {Object}          - the action
 */
function userInfoSuccess(userInfo) {
    return {
        type: SUCCESS_USER_INFO,
        userInfo: userInfo
    };
}

function updateUserInfoFail(err) {
    return {
        type: FAIL_UPDATE_USER_INFO,
        error: err
    };
}

function updateUserInfoSuccess(userInfo) {
    return {
        type: SUCCESS_UPDATE_USER_INFO,
        userInfo: userInfo
    };
}

/**
 * Create a new REQUEST_USER_INFO action
 * @param  {Integer} user_id - the ID of the user being reqested.
 */
export function requestUserInfo(user_id) {
    return (dispatch, getState) => {
        let state = getState();
        dispatch({type: REQUEST_USER_INFO});
        return getUserInfo(user_id, state.authentication.jwt, (err, data) => {
            if(err) {
                return dispatch(userInfoFail(err));
            }
            return dispatch(userInfoSuccess(data));
        });
    };
}

/**
 * Create a new UPDATE_USER_INFO action
 * @param  {Integer} user_id - the ID of the user being reqested.
 */
export function refreshUserInfo() {
    return (dispatch, getState) => {
        let state = getState();
        let user_id = jwtDecode(state.authentication.jwt).user_id;
        dispatch({type: REFRESH_USER_INFO});
        return getUserInfo(user_id, state.authentication.jwt, (err, data) => {
            if(err) {
                return dispatch(userInfoFail(err));
            }
            return dispatch(userInfoSuccess(data));
        });
    };
}


/**
 * Create new REQUEST_UPDATE_USER_INFO action.
 * Attempts to update user info.
 *    
 * @param  {Object} newUserInfo - the new user info
 */
export function requestUpdateUserInfo(newUserInfo) {
    return (dispatch, getState) => {
        let state = getState();
        let user_id = jwtDecode(state.authentication.jwt).user_id;
        dispatch({
            type: REQUEST_UPDATE_USER_INFO,
            userInfo: {
                name: newUserInfo.user_name,
                orcid_id: newUserInfo.user_orcid_id,
                email_address: newUserInfo.user_email
            }
        });
        return updateUserInfo(user_id, newUserInfo, state.authentication.jwt, (err, data) => {
            if(err) {
                return dispatch(updateUserInfoFail(err));
            }
            return dispatch(updateUserInfoSuccess(data));
        });
    };
}
