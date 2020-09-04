import { GET_ALL_RECIPES, GET_USER_RECIPES, CREATE_RECIPE, GET_RECIPE, EDIT_RECIPE, DELETE_RECIPE, GET_FRIENDS_RECIPES } from '../actions/types';
import _ from 'lodash';


export const allRecipesReducer = (state = [], action) => {
    switch(action.type) {
        case GET_ALL_RECIPES:
            return action.payload
        default:
            return state
    }
}

export const userRecipesReducer = (state = [], action) => {
    switch(action.type) {
        case GET_USER_RECIPES:
            let recipes = action.payload['user_recipes']
            return recipes
        default:
            return state
    }
}

export const friendsRecipesReducer = (state = [], action) => {
    switch(action.type) {
        case GET_FRIENDS_RECIPES:
            let recipes = action.payload['friends_recipes']
            return recipes
        default:
            return state
    }
}

export const favoriteRecipesReducer = (state = [], action) => {
    switch(action.type) {
        case GET_USER_RECIPES:
            let recipes = action.payload['favorites']
            return recipes
        default:
            return state
    }
}

export const recipeActionReducer = (state = {}, action) => {
    switch(action.type) {
        case GET_RECIPE:
        case CREATE_RECIPE:
        case EDIT_RECIPE:
            return action.payload
        case DELETE_RECIPE:
            return _.omit(state, action.payload)
        default:
            return state
    }
}