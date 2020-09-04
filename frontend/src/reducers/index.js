import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { userSearchReducer } from './search';
import { LOGOUT_SUCCESS } from '../actions/types';
import { allRecipesReducer, userRecipesReducer, recipeActionReducer, friendsRecipesReducer, favoriteRecipesReducer } from './recipes';
import { getUserReducer } from './user';
import auth from './auth';

const appReducer = combineReducers({
    form: formReducer,
    all_recipes: allRecipesReducer,
    user_recipes: userRecipesReducer,
    friends_recipes: friendsRecipesReducer,
    favorites: favoriteRecipesReducer,
    recipe: recipeActionReducer,
    user_profile: getUserReducer,
    user_search: userSearchReducer,
    auth
});

const rootReducer = (state, action) => {
    if (action.type === LOGOUT_SUCCESS) {
        state=undefined;
    }
    return appReducer(state, action)
};

export default rootReducer