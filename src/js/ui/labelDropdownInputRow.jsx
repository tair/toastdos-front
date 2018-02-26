"use strict";

import React from 'react';
import { Row, Col, Label } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class LabelDropdownInputRow extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.updateRelation = this.updateRelation.bind(this);
        this.populateItems = this.populateItems.bind(this);
        this.state = {
            dropdownOpen: false,
        };

        this.props.onClick(this.props.items[0]);
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    updateRelation(e) {
        this.props.onClick(e.currentTarget.textContent);
    }

    populateItems(items) {
        return items.map((item, index) =>
            <DropdownItem key={index} onClick={this.updateRelation}>{item}</DropdownItem>);
    }

    render() {
        return (
            <Row className={"d-flex p-2 "+this.props.align}>
                <Col xs="3" className="text-right">
                    <Label className="mb-0">
                        {this.props.title}
                    </Label>
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret color="success">
                            {"Relation: " + (this.props.value == "" ? this.props.items[0] : this.props.value)}
                        </DropdownToggle>
                        <DropdownMenu>
                            {this.populateItems(this.props.items)}
                        </DropdownMenu>
                    </Dropdown>
                </Col>
                <Col className="p-1">
                    {this.props.children}
                </Col>
            </Row>
        );
    }
}

LabelDropdownInputRow.propTypes = {
    title: React.PropTypes.string,
    align: React.PropTypes.string,
    value: React.PropTypes.string,
    items: React.PropTypes.array.isRequired,
    onClick: React.PropTypes.func,
};

LabelDropdownInputRow.defaultProps = {
    title: '',
    align: 'align-items-center',
    value: 'Select...',
    items: [],
    onClick: () => {},
};

export default LabelDropdownInputRow;
