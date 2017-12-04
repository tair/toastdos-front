"use strict";

import React from 'react';
import { Alert } from 'reactstrap';
import AnnotationEntryReadOnly from 'modules/connectedComponents/annotation/entryReadOnly';

class AnnotationListReadOnly extends React.Component {
    constructor(props) {
        super(props);

        this.renderAnnotations = this.renderAnnotations.bind(this);
    }

    renderAnnotations(annotationOrder) {
        return annotationOrder.map(
            localId =>
                <AnnotationEntryReadOnly
                    key={localId}
                    localId={localId} />
        );
    }

    render() {
        return (
            <div className="annotation-list-container">
                {(this.props.annotationOrder.length <= 0) ?
                (
                    <Alert color="secondary">
                        <span className="empty-message">
                            No Annotations.
                        </span>
                    </Alert>
                ) : (
                    <div className="annotation-list">
                        {this.renderAnnotations(this.props.annotationOrder)}
                    </div>
                )}
            </div>
        );
    }
}


AnnotationListReadOnly.propTypes = {
    annotationOrder: React.PropTypes.arrayOf(React.PropTypes.string),
};

AnnotationListReadOnly.defaultProps = {
    annotationOrder: [],
};

export default AnnotationListReadOnly;

