"use strict";

import jwtDecode from 'jwt-decode';

const mockLoginResponse = {
    jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZk5hbWUiOiJKb2huIiwibE5hbWUiOiJEb2UiLCJ1c2VyX2lkIjozfQ.aRxFX3Zz4olgYV-mU4cu8M5rS715GJUsvkaTjkv9EcI"
}

export function login(orcidCode, callback) {
    setTimeout(() => {
        console.log(jwtDecode(mockLoginResponse.jwt));
        return callback(null, mockLoginResponse);
    }, 2000)
}


