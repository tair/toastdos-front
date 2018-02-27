"use strict";

import asyncActionManager from './asyncActionManager';

const asyncActionMiddleware = store => next => action => asyncActionManager.handle(store, next, action);

export default asyncActionMiddleware;
