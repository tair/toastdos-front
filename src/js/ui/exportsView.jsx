"use strict";

import React from 'react';
import {Container, Row, Col, Card, CardHeader, CardBody, ListGroup, ListGroupItem} from 'reactstrap';
import config from '../../../config';

class ExportsView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
        this.renderExportList = this.renderExportList.bind(this);
    }

    componentDidMount() {
        this.props.loadExports();
    }

    renderExportItem(item, i) {
        return (
            <ListGroupItem tag="a" target="_blank" href={`${config.apiBase}/api/exports/files/${item}`} key={i} download>
                {item}
            </ListGroupItem>
        );
    }

    renderExportList() {
        return (
            <ListGroup className="list-group-flush">
                {this.props.exportsList.map(this.renderExportItem)}
            </ListGroup>
        );
    }

    renderLoading() {
        return (
            <div className="text-center py-3">
                <span className="fa fa-spin fa-refresh fa-3x" />
            </div>
        );
    }

    render() {
        return (
            <Container fluid className="mt-3">
                <Row className="justify-content-md-center">
                    <Col md="10">
                        <Card className="submission-view">
                            <CardHeader>
                                <span className="fa fa-file" /> Exports
                            </CardHeader>
                            <CardBody className="p-0">
                                {this.props.loadingExportsList ? this.renderLoading():
                                    this.renderExportList()}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

ExportsView.propTypes = {
    loadExports: React.PropTypes.func,
    exportsList: React.PropTypes.arrayOf(React.PropTypes.string),
    loadingExportsList: React.PropTypes.bool,
};

ExportsView.defaultProps = {
    loadExports: () => {},
    exportsList: [],
    loadingExportsList: true
};

export default ExportsView;
