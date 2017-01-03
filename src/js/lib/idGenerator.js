"use strict";

let currId = 0;

export default function generateId() {
    currId++;
    return currId;
}
