"use strict";

import React from 'react';
import { connect } from 'react-redux';
import CommentAnnotation from 'ui/annotation/comment';
import { update } from 'domain/commentAnnotation/actions';

const ConnectedCommentAnnotation = connect(
    (state, ownProps) => ({
        commentAnnotation: state.domain.commentAnnotation.byLocalId[ownProps.localId],
    }),
    (dispatch, ownProps) => ({
        onDataChange: (data) => dispatch(update(ownProps.localId, data)),
    })
)(CommentAnnotation);

ConnectedCommentAnnotation.propTypes = {
    localId: React.PropTypes.string,
};

export default ConnectedCommentAnnotation;
