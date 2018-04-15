"use strict";

import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Label } from 'reactstrap';

class LabelInputRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Row className={"d-flex p-2 "+this.props.align}>
                <Col xs="3" className="text-right">
                    <Label className="mb-0">
                        {this.props.title}
                    </Label>
                </Col>
                <Col className="p-1">
                    {this.props.children}
                </Col>
            </Row>
        );
    }
}

LabelInputRow.propTypes = {
    title: PropTypes.string,
    align: PropTypes.string,
};

LabelInputRow.defaultProps = {
    title: '',
    align: 'align-items-center',
};

export default LabelInputRow;
