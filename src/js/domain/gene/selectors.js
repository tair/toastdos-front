"use strict";

import { validationStates } from 'lib/validation';
import { name } from './constants';

export const geneSelector = (state, localId) => state.domain[name].byLocalId[localId];

export const geneFinalizedLocusNameSelector = (state, localId) =>
    geneSelector(state, localId) ?
        geneSelector(state, localId).finalizedLocusName : null;

export const geneValidSelector =
    (s, localId) => (
        localId != '' &&
        geneSelector(s, localId) != undefined &&
        geneSelector(s, localId).validationState == validationStates.VALID
    )
    ;

export const geneListSelector = (state, genes) =>
    genes.map(localId => geneSelector(state, localId));

export const geneValidListSelector = (state, genes) =>
    genes.filter(localId => geneValidSelector(state, localId))
        .map(localId => geneSelector(state, localId));
