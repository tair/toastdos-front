"use strict";

import React from 'react';
import PropTypes from 'prop-types';
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
    idValue: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    title: PropTypes.string,
};

PublicationFieldReadOnly.defaultProps = {
    idValue: "",
    author: '',
    url: '',
    title: '',
};

export default PublicationFieldReadOnly;
