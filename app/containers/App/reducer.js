/*
 *
 * App reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case 'setUser':
        return { ...state, user: action.user, loading: false };
      case 'loaded':
        return { ...state, loading: false };
      case DEFAULT_ACTION:
        break;
      default:
        return { ...state, user: action.user, loading: false };
    }
  });

export default appReducer;
