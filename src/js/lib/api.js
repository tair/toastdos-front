"use strict";

export function login(orcidCode, callback) {
    setTimeout(() => {
        return callback(null, {jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwib3JjaWQiOiJhaDdhc2RoOWhhMzloIiwidXNlcmlkIjozfQ.zCJh5Xj717pzWM7XsIE6vUOAiMmVTa-q3gs6r81o5N8"})
    }, 2000)
}

