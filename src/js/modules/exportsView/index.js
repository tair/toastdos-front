"use strict";

import reducer from './reducer';
import * as constants from './constants';
import ExportsView from 'modules/connectedComponents/exportsView';

export default {
    constants,
    reducer,
    components: {
        ExportsView,
    },
};
