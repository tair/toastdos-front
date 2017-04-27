import * as actions from './actionTypes';
import * as api from 'lib/api';
import AuthModule from 'modules/authentication';

function failSubmissionList(error) {
    return {
        type: actions.FAIL_SUBMISSION_LIST,
        error,
    };
}

function successSubmissionList(submissions) {
    return {
        type: actions.SUCCESS_SUBMISSION_LIST,
        submissions,
    };
}

export function requestSubmissionList(page = 1, limit = 20) {
    return (dispatch, getState) => {

        const state = getState();
        const jwt = AuthModule.selectors.rawJwtSelector(state);

        dispatch({
            type: actions.REQUEST_SUBMISSION_LIST,
        });

        return api.listSubmissions(page, limit, jwt, (err, data) => {
            if(err) {
                return dispatch(failSubmissionList(err));
            }
            return dispatch(successSubmissionList(data));
        });
    };
}
