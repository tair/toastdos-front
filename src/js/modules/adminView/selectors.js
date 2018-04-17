"use strict";

import { name } from './constants';

export const usersList = state => state[name].usersList;
export const loadingUsersList = state => state[name].loadingUsersList;
