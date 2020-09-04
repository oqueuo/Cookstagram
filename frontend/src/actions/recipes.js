import { GET_ALL_RECIPES, GET_USER_RECIPES, CREATE_RECIPE, DELETE_RECIPE, GET_RECIPE, EDIT_RECIPE, GET_FRIENDS_RECIPES, GET_FAVORITES } from './types';
import { reset } from 'redux-form'
import axios from 'axios';
import { tokenConfig } from './auth';
import history from '../history'

export const getAllRecipes = () => async (dispatch, getState) => {
  const res = await axios.get('http://127.0.0.1:8000/api/recipe/', tokenConfig(getState));
  return(
  dispatch({
      type: GET_ALL_RECIPES,
      payload: res.data
    })
  )
}

export const getUserRecipes = () => async (dispatch, getState) => {
  const res = await axios.get('http://127.0.0.1:8000/api/auth/user', tokenConfig(getState))
  return (
    dispatch({
      type: GET_USER_RECIPES,
      payload: res.data
    })
  )
}

export const getFriendsRecipes = () => async(dispatch, getState) => {
  const res = await axios.get('http://127.0.0.1:8000/api/auth/user', tokenConfig(getState))
  return (
    dispatch({
      type: GET_FRIENDS_RECIPES,
      payload: res.data
    })
  )
}

export const getFavoriteRecipes = () => async(dispatch, getState) => {
  const res = await axios.get('http://127.0.0.1:8000/api/auth/user', tokenConfig(getState))
  return (
    dispatch({
      type: GET_FAVORITES,
      payload: res.data
    })
  )
}

export const getRecipe = id => async dispatch => {
  const res = await axios.get(`http://127.0.0.1:8000/api/recipe/${id}/`);
  dispatch({
    type: GET_RECIPE,
    payload: res.data
  })
}

export const createRecipe = formValues => async (dispatch, getState) => {
  const res = await axios.post(
    'http://127.0.0.1:8000/api/recipe/', 
    formValues, 
    tokenConfig(getState)
    );
  dispatch({
    type: CREATE_RECIPE,
    payload: res.data
  })
  dispatch(reset('recipeForm'))
  history.push('/');
}

export const editRecipe = (id, formValues) => async (dispatch, getState) => {
  const res = await axios.patch(
    `http://127.0.0.1:8000/api/recipe/${id}/`,
    formValues,
    tokenConfig(getState)
  )
  
  dispatch({
    type: EDIT_RECIPE,
    payload: res.data
  })
  console.log(formValues)
  history.push('/');
}

export const deleteRecipe = id => async (dispatch, getState) => {
  await axios.delete(`http://127.0.0.1:8000/api/recipe/${id}/`, tokenConfig(getState));
  dispatch({
    type: DELETE_RECIPE,
    payload: id
  })
  history.push('/');
}

export const addFavorite = (user_id, recipe_id) => async(getState) => {
  await axios.post(
    `http://127.0.0.1:8000/api/user/profile/${user_id}/favorites/`,
    {recipe_id: recipe_id},
    tokenConfig(getState)
  );
}

export const removeFavorite = (user_id, recipe_id) => async(getState) => {
  let config = tokenConfig(getState);
  let recipe_data = {'recipe_id': recipe_id};
  config['data'] = recipe_data;
  await axios.delete(
    `http://127.0.0.1:8000/api/user/profile/${user_id}/favorites/`,
    config
  );
}






