"use strict";

import reducer from './reducer';
import * as constants from './constants';
import CurationView from 'modules/connectedComponents/curationView';

export default {
    components: {
        CurationView
    },
    constants,
    reducer
};
