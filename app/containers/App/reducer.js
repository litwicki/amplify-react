/*
 *
 * App reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, SET_USER_ACTION, CHECK_USER_ACTION, LOADED_USER_ACTION } from './constants';
import { Auth } from 'aws-amplify';

export function getCurrentUser() {
  Auth.currentAuthenticatedUser({ bypassCache: true })
  .then(user => {
    return user;
  })
  .catch(err => {
    return null;
  });
}

const currentUser = getCurrentUser();
console.log('currentUser', currentUser);

export const initialState = { user: currentUser, loading: false };

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
      case LOADED_USER_ACTION:
        return { ...state, loading: false };
      case DEFAULT_ACTION:
      default:
        return state;
    }
  });

export default appReducer;
