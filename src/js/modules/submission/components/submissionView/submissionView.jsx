"use strict";

import React from 'react';
import PublicationField from '../publicationField';
import GeneList from '../geneList';
import AnnotationList from '../annotationList';
import SubmissionReadOnly from '../submissionReadOnly';
import {Alert, Card, CardImg, CardText, CardHeader,
    CardBody, CardFooter, CardTitle, CardSubtitle, Button,
    ListGroup, ListGroupItem, ListGroupItemHeading,
    Form, FormGroup, Label, Input,
    Nav, NavItem, NavLink,
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
            </Alert>
        );

        const errorMessage = (
            <Alert color="danger"  className="mb-3">
                <span className="fa fa-cross" /> <strong>Submission Error: </strong>
                {this.props.errorMessage}
            </Alert>
        );

        const showGenes = false;
        const showAnnotations = false;

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
                                <Row className="align-items-center" >
                                    <Col>
                                        <span className="fa fa-file-text" /> New Annotation Submission
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody className="p-0">
                                <Form className="submission-form-container">
                                {this.props.previewing ?
                                (
                                    <SubmissionReadOnly />
                                ):
                                (
                                    <ListGroup>
                                        <ListGroupItem className="border-left-0 border-right-0 border-top-0">
                                            <PublicationField/>
                                        </ListGroupItem>
                                        {this.props.publicationPresent ? <ListGroupItem className="border-left-0 border-right-0">
                                            <GeneList/>
                                        </ListGroupItem> : null}
                                        {this.props.publicationPresent && this.props.genesPresent ? <ListGroupItem className="border-left-0 border-right-0 border-bottom-0">
                                            <AnnotationList/>
                                        </ListGroupItem>  : null}
                                    </ListGroup>
                                )}
                                </Form>
                            </CardBody>
                            <CardFooter className="submissionFooter">
                            {this.props.previewing ?
                            (
                                !this.props.submitted ?
                                (
                                <Row>
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
                                ) : <Row>
                                        <Col className="text-center">
                                            <Button color="success"
                                                onClick={this.props.resetSubmission}>
                                                Start New Submission
                                            </Button>
                                        </Col>
                                    </Row>
                            ) : (
                                <Row>
                                    <Col sm="3">
                                        <Button color="danger"
                                            onClick={this.props.resetSubmission}
                                        >
                                            <span className="fa fa-trash" /> Reset Form
                                        </Button>
                                    </Col>
                                    <Col className="text-right align-self-center">
                                    {this.props.canSubmit ? (
                                        <Button color="success"
                                            className="btn-submit"
                                            onClick={this.props.preview}>
                                            Review Submission <span className="fa fa-chevron-right"></span>
                                        </Button>
                                    ) : (<div><span className="fa fa-info-circle" /> Please ensure you have at least a publication, 1 gene, and 1 annotation</div>)}
                                    </Col>
                                </Row>
                            )}
                            </CardFooter>
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
