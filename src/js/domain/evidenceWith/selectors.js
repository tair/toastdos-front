"use strict";

import { createSelector } from 'reselect';
import { name } from './constants';
import { validationStates } from 'lib/validation';

export const evidenceWithSelector = (state, localId) => state.domain[name].byLocalId[localId];

export const evidenceWithValidSelector = createSelector(
    evidenceWithSelector,
    ew => (ew && ew.locusName && ew.locusName.trim() !== '' &&
        ew.validationState == validationStates.VALID)
);
