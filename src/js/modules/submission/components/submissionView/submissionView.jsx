"use strict";

import React from 'react';
import PublicationField from '../publicationField';
import GeneList from '../geneList';
import AnnotationList from '../annotationList';
import {Card, CardImg, CardText, CardHeader,
    CardBody, CardTitle, CardSubtitle, Button,
    Container, Row, Col} from 'reactstrap';

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
                    <Button color="primary"
                        onClick={this.props.resetSubmission}
                    >
                    Back
                    </Button>
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
            <Row className="justify-content-md-center">
                <Col
                    className="col-md-8 col-offset-4 submission-view-container"
                >
                    {this.props.errorMessage ? errorMessage : null}
                    <Card className="submission-view">
                        {this.props.submitting ? submittingPanel :
                            (this.props.submitted ? submittedPanel : null)
                        }

                        <CardHeader>
                            <h1>New Annotation Submission</h1>
                        </CardHeader>
                        <CardBody className="submission-form-container">
                            <PublicationField/>
                            <GeneList/>
                            <AnnotationList/>
                            <Row>
                                <Col>
                                    <Button color="danger"
                                        onClick={this.props.resetSubmission}
                                    >
                                        Reset Form
                                    </Button>
                                </Col>
                                <Col>
                                    <Button color="success" size="lg"
                                        className="btn-submit"
                                        onClick={this.props.submit}
                                        disabled={!this.props.canSubmit}
                                    >
                                        Submit Annotations
                                    </Button>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
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
