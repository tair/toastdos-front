"use strict";

import jwtDecode from 'jwt-decode';
import request from 'browser-request';

const BASE_URL = "http://localhost:3000";

export function login(orcidCode, callback) {

    return request({
        method: 'POST',
        url: BASE_URL + "/api/login",
        json: {
            code: orcidCode
        }
    }, (err, resp, body) => {
        if(err) {
            return callback(err);
        }
        console.log(body)
        return callback(null, body);
    });
}


