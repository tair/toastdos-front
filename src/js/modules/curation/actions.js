import * as actions from './actionTypes';
import * as api from 'lib/api';
import AuthModule from 'modules/authentication';
import { loadSubmission } from 'modules/submission/actions';

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

export function requestSubmissionList(page = 1, limit = 20, sortBy = 'date', sortDir = 'desc') {
    return (dispatch, getState) => {

        const state = getState();
        const jwt = AuthModule.selectors.rawJwtSelector(state);

        dispatch({
            type: actions.REQUEST_SUBMISSION_LIST,
        });

        return api.listSubmissions(page, limit, sortBy, sortDir, jwt, (err, data) => {
            if(err) {
                return dispatch(failSubmissionList(err));
            }
            return dispatch(successSubmissionList(data));
        });
    };
}


function failSubmission(error) {
    return {
        type: actions.FAIL_SUBMISSION,
        error,
    };
}

export function requestSubmission(submissionId) {
    return (dispatch, getState) => {

        const state = getState();
        const jwt = AuthModule.selectors.rawJwtSelector(state);

        dispatch({
            type: actions.REQUEST_SUBMISSION,
        });

        return api.getSubmission(submissionId, jwt, (err, data) => {
            if(err) {
                return dispatch(failSubmission(err));
            }
            return dispatch(loadSubmission(data));
        });
    };
}
