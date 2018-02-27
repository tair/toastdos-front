"use strict";

import jwtDecode from 'jwt-decode';
import * as actions from './actionTypes';
import { getUserInfo, updateUserInfo } from 'lib/api';

/**
 * Create a new FAIL_USER_INFO action
 * @param  {Error} err - request error that happened
 * @return {Object}     - the action
 */
function userInfoFail(err) {
    return {
        type: actions.FAIL_USER_INFO,
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
        type: actions.SUCCESS_USER_INFO,
        userInfo: userInfo
    };
}

function updateUserInfoFail(err) {
    return {
        type: actions.FAIL_UPDATE_USER_INFO,
        error: err
    };
}

function updateUserInfoSuccess(userInfo) {
    return {
        type: actions.SUCCESS_UPDATE_USER_INFO,
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
        dispatch({type: actions.REQUEST_USER_INFO});
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
        dispatch({type: actions.REFRESH_USER_INFO});
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
            type: actions.REQUEST_UPDATE_USER_INFO,
            userInfo: newUserInfo
        });
        return updateUserInfo(user_id, newUserInfo, state.authentication.jwt, (err, data) => {
            if(err) {
                return dispatch(updateUserInfoFail(err));
            }
            return dispatch(updateUserInfoSuccess(data));
        });
    };
}
