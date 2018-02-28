"use strict";

import React from 'react';
import { Button, ButtonGroup, ButtonDropdown,
    DropdownItem, DropdownMenu, DropdownToggle,
} from 'reactstrap';
import { annotationStatusFormats } from 'domain/annotation/constants';
import { hasValidGene } from '../../modules/submission/selectors';
import { name } from '../../modules/curationDetail/constants';

class AnnotationStatusButton extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropDownOpen: false,
        };
    }

    toggle() {
        this.setState({
            dropDownOpen: !this.state.dropDownOpen,
        });
    }

    getTitleText(status){
        switch (status) {
        case annotationStatusFormats.ACCEPTED:
            return (
                    <span>
                        <span className="fa fa-fw fa-check" /> Accepted
                    </span>
            );
        case annotationStatusFormats.REJECTED:
            return (
                    <span>
                        <span className="fa fa-fw fa-trash" /> Rejected
                    </span>
            );
        case annotationStatusFormats.PENDING:
            return (
                    <span>
                        <span className="fa fa-fw fa-pencil-square-o" /> Pending
                    </span>
            );
        }
    }

    getColor(status) {
        switch (status) {
        case annotationStatusFormats.ACCEPTED:
            return "success";
        case annotationStatusFormats.REJECTED:
            return "danger";
        case annotationStatusFormats.PENDING:
            return "warning";
        }
    }

    render() {
        let status = this.props.annotationStatus;
        return (
            status == annotationStatusFormats.PENDING ?
            <ButtonGroup>
                <Button color="success" type="button"
                    onClick={() => this.props.onStatusChange(annotationStatusFormats.ACCEPTED)}
                >
                    <span className="fa fa-fw fa-check" />
                </Button>
                <Button color="danger" type="button"
                    onClick={() => this.props.onStatusChange(annotationStatusFormats.REJECTED)}
                >
                    <span className="fa fa-fw fa-trash" />
                </Button>
            </ButtonGroup>
            :
            <ButtonDropdown isOpen={this.state.dropDownOpen} toggle={this.toggle}>
                <DropdownToggle caret color={this.getColor(status)}>
                    {this.getTitleText(status)}
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem
                        onClick={() => this.props.onStatusChange(annotationStatusFormats.PENDING)}
                    >
                        {this.getTitleText(annotationStatusFormats.PENDING)}
                    </DropdownItem>
                    {status == annotationStatusFormats.ACCEPTED ? null :
                        <DropdownItem
                            onClick={() => this.props.onStatusChange(annotationStatusFormats.ACCEPTED)}
                        >
                            {this.getTitleText(annotationStatusFormats.ACCEPTED)}
                        </DropdownItem>
                    }
                    {status == annotationStatusFormats.REJECTED ? null :
                        <DropdownItem
                            onClick={() => this.props.onStatusChange(annotationStatusFormats.REJECTED)}
                        >
                            {this.getTitleText(annotationStatusFormats.REJECTED)}
                        </DropdownItem>
                    }
                </DropdownMenu>
            </ButtonDropdown>
        );
    }
}

AnnotationStatusButton.propTypes = {
    annotationStatus: React.PropTypes.string.isRequired,
    onStatusChange: React.PropTypes.func,
};

AnnotationStatusButton.defaultProps = {
    annotationStatus: annotationStatusFormats.PENDING,
    onStatusChange: () => {},
};

export default AnnotationStatusButton;
