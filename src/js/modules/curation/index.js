"use strict";

import reducer from './reducer';
import * as constants from './constants';
import CurationOverviewView from './components/curationOverviewView';
import CurationDetailView from './components/curationDetailView';

export default {
    constants,
    reducer,
    components: {
        CurationOverviewView,
        CurationDetailView
    },
};
