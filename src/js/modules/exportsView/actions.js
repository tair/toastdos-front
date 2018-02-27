"use strict";

import * as api from 'lib/api';
import * as actions from './actionTypes';

function failExportsList(error) {
    return {
        type: actions.FAIL_EXPORTS_LIST,
        error,
    };
}

function successExportsList(data) {
    return {
        type: actions.SUCCESS_EXPORTS_LIST,
        data,
    };
}

export function requestExportsList() {
    return dispatch => {

        dispatch({
            type: actions.REQUEST_EXPORTS_LIST,
        });

        return api.listExports((err, data) => {
            if (err) {
                return dispatch(failExportsList(err));
            }
            return dispatch(successExportsList(data));
        });
    };
}
