//import { createSelector } from 'reselect';
// import from reselect if you're using it

import { name } from './constants';

export const loadingSubmissionList = state => state[name].loadingSubmissionList;
export const submissionList = state => state[name].submissionList;
