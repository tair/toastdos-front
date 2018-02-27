"use strict";

import AsyncAction from './asyncAction';

class AsyncActionManager {
    constructor() {
        this.actionsMap = {};
    }

    handle(store, next, action) {
        // Only handle AsyncActions
        if(!(action instanceof AsyncAction)) {
            return next(action);
        }
        const existing = this.actionsMap[action.name];
        if (existing) {
            this.actionsMap[action.name].abort();
            delete this.actionsMap[action.name];
        }

        this.actionsMap[action.name] = action;
        // TODO: re-add removal of action from map when done.
        action.execute(store.dispatch, store.getState);
    }

}

// Keep one instance per application.
const asyncActionManager = new AsyncActionManager();

export default asyncActionManager;
