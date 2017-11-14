import { connect } from 'react-redux';
import CurationDetailView from './curationDetailView';
import { requestSubmission } from '../../actions';

const ConnectedCurationDetailView = connect(
    () =>({}),
    dispatch => ({
        requestSubmission: (submissionId) => dispatch(requestSubmission(submissionId)),
    })
)(CurationDetailView);

export default ConnectedCurationDetailView;
