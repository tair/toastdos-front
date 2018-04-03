"use strict";

import { createSelector } from 'reselect';
import { name } from './constants';

export const geneGeneAnnotationSelector =
    (state, localId) => state.domain[name].byLocalId[localId];

export const geneGeneAnnotationValidSelector = createSelector(
    geneGeneAnnotationSelector,
    gga => !!(gga && gga.methodName && gga.methodName.trim() !== '')
);

export const geneGeneAnnotationValidIdSelector = createSelector(
    geneGeneAnnotationSelector,
    geneGeneAnnotationValidSelector,
    (gga, ggav) => !!(gga && ggav && gga.methodExternalId &&
        gga.methodExternalId.trim() !== '')
);
