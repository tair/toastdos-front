"use strict";

import { createSelector } from 'reselect';
import { name } from './constants';
import { validationStates } from 'lib/validation';

export const publicationSelector =
    (state, localId) => state.domain[name].byLocalId[localId];

export const publicationValidSelector =
    (s, localId) => (
        localId != '' &&
        publicationSelector(s, localId) != undefined &&
        publicationSelector(s, localId).validationState === validationStates.VALID
    )
;
