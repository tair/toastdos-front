import React from 'react';

class CurationDetailView extends React.Component {
    render() {
        return (
            <div>
                <h2>Detail View for submission: 
                {" " + this.props.routeParams.submissionId}</h2>
            </div>
        );
    }
}

CurationDetailView.propTypes = {
    routeParams: React.PropTypes.shape({
        submission_id: React.PropTypes.string
    }).isRequired,
};


export default CurationDetailView;
