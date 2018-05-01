"use strict";

import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardHeader, CardBody, CardFooter,
    Container, Row, Col} from 'reactstrap';
import 'css/submissionView.scss';

class SubmissionStructure extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container fluid className="mt-3">
                <Row className="justify-content-md-center">
                    <Col className="col-md-10 col-offset-4 page-card-container">
                        {this.props.infoPanel}
                        <Card className="page-card">
                            <CardHeader>
                                {this.props.header}
                            </CardHeader>
                            <CardBody className="p-0">
                                {this.props.children}
                            </CardBody>
                            <CardFooter className="submissionFooter">
                                {this.props.footer}
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

SubmissionStructure.propTypes = {
    infoPanel: PropTypes.any,
    header: PropTypes.any,
    footer: PropTypes.any,
};

SubmissionStructure.defaultProps = {
    infoPanel: null,
    header: null,
    footer: null,
};

export default SubmissionStructure;
