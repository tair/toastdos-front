"use strict"

import {INCREMEMENT_COUNTER, DECREMEMENT_COUNTER, RESET_COUNTER} from "../actions/counter";

const defaultState = {
	totalClicks: 0,
	counterValue: 0
};



export default function handleAction(state = defaultState, action) {
    console.log(state);
    switch (action.type) {
        case INCREMEMENT_COUNTER:
            return Object.assign({}, state, {
                totalClicks: state.totalClicks + 1,
                counterValue: state.counterValue + 1
            });
        case DECREMEMENT_COUNTER:
            return Object.assign({}, state, {
                totalClicks: state.totalClicks + 1,
                counterValue: state.counterValue - 1
            });
        case RESET_COUNTER:
            return Object.assign({}, state, {
                totalClicks: 0,
                counterValue: 0
            })
        default:
            return state;
    }
}

