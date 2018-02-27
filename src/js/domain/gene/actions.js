"use strict";

import AuthModule from 'modules/authentication';
import { validateGene } from 'lib/api';
import { AsyncAction } from 'lib/asyncActionManager';
import generateId from 'lib/idGenerator';
import * as actions from './actionTypes';
import { geneSelector } from './selectors';

export function addNew(localId) {
    return {
        type: actions.ADD_NEW,
        localId: localId ? localId : "" + generateId(),
    };
}

export function removeGene(localId) {
    return {
        type: actions.REMOVE_GENE,
        localId: localId
    };
}

export function removeGenes(localIds) {
    return {
        type: actions.REMOVE_GENES,
        localIds,
    };
}

export function clearGene(geneId) {
    return {
        type: actions.CLEAR_GENE,
        geneId: geneId
    };
}

export function attemptValidateGene(localId, locusName, geneOrder, annotationOrder, addAnnotation) {
    return new AttemptValidateGeneAsync(localId, locusName, geneOrder, annotationOrder, addAnnotation);
}

export class AttemptValidateGeneAsync extends AsyncAction {
    constructor(localId, locusName, geneOrder, annotationOrder, addAnnotation = () => {}) {
        super(actions.ATTEMPT_VALIDATE_GENE + localId);
        this.localId = localId;
        this.locusName = locusName;

        this.geneOrder = geneOrder;
        this.annotationOrder = annotationOrder;
        this.addAnnotation = addAnnotation;
    }

    execute (dispatch, getState) {
        const currState = getState();
        const token = AuthModule.selectors.rawJwtSelector(currState);

        dispatch({
            type: actions.ATTEMPT_VALIDATE_GENE,
            localId: this.localId
        });

        // make sure we didn't already add the gene
        if (this.geneOrder) {
            let alreadyAdded = this.geneOrder.find( (gi) => {
                return (`${gi}` !== `${this.localId}`)  &&
                    (geneSelector(currState, gi).finalizedLocusName === this.locusName);
            });

            if (alreadyAdded !== undefined) {
                return dispatch(validateGeneFail(this.localId, 'Locus already added'));
            }
        }

        if (this.locusName.length > 0) {
            this.request = validateGene(this.locusName, token, err => {
                if(err) {
                    if(err.error === 'NOT_FOUND') {
                        return dispatch(validateGeneFail(this.localId, "Locus Not Found"));
                    }
                    return dispatch(validateGeneFail(this.localId, "Error Validating Locus"));
                }
                // automatically add an annotation if there are none
                if (this.annotationOrder && this.annotationOrder.length == 0) {
                    this.addAnnotation();
                }
                return dispatch(validateGeneSuccess(this.localId, this.locusName));
            });
        } else {
            return dispatch(validateGeneFail(this.localId, "Field is empty"));
        }
    }
}

function validateGeneSuccess(localId, locusName) {
    return {
        type: actions.VALIDATE_GENE_SUCCESS,
        localId: localId,
        locusName
    };
}

function validateGeneFail(localId, error) {
    return {
        type: actions.VALIDATE_GENE_FAIL,
        localId: localId,
        error: error
    };
}

export function updateGeneData(localId, geneData) {
    return {
        type: actions.UPDATE_GENE_DATA,
        localId,
        geneData
    };
}
