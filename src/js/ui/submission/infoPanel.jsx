"use strict";

import React from 'react';
import { Alert } from 'reactstrap';

class SubmissionInfoPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            ( this.props.errorMessage ?
                <Alert color="danger"  className="mb-3">
                    <span className="fa fa-cross" /> <strong>Submission Error: </strong>
                    {this.props.errorMessage}
                </Alert>
            :
                ( this.props.submitting ?
                    <Alert className="mb-3">
                        <span className="fa fa-refresh fa-spin" /> Submitting...
                    </Alert>
                :
                    ( this.props.submitted ?
                        <Alert color="success"  className="mb-3">
                            <span className="fa fa-check" /> Submitted!
                        </Alert>
                    : null )
                )
            )
        );
    }
}

SubmissionInfoPanel.propTypes = {
    submitting: React.PropTypes.bool,
    submitted: React.PropTypes.bool,
    errorMessage: React.PropTypes.string,
};

SubmissionInfoPanel.defaultProps = {
    submitting: false,
    submitted: false,
    errorMessage: '',
};

export default SubmissionInfoPanel;