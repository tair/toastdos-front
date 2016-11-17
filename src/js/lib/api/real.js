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

export function getUserInfo(id, callback) {
    return request({
        method: 'GET',
        url: `${BASE_URL}/api/user/${id}`,
        json: true
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


