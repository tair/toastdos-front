"use strict";

import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import AnnotationEntryReadOnly from 'ui/annotation/entryReadOnly';

class AnnotationCurationListReadOnly extends React.Component {
    constructor(props) {
        super(props);

        this.renderAnnotations = this.renderAnnotations.bind(this);
    }

    renderAnnotations(annotations) {
        return annotations.map(
            annotation =>
                <AnnotationEntryReadOnly
                    key={annotation.localId}
                    annotation={annotation}
                    compact={this.props.compact} />
        );
    }

    render() {
        return (
            <div className="annotation-list-container">
                <h5 className="my-3">Pending Annotations</h5>
                {(this.props.pendingAnnotations.length <= 0) ?
                (
                    <div>
                        <Alert color="secondary">
                            <span className="empty-message">
                                No Pending Annotations.
                            </span>
                        </Alert>
                    </div>
                ) : (
                    <div className="annotation-list">
                        {this.renderAnnotations(this.props.pendingAnnotations)}
                    </div>
                )}
                <h5 className="my-3">Reviewed Annotations</h5>
                {this.props.reviewedAnnotations.length <= 0 ? (
                    <div>
                        <Alert color="secondary">
                            <span className="empty-message">
                                No Reviewed Annotations.
                            </span>
                        </Alert>
                    </div>
                ) : (
                    <div className="annotation-list">
                        {this.renderAnnotations(this.props.reviewedAnnotations)}
                    </div>
                )}
            </div>
        );
    }
}


AnnotationCurationListReadOnly.propTypes = {
    pendingAnnotations: PropTypes.array,
    reviewedAnnotations: PropTypes.array,
};

AnnotationCurationListReadOnly.defaultProps = {
    pendingAnnotations: [],
    reviewedAnnotations: [],
};

export default AnnotationCurationListReadOnly;

