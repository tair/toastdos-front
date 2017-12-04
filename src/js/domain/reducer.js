"use strict";

import { combineReducers } from 'redux';
import annotation from './annotation';
import commentAnnotation from './commentAnnotation';
import geneGeneAnnotation from './geneGeneAnnotation';
import geneTermAnnotation from './geneTermAnnotation';
import evidenceWith from './evidenceWith';
import gene from './gene';
import keyword from './keyword';
import publication from './publication';

const defaultState = {};

export default function (state = defaultState, action) {
    return combineReducers({
        [annotation.constants.name]: annotation.reducer,
        [commentAnnotation.constants.name]: commentAnnotation.reducer,
        [geneGeneAnnotation.constants.name]: geneGeneAnnotation.reducer,
        [geneTermAnnotation.constants.name]: geneTermAnnotation.reducer,
        [evidenceWith.constants.name]: evidenceWith.reducer,
        [gene.constants.name]: gene.reducer,
        [keyword.constants.name]: keyword.reducer,
        [publication.constants.name]: publication.reducer,
    })(state,action);
};
