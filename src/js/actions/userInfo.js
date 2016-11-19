"use strict";

import { getUserInfo } from '../lib/api';

export const REQUEST_USER_INFO = "REQUEST_USER_INFO";
export const SUCCESS_USER_INFO = "SUCCESS_USER_INFO";
export const FAIL_USER_INFO = "REQUEST_USER_INFO";

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
