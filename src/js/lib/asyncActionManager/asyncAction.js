"use strict";

export default class AsyncAction {
    constructor(name) {
        this.name = name;
        this.request = null;
    }

    execute() {}
    abort() {
        if (this.request) {
            this.request.abort();
        }
    }
}
