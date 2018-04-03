"use strict";

import React from 'react';
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
                        <div>
                            <span className="fa fa-info-circle" /> {
                                "Please ensure there is at least a publication, 1 gene, and 1 annotation"
                            }
                        </div>
                    }
                    </Col>
                </Row>
            )
        );
    }
}

CurationFooter.propTypes = {
    previewing: React.PropTypes.bool,
    submitted: React.PropTypes.bool,
    canSubmit: React.PropTypes.bool,
    hasPendingAnnotations: React.PropTypes.bool,

    submit: React.PropTypes.func,
    preview: React.PropTypes.func,
    edit: React.PropTypes.func,
    resetSubmission: React.PropTypes.func,
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
};

export default CurationFooter;
