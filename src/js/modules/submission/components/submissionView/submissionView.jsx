"use strict";

import React from 'react';
import PublicationField from '../publicationField';
import GeneList from '../geneList';
import AnnotationList from '../annotationList';

import 'css/submissionView.scss';

class SubmissionView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const submittingPanel = (
            <div className="submit-panel">
                <div className="submit-content">
                   <span>Submitting...</span> 
                </div>
            </div>
        );

        const submittedPanel = (
            <div className="submit-panel">
                <div className="submit-content">
                    <span>Submitted!</span> 
                    <button
                        className="btn btn-primary"
                        onClick={this.props.resetSubmission}
                    >
                    Back
                    </button>
                </div>
            </div>
        );


        const errorMessage = (
            <div className="error-box-container">
                <div className="error-box">
                    <strong>Submission Error: </strong>
                    <span>{this.props.errorMessage}</span>
                </div>
            </div>
        );

        return (
            <div
                className="submission-view-container"
            >
                {this.props.errorMessage ? errorMessage : null}
                <div className="submission-view">
                    {this.props.submitting ? submittingPanel :
                        (this.props.submitted ? submittedPanel : null)
                    }
                    <h1>New Annotation Submission</h1>
                    <div className="submission-navigator-container">
                        <div className="submission-navigator">
                            {/* todo submission navigator wlil go here */}
                        </div>
                    </div>
                    <div className="submission-form-container">
                        <button
                            className="btn btn-secondary"
                            onClick={this.props.resetSubmission}
                        >
                            Reset Form
                        </button>
                        <PublicationField />
                        <GeneList />
                        <AnnotationList />
                        <button
                            className="btn btn-primary btn-lg btn-submit"
                            onClick={this.props.submit}
                            disabled={!this.props.canSubmit}
                        >
                            Submit Annotations
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

SubmissionView.propTypes = {
    submit: React.PropTypes.func,
    resetSubmission: React.PropTypes.func,
    submitting: React.PropTypes.bool,
    submitted: React.PropTypes.bool,
    canSubmit: React.PropTypes.bool,
    errorMessage: React.PropTypes.string,
};

SubmissionView.defaultProps = {
    submit: () => {}
};

export default SubmissionView;
