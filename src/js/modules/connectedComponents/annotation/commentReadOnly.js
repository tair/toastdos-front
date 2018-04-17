"use strict";

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CommentAnnotationReadOnly from 'ui/annotation/commentReadOnly';

const ConnectedCommentAnnotationReadOnly = connect(
    (state, ownProps) => ({
        commentAnnotation: state.domain.commentAnnotation.byLocalId[ownProps.localId],
    }),
    () => ({})
)(CommentAnnotationReadOnly);

ConnectedCommentAnnotationReadOnly.propTypes = {
    localId: PropTypes.string,
};

export default ConnectedCommentAnnotationReadOnly;
