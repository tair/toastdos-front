import React from 'react';
import submissionModule from 'modules/submission';

let SubmissionView = submissionModule.components.SubmissionView;

class CurationDetailView extends React.Component {

    componentWillMount() {
        this.props.requestSubmission(this.props.routeParams.submissionId);
    }

    render() {
        return (
            <SubmissionView curation={true} />
        );
    }
}

CurationDetailView.propTypes = {
    routeParams: React.PropTypes.shape({
        submissionId: React.PropTypes.string
    }).isRequired,
    requestSubmission: React.PropTypes.func,
};


export default CurationDetailView;
