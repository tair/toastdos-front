import React from 'react';
import "css/curationView.scss";

import SearchFilter from './subcomponents/searchFilter';
import SubmissionList from './subcomponents/submissionList';

import {Container, Row, Col, Card, CardHeader, CardBody} from 'reactstrap';



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
                        <Card className="submission-view">
                            <CardHeader>
                                <span className="fa fa-filter" /> Curation
                            </CardHeader>
                            <CardBody className="p-0">
                                <SubmissionList
                                    submissions={this.props.submissions}
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
    loading: React.PropTypes.bool.isRequired,
    loadSubmissions: React.PropTypes.func,
    submissions: React.PropTypes.arrayOf(React.PropTypes.object),
    totaPages: React.PropTypes.number,
    pageSize: React.PropTypes.number,
    currPage: React.PropTypes.number
};

CurationOverviewView.defaultProps = {
    loadSubmissions: () => {}
};

export default CurationOverviewView;
