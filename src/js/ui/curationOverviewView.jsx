"use strict";

import React from 'react';
import PropTypes from 'prop-types';
import {Container, Row, Col, Card, CardHeader, CardBody} from 'reactstrap';
import "css/curationView.scss";
import SubmissionList from 'ui/submissionList';

class CurationOverviewView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <Container fluid className="mt-3">
                <Row className="justify-content-md-center">
                    <Col md="10">
                        <Card className="page-card">
                            <CardHeader>
                                <span className="fa fa-filter" /> Submissions for Curation
                            </CardHeader>
                            <CardBody className="p-0">
                                <SubmissionList
                                    inProgressSubmissions={this.props.inProgressSubmissions}
                                    needsReviewSubmissions={this.props.needsReviewSubmissions}
                                    reviewedSubmissions={this.props.reviewedSubmissions}
                                    loadSubmissions={this.props.loadSubmissions}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

CurationOverviewView.propTypes = {
    loading: PropTypes.bool.isRequired,
    loadSubmissions: PropTypes.func,
    inProgressSubmissions: PropTypes.arrayOf(PropTypes.object),
    needsReviewSubmissions: PropTypes.arrayOf(PropTypes.object),
    reviewedSubmissions: PropTypes.arrayOf(PropTypes.object),
    totaPages: PropTypes.number,
    pageSize: PropTypes.number,
    currPage: PropTypes.number
};

CurationOverviewView.defaultProps = {
    loadSubmissions: () => {}
};

export default CurationOverviewView;
