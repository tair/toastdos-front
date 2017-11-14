import React from "react";
import { Link } from 'react-router';
import { Alert, Button, Progress, ListGroup, ListGroupItem, Container, Row, Col } from 'reactstrap';

class SubmissionList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            unreviewedSubmissions: [],
            reviewInProgressSubmissions: [],
            reviewedSubmissions: [],
        };
    }

    componentDidMount() {
        this.props.loadSubmissions(1, 10);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.submissions != this.props.submissions) {
            this.setState({
                unreviewedSubmissions: this.props.submissions
                    .filter((sub)=> sub.pending == sub.total),
                reviewInProgressSubmissions: this.props.submissions
                    .filter((sub)=> sub.pending != "0" && sub.pending < sub.total),
                reviewedSubmissions: this.props.submissions
                    .filter((sub)=> sub.pending == "0"),
            });
        }
    }

    renderSubmission(submission) {
        let completed = (submission.pending == 0);
        return (
            <ListGroupItem key={`lgi-sub-${submission.id}`}>
                <Row className="align-items-center d-flex">
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
                    <Col sm="auto" className="ml-auto">
                        <div className="text-center">{submission.total - submission.pending}/{submission.total} Annotations Reviewed</div>
                        <Progress striped
                            color={completed ? "success" : "info"}
                            value={submission.total - submission.pending} max={submission.total} />
                    </Col>
                    <Col sm="auto" className="text-right">
                        <Button color={completed ? "info" : "warning"}
                            href={`/curation/detail/${submission.id}`}>
                            <span className={`fa ${completed ? "fa-file-text-o" : "fa-edit"}`}></span> {completed ? "View" : "Review"}
                        </Button>
                    </Col>
                </Row>
            </ListGroupItem>
        );
    }

    render() {
        return (
            <ListGroup>
                {this.state.reviewInProgressSubmissions.length > 0 ?
                <ListGroupItem className="pt-3 pb-4 border-0 border-right-0 border-top-0">
                    <h4>In Progress</h4>
                    <ListGroup className="mt-3">
                    {this.state.reviewInProgressSubmissions.map((val,ind,arr) => this.renderSubmission(val))}
                    </ListGroup>
                </ListGroupItem>
                : null}
                <ListGroupItem className="pt-3 pb-4 border-0 border-right-0">
                    <h4>Needs Review</h4>
                    <ListGroup className="mt-3">
                    {this.state.unreviewedSubmissions.length > 0 ?
                        this.state.unreviewedSubmissions.map((val,ind,arr) => this.renderSubmission(val))
                    :
                    <Alert color="secondary">
                        <span className="fa fa-info-circle" /> No submissions need review.
                    </Alert>}
                    </ListGroup>
                </ListGroupItem>
                <ListGroupItem className="pt-3 pb-4 border-0 border-right-0 border-bottom-0">
                    <h4>Reviewed</h4>
                    <ListGroup className="mt-3">
                    {this.state.reviewedSubmissions.length > 0 ?
                        this.state.reviewedSubmissions.map((val,ind,arr) => this.renderSubmission(val))
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
    submissions: React.PropTypes.arrayOf(React.PropTypes.object),
    loadSubmissions: React.PropTypes.func,
    // todo handle pagination
    totalPages: React.PropTypes.number,
    pageSize: React.PropTypes.number,
    currentPage: React.PropTypes.number,
};

SubmissionList.defaultProps = {
    // def default props...
};

export default SubmissionList;
