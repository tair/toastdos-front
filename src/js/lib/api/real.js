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

/**
 * Request for validating a publication
 * @param  {String}   publicationId - the publicationId
 * @param  {String}   jwt - auth token
 * @param  {Function} callback  - the callback
 */
export function validatePublication(publicationId, jwt, callback) {
    return request({
        method: 'POST',
        timeout: 15000,
        url: `${BASE_URL}/api/publication`,
        json: {
            publication_id: publicationId
        },
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
        // json: submissionData,
        body: JSON.stringify(submissionData),
        headers: {
            'Authorization': `Bearer ${jwt}`,
            'Content-type': `application/json`
        }
    }, (err, resp, body) => {
        if(err) {
            return callback(err);
        }
        if(resp.status >= 300) {
            return callback(body);
        }
        return callback(null, body);
    });
}

export function searchKeywords(searchTerm, keywordScope, jwt, callback) {
    return request({
        method: 'GET',
        timeout: 15000,
        url: `${BASE_URL}/api/keyword/search`,
        qs: {
            substring: searchTerm,
            keyword_scope: keywordScope
        },
        json: true,
        headers: {
            'Authorization': `Bearer ${jwt}`
        }
    }, (err, resp, body) => {
        if(err) {
            return callback(err);
        }
        if(resp.status >= 300) {
            return callback(body);
        }
        return callback(null, body);
    });
}

export function listSubmissions(page, limit, sortBy, sortDir, jwt, callback) {
    return request({
        method: 'GET',
        timeout: 15000,
        url: `${BASE_URL}/api/submission/list`,
        json: true,
        headers: {
            'Authorization': `Bearer ${jwt}`
        },
        qs: {
            page,
            limit,
            sort_by: sortBy,
            sort_dir: sortDir,
        }
    }, (err, res, body) => {
        if(err) {
            return callback(err);
        }
        if(res.status < 200 || res.status >= 300) {
            return callback(err);
        }
        return callback(null, body);
    });
}

