"use strict";

import { createSelector } from 'reselect';
import { name } from './constants';
import { validationStates } from 'lib/validation';
import { evidenceWithValidSelector } from 'domain/evidenceWith/selectors';

export const geneTermAnnotationSelector =
    (state, localId) => state.domain[name].byLocalId[localId];

export const geneTermAnnotationListSelector = (state, annotations) =>
    annotations.map(localId => geneTermAnnotationSelector(state, localId));

export const needsEvidenceWithSelector = createSelector(
    geneTermAnnotationSelector,
    gta => (gta && ['IPI','IGI'].indexOf(gta.methodEvidenceCode.trim()) != -1)
);

export const allEvidenceWithValidSelector = createSelector(
    state => state,
    geneTermAnnotationSelector,
    (state, gta) => (gta && gta.evidenceWithOrder &&
        !gta.evidenceWithOrder.find(
            localId => !evidenceWithValidSelector(state, localId)
        ))
);

export const geneTermAnnotationValidSelector = createSelector(
    geneTermAnnotationSelector,
    allEvidenceWithValidSelector,
    (gta, allEWValid) => (
        gta && gta.keywordName && gta.keywordName.trim() !== '' &&
        gta.methodName && gta.methodName.trim() !== '' &&
        allEWValid
    )
);
