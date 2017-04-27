//import { createSelector } from 'reselect';
// import from reselect if you're using it

import { name } from './constants';

export const loadingSubmissionList = state => state[name].loadingSubmissionList;
export const submissionList = state => state[name].submissionList;
export const totalPages = state => state[name].totalPages;
export const pageSize = state => state[name].pageSize;
export const currPage = state => state[name].currPage;