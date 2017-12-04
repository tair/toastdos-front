"use strict";

import * as actions from './actionTypes';
import generateId from 'lib/idGenerator';

export function addNew() {
    return {
        type: actions.ADD_NEW,
        localId: '' + generateId(),
    };
}

export function remove(localId) {
    return {
        type: actions.REMOVE,
        localId: localId
    };
}

export function removeAnnotations(localIds) {
    return {
        type: actions.REMOVE_ANNOTATIONS,
        localIds,
    };
}

export function update(localId, data) {
    return {
        type: actions.UPDATE,
        localId,
        data,
    };
}
