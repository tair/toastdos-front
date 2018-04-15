"use strict";

import PropTypes from 'prop-types';
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
    localId: PropTypes.string,
};

export default ConnectedCommentAnnotation;
