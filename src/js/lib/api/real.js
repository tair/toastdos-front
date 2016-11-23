"use strict";

import request from 'browser-request';
import config from '../../../../config';

const BASE_URL = config.apiBase;

export function login(orcidCode, callback) {
    return request({
        method: 'POST',
        url: `${BASE_URL}/api/login`,
        json: {
            code: orcidCode
        }
    }, (err, resp, body) => {
        if(err) {
            return callback(err);
        }
        if(resp.status === 500) {
            return callback(body.err);
        }
        return callback(null, body);
    });
}

export function getUserInfo(id, jwt, callback) {
    return request({
        method: 'GET',
        url: `${BASE_URL}/api/user/${id}`,
        json: true,
        headers: {
            'Authorization': `Bearer ${jwt}`
        }
    }, (err, resp, body) => {
        if(err) {
            return callback(err);
        }
        if(resp.status >= 400 && resp.status < 500) {
            return callback(body);
        }
        if(resp.status === 500) {
            return callback(body.err);
        }
        return callback(null, body);
    });
}

/**
 * Request for updating user info
 * @param  {Object}   newUserInfo - the user info to change
 * @param  {String}   jwt         - the JWT
 * @param  {Function} callback    - the calllback
 */
export function updateUserInfo(id, newUserInfo, jwt, callback) {
    return request({
        method: 'PUT',
        url: `${BASE_URL}/api/user/${id}`,
        json: newUserInfo,
        headers: {
            'Authorization': `Bearer ${jwt}`
        }
    }, (err, resp, body) => {
        if(err) {
            return callback(err);
        }
        if(resp.status >= 400 && resp.status < 500) {
            return callback(body);
        }
        if(resp.status === 500) {
            return callback(body.err);
        }
        return callback(null, body);
    });
}


