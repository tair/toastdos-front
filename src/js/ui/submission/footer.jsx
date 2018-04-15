"use strict";

import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'reactstrap';

class SubmissionFooter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            this.props.previewing ?
            (
                !this.props.submitted ?
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
                :
                <Row>
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
                    {this.props.canSubmit ?
                        <Button color="success"
                            className="btn-submit"
                            onClick={this.props.preview}>
                            Review Submission <span className="fa fa-chevron-right"></span>
                        </Button>
                    :
                        <Button color="warning"
                            onClick={this.props.reviewValidatedFields}>
                            Review Submission <span className="fa fa-chevron-right"></span>
                        </Button>
                    }
                    </Col>
                </Row>
            )
        );
    }
}

SubmissionFooter.propTypes = {
    previewing: PropTypes.bool,
    submitted: PropTypes.bool,
    canSubmit: PropTypes.bool,

    submit: PropTypes.func,
    preview: PropTypes.func,
    edit: PropTypes.func,
    resetSubmission: PropTypes.func,
    reviewValidatedFields: PropTypes.func,
};

SubmissionFooter.defaultProps = {
    previewing: false,
    submitted: false,
    canSubmit: false,

    submit: () => {},
    preview: () => {},
    edit: () => {},
    resetSubmission: () => {},
    reviewValidatedFields: () => {},
};

export default SubmissionFooter;
