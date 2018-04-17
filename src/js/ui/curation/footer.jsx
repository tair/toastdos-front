"use strict";

import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'reactstrap';

class CurationFooter extends React.Component {
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
                            <span className="fa fa-save"></span> {
                                this.props.hasPendingAnnotations ?
                                    "Save In Progress Curation"
                                :
                                    "Finish Curating Submission"
                            }
                        </Button>
                    </Col>
                </Row>
                : null
            ) : (
                <Row>
                    <Col className="text-right align-self-center">
                    {this.props.canSubmit ?
                        <Button color="success"
                            className="btn-submit"
                            onClick={this.props.preview}>
                            Review Changes <span className="fa fa-chevron-right"></span>
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

CurationFooter.propTypes = {
    previewing: PropTypes.bool,
    submitted: PropTypes.bool,
    canSubmit: PropTypes.bool,
    hasPendingAnnotations: PropTypes.bool,

    submit: PropTypes.func,
    preview: PropTypes.func,
    edit: PropTypes.func,
    resetSubmission: PropTypes.func,
    reviewValidatedFields: PropTypes.func,
};

CurationFooter.defaultProps = {
    previewing: false,
    submitted: false,
    canSubmit: false,
    hasPendingAnnotations: false,

    submit: () => {},
    preview: () => {},
    edit: () => {},
    resetSubmission: () => {},
    reviewValidatedFields: () => {},
};

export default CurationFooter;
