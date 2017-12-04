"use strict";

import React from 'react';
import { Row, Col } from 'reactstrap';

class PublicationFieldReadOnly extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Row>
                <Col sm="3">
                    <h5>Publication ID</h5>
                </Col>
                <Col>
                    <em>{this.props.idValue}</em>
                </Col>
            </Row>
        );
    }
}

PublicationFieldReadOnly.propTypes = {
    idValue: React.PropTypes.string,
    author: React.PropTypes.string,
    url: React.PropTypes.string,
    title: React.PropTypes.string,
};

PublicationFieldReadOnly.defaultProps = {
    idValue: "",
    author: '',
    url: '',
    title: '',
};

export default PublicationFieldReadOnly;
