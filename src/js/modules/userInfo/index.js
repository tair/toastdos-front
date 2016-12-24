"use strict";

import reducer from './reducer';
import * as constants from './constants';
import * as actions from './actions';

import UserProfilePanel from './components/userProfilePanel';

export default {
    components: {
        UserProfilePanel
    },
    actions,
    constants,
    reducer
};
