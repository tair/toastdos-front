import { connect } from 'react-redux';
import CurationOverviewView from './curationOverviewView';
import { createStructuredSelector } from 'reselect';
import {
  loadingSubmissionList,
  submissionList
} from '../../selectors';

import {
    requestSubmissionList
} from '../../actions';

const ConnectedCurationOverviewView = connect(
    createStructuredSelector({
        loading: loadingSubmissionList,
        submissions: submissionList,
    }),
    dispatch => ({
        loadSubmissions: (page, pageSize) => dispatch(requestSubmissionList(page, pageSize)),
    })
)(CurationOverviewView);

export default ConnectedCurationOverviewView;
