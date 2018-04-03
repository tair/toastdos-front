"use strict";

import React from 'react';
import { annotationStatusFormats } from 'domain/annotation/constants';

class AnnotationStatusReadOnly extends React.Component {
    constructor(props) {
        super(props);
    }

    getTitleText(status){
        switch (status) {
        case annotationStatusFormats.ACCEPTED:
            return (
                    <span className="text-nowrap">
                        <span className="fa fa-fw fa-check" /> Accepted
                    </span>
            );
        case annotationStatusFormats.REJECTED:
            return (
                    <span className="text-nowrap">
                        <span className="fa fa-fw fa-trash" /> Rejected
                    </span>
            );
        case annotationStatusFormats.PENDING:
            return (
                    <span className="text-nowrap">
                        <span className="fa fa-fw fa-pencil-square-o" /> Pending
                    </span>
            );
        default:
            return null;
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
        default:
            return "";
        }
    }

    render() {
        let status = this.props.annotationStatus;
        return (
            <span className={`text-${this.getColor(status)}`}>
                {this.getTitleText(status)}
            </span>
        );
    }
}

AnnotationStatusReadOnly.propTypes = {
    annotationStatus: React.PropTypes.string.isRequired,
};

AnnotationStatusReadOnly.defaultProps = {
    annotationStatus: "",
};

export default AnnotationStatusReadOnly;
