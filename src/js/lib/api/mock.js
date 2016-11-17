"use strict";

export function login(orcidCode, callback) {
    return callback(null, {
        jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcl9pZCI6NSwidXNlcl9uYW1lIjoiSm9obiBEb2UiLCJ1c2VyX29yY2lkX2lkIjoiMTIzNC01Njc4LTk4NzYtNDMyMSJ9.N2irm4JuggkMRLQRQIt9TMKKNq99AcTU8x1SBlid-nk"
    });
}

export function getUserInfo(id, callback) {
    return callback(null, {
        //todo mock user info response
    });
}
