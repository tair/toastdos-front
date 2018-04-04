"use strict";

import { createSelector } from 'reselect';
import { name } from './constants';
import { evidenceWithValidSelector } from 'domain/evidenceWith/selectors';

export const geneTermAnnotationSelector =
    (state, localId) => state.domain[name].byLocalId[localId];

export const geneTermAnnotationListSelector = (state, annotations) =>
    annotations.map(localId => geneTermAnnotationSelector(state, localId));

export const needsEvidenceWithSelector = createSelector(
    geneTermAnnotationSelector,
    gta => (gta && ['IPI','IGI'].indexOf(gta.methodEvidenceCode) != -1)
);

export const allEvidenceWithValidSelector = createSelector(
    state => state,
    geneTermAnnotationSelector,
    (state, gta) => (gta && gta.evidenceWithOrder &&
        !gta.evidenceWithOrder.find(
            localId => !evidenceWithValidSelector(state, localId)
        ))
);

export const keywordValidSelector = createSelector(
    geneTermAnnotationSelector,
    gta => !!(gta && gta.keywordName && gta.keywordName.trim() !== '')
);

export const keywordValidIdSelector = createSelector(
    geneTermAnnotationSelector,
    keywordValidSelector,
    (gta, kwv) => !!(gta && kwv && gta.keywordExternalId &&
        gta.keywordExternalId.trim() !== '')
);

export const methodValidSelector = createSelector(
    geneTermAnnotationSelector,
    gta => !!(gta.methodName && gta.methodName.trim() !== '')
);

export const methodValidIdSelector = createSelector(
    geneTermAnnotationSelector,
    methodValidSelector,
    (gta, mv) => !!(gta && mv && gta.methodExternalId &&
        gta.methodExternalId.trim() !== '')
);

export const geneTermAnnotationValidSelector = createSelector(
    geneTermAnnotationSelector,
    keywordValidSelector,
    methodValidSelector,
    allEvidenceWithValidSelector,
    (gta, kwv, mv, allEWValid) => (
        gta && kwv && mv && allEWValid
    )
);

export const geneTermAnnotationValidIdSelector = createSelector(
    geneTermAnnotationSelector,
    keywordValidIdSelector,
    methodValidIdSelector,
    allEvidenceWithValidSelector,
    (gta, kwv, mv, allEWValid) => (
        gta && kwv && mv && allEWValid
    )
);

export const evidenceWithRelationSelector = createSelector(
    geneTermAnnotationSelector,
    gta => gta.evidenceWithRelation
);
