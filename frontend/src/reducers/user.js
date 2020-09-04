import { GET_USER } from '../actions/types';

export const getUserReducer = (state = {}, action) => {
    switch(action.type) {
        case GET_USER:
            return action.payload
        default:
            return state
    }
}