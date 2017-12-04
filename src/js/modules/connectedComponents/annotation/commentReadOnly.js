"use strict";

import React from 'react';
import { connect } from 'react-redux';
import CommentAnnotationReadOnly from 'ui/annotation/commentReadOnly';

const ConnectedCommentAnnotationReadOnly = connect(
    (state, ownProps) => ({
        commentAnnotation: state.domain.commentAnnotation.byLocalId[ownProps.localId],
    }),
    dispatch => ({})
)(CommentAnnotationReadOnly);

ConnectedCommentAnnotationReadOnly.propTypes = {
    localId: React.PropTypes.string,
};

export default ConnectedCommentAnnotationReadOnly;
