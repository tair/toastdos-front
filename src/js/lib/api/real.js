"use strict";

import request from 'browser-request';
import config from '../../../../config';

const BASE_URL = config.apiBase;

export function login(orcidCode, callback) {
    return request({
        method: 'POST',
        timeout: 15000,
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
        timeout: 15000,
        url: `${BASE_URL}/api/user/${id}?withRelated=roles`,
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
        timeout: 15000,
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

/**
 * Request for validating a gene name
 * @param  {String}   name - the gene name
 * @param  {String}   jwt - auth token
 * @param  {Function} callback  - the callback
 */
export function validateGene(name, jwt, callback) {
    return request({
        method: 'GET',
        timeout: 15000,
        url: `${BASE_URL}/api/gene/verify/${encodeURIComponent(name)}`,
        json: true,
        headers: {
            'Authorization': `Bearer ${jwt}`
        }
    }, (err, resp, body) => {
        if(resp.status === 404) {
            return callback({error: "NOT_FOUND"});
        }
        if(err) {
            return callback(err);
        }
        if(resp.status === 500) {
            return callback(body);
        }
        return callback(null, body);
    });
}

export function submitSubmission(submissionData, jwt, callback) {
    // console.log(submissionData);
    return request({
        method: 'POST',
        timeout: 15000,
        url: `${BASE_URL}/api/submission`,
        json: submissionData,
        headers: {
            'Authorization': `Bearer ${jwt}`
        }
    }, (err, resp, body) => {
        console.log(body)
        if(err) {
            console.log(err);
            return callback(err);
        }
        if(resp.status >= 300) {
            return callback(body);
        }
        return callback(null, body);
    });
}


