import { USER_SEARCH } from '../actions/types';

export const userSearchReducer = (state = [], action) => {
  switch(action.type) {
    case USER_SEARCH:
      return action.payload
    default:
      return state
  }
}