"use strict";

import reducer from './reducer';
import * as constants from './constants';
import * as actions from './actions';

import UserProfilePanel from './components/userProfilePanel';
import AddEmailPanel from './components/addEmailPanel';

export default {
    components: {
        UserProfilePanel,
        AddEmailPanel
    },
    actions,
    constants,
    reducer
};
