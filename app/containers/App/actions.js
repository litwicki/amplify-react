/*
 *
 * App actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import { CHECK_USER_ACTION } from './constants';
import { SET_USER_ACTION } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function checkUserAction() {
  return {
    type: CHECK_USER_ACTION,
  };
}

export function setUserAction() {
  return {
    type: SET_USER_ACTION,
  };
}
