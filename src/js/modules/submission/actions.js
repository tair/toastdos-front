"use strict";

import * as actions from './actionTypes';

export function changePublicationId(value) {
    return {
        type: actions.PUBLICATION_ID_CHANGED,
        value: value
    };
}
