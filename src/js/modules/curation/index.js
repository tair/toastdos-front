"use strict";

import reducer from './reducer';
import * as constants from './constants';
import CurationOverviewView from './components/curationOverviewView';

export default {
    constants,
    reducer,
    components: {
        CurationOverviewView,
    },
};
