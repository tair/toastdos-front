"use strict";

import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import 'css/submissionView.scss';
import PublicationFieldReadOnly from 'modules/connectedComponents/publication/fieldReadOnly';
import AnnotationListReadOnly from 'ui/annotation/listReadOnly';
import GeneListReadOnly from 'ui/gene/listReadOnly';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class SubmissionReadOnly extends React.Component {
    constructor(props) {
        super(props);

        this.state ={
            dropdownOpen: false,
            compact: true
        };
        this.toggleViewMode = this.toggleViewMode.bind(this);
    }

    toggleViewMode() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        return (
            <ListGroup>
                <ListGroupItem className="border-left-0 border-right-0 border-top-0">
                    <PublicationFieldReadOnly localId={this.props.publicationLocalId} />
                </ListGroupItem>
                <ListGroupItem className="border-left-0 border-right-0">
                    <Row className="mt-3">
                        <Col sm="3">
                            <h5>Genes</h5>
                        </Col>
                        <Col>
                            <GeneListReadOnly geneOrder={this.props.geneOrder} />
                        </Col>
                    </Row>
                </ListGroupItem>
                <ListGroupItem className="border-left-0 border-right-0 border-bottom-0">
                    <Row className="mt-3">
                        <Col sm="3">
                            <h5>Annotations</h5>
                            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleViewMode}>
                                <DropdownToggle caret color="success">
                                    View Mode
                                </DropdownToggle>
                                <DropdownMenu style={{zIndex: 10000}}>
                                    <DropdownItem onClick={() => this.setState({compact: true})}>Compact</DropdownItem>
                                    <DropdownItem onClick={() => this.setState({compact: false})}>Expanded</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </Col>
                        <Col>
                        <AnnotationListReadOnly
                                annotationOrder={this.props.annotationOrder}
                                compact={this.state.compact} />
                        </Col>
                    </Row>
                </ListGroupItem>
            </ListGroup>
        );
    }
}

SubmissionReadOnly.propTypes = {
    publicationLocalId: PropTypes.string,
    geneOrder: PropTypes.array,
    annotationOrder: PropTypes.array,
};

export default SubmissionReadOnly;
