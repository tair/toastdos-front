"use strict";

import AuthModule from 'modules/authentication';
import { validateGene } from 'lib/api';
import * as actions from './actionTypes';
import { AsyncAction } from 'lib/asyncActionManager';
import generateId from 'lib/idGenerator';

export function attemptValidateEvidenceWith(evidenceWithId, locusName) {
    return new AttemptValidateEvidenceWithAsync(evidenceWithId, locusName);
}

export class AttemptValidateEvidenceWithAsync extends AsyncAction {
    constructor(evidenceWithId, locusName) {
        super(actions.ATTEMPT_VALIDATE + evidenceWithId);
        this.evidenceWithId = evidenceWithId;
        this.locusName = locusName;
    }

    execute(dispatch, getState) {
        const currState = getState();
        const token = AuthModule.selectors.rawJwtSelector(currState);

        dispatch({
            type: actions.ATTEMPT_VALIDATE,
            evidenceWithId: this.evidenceWithId,
        });

        if (this.locusName.length > 0) {
            this.request = validateGene(this.locusName, token, (err, data) => {
                if(err) {
                    if(err.error === 'NOT_FOUND') {
                        return dispatch(validateEvidenceWithFail(this.evidenceWithId, "Locus Not Found"));
                    }
                    return dispatch(validateEvidenceWithFail(this.evidenceWithId, "Error Validating Locus"));
                }
                return dispatch(validateEvidenceWithSuccess(this.evidenceWithId, this.locusName));
            });
        } else {
            return dispatch(validateEvidenceWithFail(this.evidenceWithId, "Field is empty"));
        }
    }
}

function validateEvidenceWithFail(evidenceWithId, error) {
    return {
        type: actions.VALIDATE_FAIL,
        error,
        evidenceWithId
    };
}

function validateEvidenceWithSuccess(evidenceWithId, locusName) {
    return {
        type: actions.VALIDATE_SUCCESS,
        evidenceWithId,
        locusName
    };
}

export function addNew() {
    return {
        type: actions.ADD,
        evidenceWithId: "" + generateId(),
    };
}

export function remove(evidenceWithId) {
    return {
        type: actions.REMOVE,
        evidenceWithId,
    };
}

export function removeMultiple(localIds) {
    return {
        type: actions.REMOVE_MULTIPLE,
        localIds,
    };
}

export function updateEvidenceWith(evidenceWithId, data) {
    return {
        type: actions.UPDATE,
        evidenceWithId,
        data,
    };
}

export function clearEvidenceWith(evidenceWithId) {
    return {
        type: actions.CLEAR,
        evidenceWithId: evidenceWithId
    };
}
