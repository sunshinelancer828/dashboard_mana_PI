import { api } from '../helper/api';

import {
    USERS_REQUEST_PROCESS,
    USERS_REQUEST_ERROR,
    USERS_REQUEST_SUCCESS,

    USERDEL_REQUEST_ERROR,
    USERDEL_REQUEST_SUCCESS,

    ROLEUPDATE_REQUEST_ERROR,
    ROLEUPDATE_REQUEST_SUCCESS,

    NAMEUPDATE_REQUEST_ERROR,
    NAMEUPDATE_REQUEST_SUCCESS,
    REUSERTOAST
} from '../types';

export const usersRequestProcess = () => ({
  type: USERS_REQUEST_PROCESS
});

export const usersRequestSuccess = data => ({
  type: USERS_REQUEST_SUCCESS,
  data
});

export const usersRequestError = error => ({
  type: USERS_REQUEST_ERROR,
  error
});

export const usersFetchRequest = () => async dispatch => {
  try {
    dispatch(usersRequestProcess());

    const data = await api("get", "users");
    dispatch(usersRequestSuccess(data));
  } catch (error) {
    dispatch(usersRequestError(error.response ? error.response.data : error));
  }
};

export const userDelRequestSuccess = data => ({
  type: USERDEL_REQUEST_SUCCESS,
  data
});

export const userDelRequestError = error => ({
  type: USERDEL_REQUEST_ERROR,
  error
});

export const userDelRequest = (userid) => async dispatch => {
  try {
    const data = await api("post", "user/del", {id:userid});
    dispatch(userDelRequestSuccess(data));
  } catch (error) {
    dispatch(userDelRequestError(error.response ? error.response.data : error));
  }
};

export const roleUpdateRequestSuccess = data => ({
  type: ROLEUPDATE_REQUEST_SUCCESS,
  data
});

export const roleUpdateRequestError = error => ({
  type: ROLEUPDATE_REQUEST_ERROR,
  error
});

export const roleUpdateRequest = (userid) => async dispatch => {
  try {
    const data = await api("post", "user/roleupdate", {id:userid});

    dispatch(roleUpdateRequestSuccess(data));
  } catch (error) {
    dispatch(roleUpdateRequestError(error.response ? error.response.data : error));
  }
};

export const nameUpdateRequestSuccess = data => ({
  type: NAMEUPDATE_REQUEST_SUCCESS,
  data
});

export const nameUpdateRequestError = error => ({
  type: NAMEUPDATE_REQUEST_ERROR,
  error
});

export const nameUpdateRequest = (name, userid) => async dispatch => {
  try {
    const data = await api("post", "user/nameupdate", {id:userid, name:name});
    dispatch(nameUpdateRequestSuccess(data));
  } catch (error) {
    dispatch(nameUpdateRequestError(error.response ? error.response.data : error));
  }
};

export const resetToast = () => ({ type: REUSERTOAST });

export const resetToastHandler = () => dispatch => {
  dispatch(resetToast());
};
