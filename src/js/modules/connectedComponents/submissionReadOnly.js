"use strict";

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import SubmissionReadOnly from 'ui/submission/viewReadOnly';
import {
    publicationLocalId,
    geneOrder,
    annotationOrder,
} from 'modules/submission/selectors';

const ConnectedSubmissionReadOnly = connect(
    createStructuredSelector({
        publicationLocalId,
        geneOrder,
        annotationOrder,
    }),
    () => ({})
)(SubmissionReadOnly);

export default ConnectedSubmissionReadOnly;
