"use strict";

import reducer from './reducer';
import * as constants from './constants';
import SubmissionView from './components/submissionView';

export default {
    components: {
        SubmissionView
    },
    constants,
    reducer
};
