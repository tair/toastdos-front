"use strict";

import { name } from './constants';

export const exportsList = state => state[name].exportsList;
export const loadingExportsList = state => state[name].loadingExportsList;