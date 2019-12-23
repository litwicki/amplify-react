/*
 *
 * App reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  LOAD_USER_ACTION,
  LOADED_USER_ACTION,
  SIGN_OUT_USER_ACTION,
  LOADING_USER_ACTION,
} from './constants';

export const initialState = { user: null, loading: false };

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    console.log('draft', draft);
    console.log('action', action);
    switch (action.type) {
      case LOAD_USER_ACTION:
        return { ...state, user: action.user, loading: false };
      case SIGN_OUT_USER_ACTION:
        return { ...state, user: null, loading: false };
      case LOADING_USER_ACTION:
        return { ...state, loading: true };
      case LOADED_USER_ACTION:
      case DEFAULT_ACTION:
        return { ...state };
    }
    return { ...state };
  });

export default appReducer;
