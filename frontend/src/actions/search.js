import axios from 'axios';
import { USER_SEARCH } from './types';
import { tokenConfig } from './auth';

export const userSearch = (query) => async (dispatch, getState) => {
  if (query === '') {
    query = ' /'
  }
  const res = await axios.get(
    `http://127.0.0.1:8000/api/user/profile/search/${query}`,
    tokenConfig(getState)
  );
  dispatch ({
    type: USER_SEARCH,
    payload: res.data
  })
}