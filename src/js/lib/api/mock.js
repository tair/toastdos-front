"use strict";

//run this in terminal... USE_MOCK_API=true npm start
//check index.js (this is why this command works)

var userJSONObj={
    	"user_name": "John Doe",
		"user_orcid_id": "1234-5678-9876-4321",
		"email":"JoDo@do.com",
		"roles" : [
		    {
		        "curator":"true"
		    },
		    {
		        "researcher":"null" 
		    },
		    {
		    	"viewer":"null" 
		    }
		]
    };

export function login(orcidCode, callback) {
    return callback(null, {
        jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcl9pZCI6NSwidXNlcl9uYW1lIjoiSm9obiBEb2UiLCJ1c2VyX29yY2lkX2lkIjoiMTIzNC01Njc4LTk4NzYtNDMyMSJ9.N2irm4JuggkMRLQRQIt9TMKKNq99AcTU8x1SBlid-nk"
    });
}

//make JSON object
export function getUserInfo(id, callback) {
    return callback(null, userJSONObj);
}
