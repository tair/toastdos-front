import * as actions from './actionTypes';

const defaultState = {
    loadingSubmissionList: false,
    submissionList: [],
    submissionListLoadError: null,
};


export default function (state = defaultState, action) {
    switch (action.type) {
    case actions.REQUEST_SUBMISSION_LIST:
        return Object.assign({}, state, {
            loadingSubmissionList: true,
            submissionListLoadError: null,
        });
    case actions.SUCCESS_SUBMISSION_LIST:
        return Object.assign({}, state, {
            loadingSubmissionList: false,
            submissionList: action.submissions,
            submissionListLoadError: null,
        });
    case actions.FAIL_SUBMISSION_LIST:
        return Object.assign({}, state, {
            loadingSubmissionList: false,
            submissionListLoadError: action.error,
        });
    default:
        return state;
    }
}
