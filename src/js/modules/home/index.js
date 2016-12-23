"use strict";

import reducer from './reducer';
import * as constants from './constants';
import HomeView from './components/homeView';

export default {
    components: {
        HomeView
    },
    constants,
    reducer
};
