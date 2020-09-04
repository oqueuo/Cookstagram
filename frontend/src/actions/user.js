import { GET_USER } from './types';
import axios from 'axios';
import { tokenConfig } from './auth';

export const addFriend = (user_id, other_user_id) => async(getState) => {
    await axios.post(
      `http://127.0.0.1:8000/api/user/profile/${user_id}/friends/`,
      {other_user_id: other_user_id},
      tokenConfig(getState)
    );
  }
  
export const removeFriend = (user_id, other_user_id) => async(getState) => {
  let config = tokenConfig(getState);
  let friend_data = {'other_user_id': other_user_id};
  config['data'] = friend_data;
  await axios.delete(
    `http://127.0.0.1:8000/api/user/profile/${user_id}/friends/`,
    config
  );
}
  
export const getUser = id => async (dispatch) => {
  const res = await axios.get(`http://127.0.0.1:8000/api/user/profile/${id}/`);
  return (
    dispatch({
      type: GET_USER,
      payload: res.data
    })
  )
}