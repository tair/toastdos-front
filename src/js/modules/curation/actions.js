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

export function requestSubmissionList() {
    return (dispatch, getState) => {

        const state = getState();
        const jwt = AuthModule.selectors.rawJwtSelector(state);

        dispatch({
            type: actions.REQUEST_SUBMISSION_LIST,
        });

        return api.listSubmissions(null, 200, jwt, (err, data) => {
            if(err) {
                return dispatch(failSubmissionList(err));
            }
            return dispatch(successSubmissionList(data));
        });
    };
}
