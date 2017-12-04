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

export function updateGene1(localId, gene1LocalId) {
    return {
        type: actions.UPDATE_GENE1,
        localId,
        gene1LocalId,
    };
}

export function updateGene2(localId, gene2LocalId) {
    return {
        type: actions.UPDATE_GENE2,
        localId,
        gene2LocalId,
    };
}
