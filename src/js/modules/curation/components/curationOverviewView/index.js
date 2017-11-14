import { connect } from 'react-redux';
import CurationOverviewView from './curationOverviewView';
import { createStructuredSelector } from 'reselect';
import {
  loadingSubmissionList,
  submissionInProgressList,
  submissionNeedsReviewList,
  submissionReviewedList,
  totalPages,
  pageSize,
  currPage
} from '../../selectors';

import {
    requestSubmissionList
} from '../../actions';

const ConnectedCurationOverviewView = connect(
    createStructuredSelector({
        loading: loadingSubmissionList,
        inProgressSubmissions: submissionInProgressList,
        needsReviewSubmissions: submissionNeedsReviewList,
        reviewedSubmissions: submissionReviewedList,
        totalPages,
        pageSize,
        currPage
    }),
    dispatch => ({
        loadSubmissions: (page, pageSize, sortBy, sortDir) => dispatch(requestSubmissionList(page, pageSize, sortBy, sortDir)),
    })
)(CurationOverviewView);

export default ConnectedCurationOverviewView;
