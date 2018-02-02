"use strict";

import { createSelector } from 'reselect';
import { name } from './constants';

export const fetchingSuggestionsSelector = state => state.domain[name].searchingKeywords;

const keywordSearchResults = state => state.domain[name].keywordSearchResults;
export const keywordSearchIndexSelector = createSelector(
    keywordSearchResults,
    results => results.reduce((acc, cur) => {
        acc[cur.id + cur.synonym] = {
            name: cur.name,
            external_id: cur.external_id,
            synonym: cur.synonym,
            evidence_code: cur.evidence_code
        };
        return acc;
    }, {})
);

export const keywordSearchOrderSelector = createSelector(
    keywordSearchResults,
    results => results.map(v => v.id + v.synonym)
);
