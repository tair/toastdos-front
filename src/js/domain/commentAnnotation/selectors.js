"use strict";

import { createSelector } from 'reselect';
import { name } from './constants';

export const commentAnnotationSelector =
    (state, localId) => state.domain[name].byLocalId[localId];

export const commentAnnotationValidSelector = createSelector(
    commentAnnotationSelector,
    ca => (ca && ca.comment && ca.comment.trim() !== '')
);
