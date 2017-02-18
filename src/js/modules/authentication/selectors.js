import { createSelector } from 'reselect';
import { name } from './constants';
import jwtDecode from 'jwt-decode';


const jwtSelector = state => state[name].jwt ? jwtDecode(state[name].jwt) : null;
const nowDateSelector = () => Date.now();

export const jwtExpiration = createSelector(
  jwtSelector,
  jwt => jwt ? jwt.exp : null
);

export const isJwtExpired = createSelector(
  nowDateSelector,
  jwtExpiration,
  (now, jwtExp) => jwtExp ? (jwtExp <= Math.floor(now / 1000)) : null
);


