"use strict";

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CurationOverviewView from 'ui/curationOverviewView';
import {
  loadingSubmissionList,
  submissionInProgressList,
  submissionNeedsReviewList,
  submissionReviewedList,
  totalPages,
  pageSize,
  currPage
} from 'modules/curationOverview/selectors';
import {
    requestSubmissionList
} from 'modules/curationOverview/actions';

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
        loadSubmissions:
            (page, pageSize, sortBy, sortDir) =>
                dispatch(requestSubmissionList(page, pageSize, sortBy, sortDir)),
    })
)(CurationOverviewView);

export default ConnectedCurationOverviewView;
