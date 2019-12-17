/*
 *
 * App reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, SET_USER_ACTION, CHECK_USER_ACTION, LOADED_USER_ACTION, SIGN_OUT_USER_ACTION, LOADING_USER_ACTION } from './constants';

export const initialState = { user: null, loading: false };

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    console.log('action', action);
    switch (action.type) {
      case SET_USER_ACTION:
      case CHECK_USER_ACTION:
        console.log('state', state);
        const newState = { ...state, user: action.user, loading: false };
        console.log('newState', newState);
        return newState;
      case SIGN_OUT_USER_ACTION:
        return { ...state, user: null, loading: false };
      case LOADING_USER_ACTION:
        return { ...state, loading: true };
      case LOADED_USER_ACTION:
      case DEFAULT_ACTION:
        return { ...state };
    }
  });

export default appReducer;
