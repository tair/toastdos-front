"use strict";

import reducer from './reducer';
import * as constants from './constants';
import SubmissionView from 'modules/connectedComponents/submissionView';

export default {
    components: {
        SubmissionView
    },
    constants,
    reducer
};
