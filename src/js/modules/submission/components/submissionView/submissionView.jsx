"use strict";

import React from 'react';
import PublicationField from '../publicationField';
import GeneList from '../geneList';
import AnnotationList from '../annotationList';
import SubmissionReadOnly from '../submissionReadOnly';
import {Card, CardImg, CardText, CardHeader,
    CardBody, CardTitle, CardSubtitle, Button,
    ListGroup, ListGroupItem, ListGroupItemHeading,
    ListGroupItemText, Container, Row, Col} from 'reactstrap';

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
                        {this.props.previewing ?
                        (<CardBody>
                            <SubmissionReadOnly />
                            <Row className="mt-3">
                                <Col>
                                    <Button color="warning"
                                        className="btn-submit"
                                        onClick={this.props.edit}
                                        disabled={!this.props.canSubmit}
                                    >
                                        <span className="fa fa-chevron-left"></span> Make Changes
                                    </Button>
                                </Col>
                                <Col className="text-right">
                                    <Button color="success"
                                        className="btn-submit"
                                        onClick={this.props.submit}
                                        disabled={!this.props.canSubmit}
                                    >
                                        <span className="fa fa-save"></span> Submit Annotations
                                    </Button>
                                </Col>
                            </Row>
                        </CardBody>):
                        (<ListGroup className="submission-form-container">
                            <ListGroupItem>
                                <PublicationField/>
                            </ListGroupItem>
                            <ListGroupItem>
                                <GeneList/>
                            </ListGroupItem>
                            <ListGroupItem>
                                <AnnotationList/>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>
                                        <Button color="danger"
                                            onClick={this.props.resetSubmission}
                                        >
                                            Reset Form
                                        </Button>
                                    </Col>
                                    <Col className="text-right">
                                        <Button color="success"// size="lg"
                                            className="btn-submit"
                                            onClick={this.props.preview}
                                            disabled={!this.props.canSubmit}
                                        >
                                            Review Submission <span className="fa fa-chevron-right"></span>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                        </ListGroup>)}
                    </Card>
                </Col>
            </Row>
        );
    }
}

SubmissionView.propTypes = {
    submit: React.PropTypes.func,
    preview: React.PropTypes.func,
    edit: React.PropTypes.func,
    resetSubmission: React.PropTypes.func,
    submitting: React.PropTypes.bool,
    submitted: React.PropTypes.bool,
    previewing: React.PropTypes.bool,
    canSubmit: React.PropTypes.bool,
    errorMessage: React.PropTypes.string,
};

SubmissionView.defaultProps = {
    submit: () => {},
    preview: () => {},
    edit: () => {},
};

export default SubmissionView;
