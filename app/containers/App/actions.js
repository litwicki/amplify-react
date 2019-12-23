/*
 *
 * App actions
 *
 */

import {
  DEFAULT_ACTION,
  LOADED_USER_ACTION,
  LOADING_USER_ACTION,
  LOAD_USER_ACTION,
  SIGN_OUT_USER_ACTION,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadUserAction() {
  return {
    type: LOAD_USER_ACTION,
  };
}

export function loadedUserAction() {
  return {
    type: LOADED_USER_ACTION,
  };
}

export function loadingUserAction() {
  return {
    type: LOADING_USER_ACTION,
  };
}

export function signOutUserAction() {
  return {
    type: SIGN_OUT_USER_ACTION,
  };
}
