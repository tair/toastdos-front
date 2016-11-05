"use strict";

import jwtDecode from 'jwt-decode';
import request from 'browser-request';

const BASE_URL = "http://localhost:3000";

export function login(orcidCode, callback) {
    // mock response
    // return callback(null, {jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwib3JjaWQiOiJBQkMxMjM0NTY3ODkifQ.Cojq_6hbJZyQm3uQd2WHD0tcigsUMXb6MHskdzffC_Q"});

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
        if(resp.status === 500) {
            return callback(body.err);
        }
        return callback(null, body);
    });
}


