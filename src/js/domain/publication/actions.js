"use strict";

import AuthModule from 'modules/authentication';
import * as actions from './actionTypes';
import { AsyncAction } from 'lib/asyncActionManager';
import { validatePublication } from 'lib/api';
import generateId from 'lib/idGenerator';

export function addNew() {
    return {
        type: actions.ADD_NEW,
        localId: '' + generateId(),
    };
}

export function update(localId, publicationId) {
    return {
        type: actions.UPDATE,
        localId,
        publicationId,
    };
}

export function load(localId, publicationId) {
    return {
        type: actions.LOAD,
        localId,
        publicationId,
    };
}

export function remove(localId) {
    return {
        type: actions.REMOVE,
        localId,
    };
}

export function reset(localId) {
    return {
        type: actions.RESET,
        localId,
    };
}

export function attemptValidatePublication(localId, publicationId) {
    return new AttemptValidatePublicationAsync(localId, publicationId);
}

export class AttemptValidatePublicationAsync extends AsyncAction {
    constructor(localId, publicationId) {
        super(actions.ATTEMPT_VALIDATE + localId);
        this.publicationId = publicationId;
        this.localId = localId;
    }

    execute(dispatch, getState) {
        const currState = getState();
        const token = AuthModule.selectors.rawJwtSelector(currState);

        dispatch({
            type: actions.ATTEMPT_VALIDATE,
            localId: this.localId,
            publicationId: this.publicationId,
        });

        if (this.publicationId.length > 0 && this.publicationId !== '0') {
            this.request = validatePublication(this.publicationId, token, (err, data) => {
                if(err) {
                    if(err.error === 'NOT_FOUND') {
                        return dispatch(validatePublicationFail(this.localId, "Publication Not Found"));
                    }
                    return dispatch(validatePublicationFail(this.localId, "Error Validating Publication"));
                }
                return dispatch(validatePublicationSuccess(this.localId, this.publicationId, data));
            });
        } else {
            return dispatch(validatePublicationFail(this.localId, "Publication ID is empty"));
        }
    }
}

function validatePublicationSuccess(localId, publicationId, data) {
    return {
        type: actions.VALIDATE_SUCCESS,
        localId,
        publicationId,
        data,
    };
}

function validatePublicationFail(localId, error) {
    return {
        type: actions.VALIDATE_FAIL,
        localId,
        error,
    };
}
