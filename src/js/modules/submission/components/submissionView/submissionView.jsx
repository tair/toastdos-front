"use strict";

import React from 'react';
import PublicationField from '../publicationField';
import GeneList from '../geneList';
import AnnotationList from '../annotationList';
import SubmissionReadOnly from '../submissionReadOnly';
import {Alert, Card, CardImg, CardText, CardHeader,
    CardBody, CardTitle, CardSubtitle, Button,
    ListGroup, ListGroupItem, ListGroupItemHeading,
    Form, FormGroup, Label, Input,
    ListGroupItemText, Container, Row, Col} from 'reactstrap';

import 'css/submissionView.scss';

class SubmissionView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const submittingPanel = (
            <Alert className="mb-3">
                <span className="fa fa-refresh fa-spin" /> Submitting...
            </Alert>
        );

        const submittedPanel = (
            <Alert color="success"  className="mb-3">
                <span className="fa fa-check" /> Submitted! 
                <Button size="sm" color="green" className="ml-2" style={{verticalAlign: "inherit"}}
                    onClick={this.props.resetSubmission}>
                    Create New Submission
                </Button>
            </Alert>
        );

        const errorMessage = (
            <Alert color="danger"  className="mb-3">
                <span className="fa fa-cross" /> <strong>Submission Error: </strong>
                {this.props.errorMessage}
            </Alert>
        );

        return (
            <Container fluid className="mt-3">
                <Row className="justify-content-md-center">
                    <Col
                        className="col-md-10 col-offset-4 submission-view-container"
                    >
                        {this.props.errorMessage ? errorMessage : null}
                        {this.props.submitting ? submittingPanel :
                                (this.props.submitted ? submittedPanel : null)
                            }
                        <Card className="submission-view">
                        <CardHeader>
                            <h1>New Annotation Submission</h1>
                        </CardHeader>
                        {this.props.previewing ?
                        (<CardBody>
                            <SubmissionReadOnly />
                            {!this.props.submitted ? (<Row className="mt-3">
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
                            </Row>) : null}
                        </CardBody>):
                            (<Form className="submission-form-container">
                                <ListGroup>
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
                                                <Button color="success"
                                                    className="btn-submit"
                                                    onClick={this.props.preview}
                                                    disabled={!this.props.canSubmit}
                                                >
                                                    Review Submission <span className="fa fa-chevron-right"></span>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                </ListGroup>
                            </Form>)}
                        </Card>
                    </Col>
                </Row>
            </Container>
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
