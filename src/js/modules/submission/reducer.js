"use strict";

import {
    PUBLICATION_ID_CHANGED
} from "./actionTypes";

const defaultState = {
    publicationIdValue: ""
};


export default function (state = defaultState, action) {
    switch (action.type) {
    case PUBLICATION_ID_CHANGED:
        return Object.assign({}, state, {
            publicationIdValue: action.value
        });
    default:
        return state;
    }
}
