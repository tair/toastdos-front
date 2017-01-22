"use strict";

import React from 'react';
import PublicationField from '../publicationField';
import GeneList from '../geneList';
import AnnotationList from '../annotationList';

const containerStyle = {
    padding: "17px"
};

class SubmissionView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const submittingPanel = (
            <div style={{
                top: 0,
                left: 0,
                position: "absolute",
                zIndex: 1000,
                width: "100%",
                height: "100%",
                margin: "0 auto",
                textAlign: "center",
                fontSize: "2.2em",
                backgroundColor: "#ffffff"
            }}>
               <span>Submitting...</span> 
            </div>
        );

        const submittedPanel = (
            <div style={{
                top: 0,
                left: 0,
                position: "absolute",
                zIndex: 1000,
                width: "100%",
                height: "100%",
                margin: "0 auto",
                textAlign: "center",
                fontSize: "2.2em",
                backgroundColor: "#ffffff"
            }}>
            <div>
                <span>Submitted!</span> 
            </div>  
            <button
                className="btn btn-primary"
                onClick={this.props.resetSubmission}
            >
                Back
            </button>
            </div>
        );

        return (
            <div style={containerStyle}>
                {this.props.submitting ? submittingPanel :
                    (this.props.submitted ? submittedPanel : null)
                }
                <h1>New Annotation Submission</h1>
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
                    className="btn btn-primary btn-lg"
                    onClick={this.props.submit}
                >
                    Review and Submit
                </button>
            </div>
        );
    }
}

SubmissionView.propTypes = {
    submit: React.PropTypes.func,
    resetSubmission: React.PropTypes.func,
    submitting: React.PropTypes.bool,
    submitted: React.PropTypes.bool
};

SubmissionView.defaultProps = {
    submit: () => {}
};

export default SubmissionView;
