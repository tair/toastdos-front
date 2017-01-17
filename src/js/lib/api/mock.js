"use strict";

//run this in terminal... USE_MOCK_API=true npm start
//check index.js (this is why this command works)

const LATENCY = 500;

// object representing currently lgged in user's data
let userJSONObj = {
    id: 3,
    name: "John Doe",
    orcid_id: "1234-5678-9876-4321",
    email_address:"JoDo@do.com",
    //user have no roles if this list is empty
    roles: [
        {
            "id": "1",
            "name": "Curator"
        }
    ]
};

/**
 * Mock a login request
 * @param  {String}   orcidCode - the ORCID auth code
 * @param  {Function} callback  - callback after request
 */
export function login(orcidCode, callback) {
    return setTimeout(() => {
        return callback(null, {
            jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcl9pZCI6NSwidXNlcl9uYW1lIjoiSm9obiBEb2UiLCJ1c2VyX29yY2lkX2lkIjoiMTIzNC01Njc4LTk4NzYtNDMyMSJ9.N2irm4JuggkMRLQRQIt9TMKKNq99AcTU8x1SBlid-nk"
        });
    }, LATENCY);
}

/**
 * Mock request for user info. 
 * Returns the mock user object above.
 * @param  {int}   id       - the id of the user
 * @param  {String}   jwt      - the JWT
 * @param  {Function} callback - the callback
 */
export function getUserInfo(id, jwt, callback) {
    return setTimeout(() => {
        return callback(null, userJSONObj);
    }, LATENCY);
}

/**
 * Mock request for updating user info
 * @param  {Object}   newUserInfo - the user info to change
 * @param  {String}   jwt         - the JWT
 * @param  {Function} callback    - the calllback
 */
export function updateUserInfo(id, newUserInfo, jwt, callback) {
    return setTimeout(() => {
        userJSONObj = Object.assign({}, userJSONObj, newUserInfo);
        return callback(null, userJSONObj);
    }, LATENCY);
}

const mockGeneData = {
    myGene1: {
        name: "myGene1",
        id: 4
    }
};

/**
 * Get a single gene by it's name
 * @param  {String}   name     - the name of the gene
 * @param  {Function} callback - the callback
 */
export function getGeneByFullName(name, callback) {
    return setTimeout(() => {
        if(name in mockGeneData) {
            return callback(null, mockGeneData[name]);
        }

        return callback({error: "TooManyGenes"});

    }, LATENCY);
}
