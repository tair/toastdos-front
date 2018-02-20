"use strict";

import * as actions from './actionTypes';

const defaultState = {
    loadingExportsList: false,
    exportsListLoadError: null,
    exportsList: []
};


export default function (state = defaultState, action) {
    switch (action.type) {
    case actions.REQUEST_EXPORTS_LIST:
        return Object.assign({}, state, {
            loadingExportsList: true,
            exportsListLoadError: null,
        });
    case actions.SUCCESS_EXPORTS_LIST:
        return Object.assign({}, state, {
            loadingExportsList: false,
            exportsList: action.data,
        });
    case actions.FAIL_EXPORTS_LIST:
        return Object.assign({}, state, {
            loadingExportsList: false,
            exportsListLoadError: action.error,
        });
    default:
        return state;
    }
}
