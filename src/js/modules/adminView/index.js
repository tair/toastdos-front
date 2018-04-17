"use strict";

import reducer from './reducer';
import * as constants from './constants';
import AdminView from 'modules/connectedComponents/adminView';

export default {
    constants,
    reducer,
    components: {
        AdminView,
    },
};
