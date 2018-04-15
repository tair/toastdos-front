"use strict";

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Alert, Progress, ListGroup, ListGroupItem, Row, Col } from 'reactstrap';
import UserOrcidLink from 'ui/userOrcidLink';

class SubmissionList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadSubmissions(1, 10);
    }

    renderSubmission(submission) {
        let completed = (submission.pending == 0);
        return (
            <ListGroupItem key={`lgi-sub-${submission.id}`}>
                <Row className="align-items-center d-flex">
                    <Col xs="5">
                        <Row>
                            <Col sm="auto">
                                Publication ID:
                                <br />
                                Submitted:
                            </Col>
                            <Col sm="auto" className="mr-auto text-sm-left text-nowrap font-italic">
                                {submission.document}
                                <br/>
                                {`${new Date(submission.submission_date).toLocaleString()}`}
                            </Col>
                        </Row>
                    </Col>
                    <Col sm="auto">
                        <UserOrcidLink user={submission.submitter} />
                    </Col>
                    <Col sm="auto" className="ml-auto">
                        <div className="text-center">{submission.total - submission.pending}/{submission.total} Annotations Reviewed</div>
                        <Progress striped
                            color={completed ? "success" : "info"}
                            value={submission.total - submission.pending} max={submission.total} />
                    </Col>
                    <Col sm="auto" className="text-right">
                        <Link to={`/curation/detail/${submission.id}`} className={completed ? "btn btn-info" : "btn btn-warning"}>
                            <span className={`fa ${completed ? "fa-file-text-o" : "fa-edit"}`}></span> {completed ? "View" : "Review"}
                        </Link>
                    </Col>
                </Row>
            </ListGroupItem>
        );
    }

    render() {
        return (
            <ListGroup>
                {this.props.inProgressSubmissions.length > 0 ?
                <ListGroupItem className="pt-3 pb-4 border-0 border-right-0 border-top-0">
                    <h4>In Progress</h4>
                    <ListGroup className="mt-3">
                    {this.props.inProgressSubmissions.map(val => this.renderSubmission(val))}
                    </ListGroup>
                </ListGroupItem>
                : null}
                <ListGroupItem className="pt-3 pb-4 border-0 border-right-0">
                    <h4>Needs Review</h4>
                    <ListGroup className="mt-3">
                    {this.props.needsReviewSubmissions.length > 0 ?
                        this.props.needsReviewSubmissions.map(val => this.renderSubmission(val))
                    :
                    <Alert color="secondary">
                        <span className="fa fa-info-circle" /> No submissions need review.
                    </Alert>}
                    </ListGroup>
                </ListGroupItem>
                <ListGroupItem className="pt-3 pb-4 border-0 border-right-0 border-bottom-0">
                    <h4>Reviewed</h4>
                    <ListGroup className="mt-3">
                    {this.props.reviewedSubmissions.length > 0 ?
                        this.props.reviewedSubmissions.map(val => this.renderSubmission(val))
                    :
                    <Alert color="secondary">
                        <span className="fa fa-info-circle" /> No reviewed submissions.
                    </Alert>}
                    </ListGroup>
                </ListGroupItem>
            </ListGroup>
        );
    }
}

SubmissionList.propTypes = {
    inProgressSubmissions: PropTypes.arrayOf(PropTypes.object),
    needsReviewSubmissions: PropTypes.arrayOf(PropTypes.object),
    reviewedSubmissions: PropTypes.arrayOf(PropTypes.object),
    loadSubmissions: PropTypes.func,
    // todo handle pagination
    totalPages: PropTypes.number,
    pageSize: PropTypes.number,
    currentPage: PropTypes.number,
};

SubmissionList.defaultProps = {
    // def default props...
};

export default SubmissionList;
