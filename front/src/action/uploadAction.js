import { api } from '../helper/api';

import {
  UPLOADS_REQUEST_PROCESS,
  UPLOADS_REQUEST_ERROR,
  UPLOADS_REQUEST_SUCCESS,

  UPLOADADD_REQUEST_ERROR,
  UPLOADADD_REQUEST_SUCCESS,

  UPLOADDEL_REQUEST_ERROR,
  UPLOADDEL_REQUEST_SUCCESS,

  UPLOADUPDATE_REQUEST_ERROR,
  UPLOADUPDATE_REQUEST_SUCCESS,
  REUPLOADTOAST
} from '../types';

export const uploadsRequestProcess = () => ({
  type: UPLOADS_REQUEST_PROCESS
});

export const uploadsRequestSuccess = data => ({
  type: UPLOADS_REQUEST_SUCCESS,
  data
});

export const uploadsRequestError = error => ({
  type: UPLOADS_REQUEST_ERROR,
  error
});

export const uploadsFetchRequest = () => async dispatch => {
  try {
    dispatch(uploadsRequestProcess());

    const data = await api("get", "uploads");
    dispatch(uploadsRequestSuccess(data));
  } catch (error) {
    dispatch(uploadsRequestError(error.response ? error.response.data : error));
  }
};

export const uploadAddRequestSuccess = data => ({
  type: UPLOADADD_REQUEST_SUCCESS,
  data
});

export const uploadAddRequestError = error => ({
  type: UPLOADADD_REQUEST_ERROR,
  error
});

export const uploadAddRequest = (newupload) => async dispatch => {
  try {
    const data = await api("post", "upload/add", { data: newupload });
    dispatch(uploadAddRequestSuccess(data));
  } catch (error) {
    dispatch(uploadAddRequestError(error.response ? error.response.data : error));
  }
};

export const uploadDelRequestSuccess = data => ({
  type: UPLOADDEL_REQUEST_SUCCESS,
  data
});

export const uploadDelRequestError = error => ({
  type: UPLOADDEL_REQUEST_ERROR,
  error
});

export const uploadDelRequest = (uploadid) => async dispatch => {
  try {
    const data = await api("post", "upload/del", { id: uploadid });
    dispatch(uploadDelRequestSuccess(data));
  } catch (error) {
    dispatch(uploadDelRequestError(error.response ? error.response.data : error));
  }
};

export const uploadUpdateRequestSuccess = data => ({
  type: UPLOADUPDATE_REQUEST_SUCCESS,
  data
});

export const uploadUpdateRequestError = error => ({
  type: UPLOADUPDATE_REQUEST_ERROR,
  error
});

export const uploadUpdateRequest = (upload) => async dispatch => {
  try {
    const data = await api("post", "upload/update", { upload: upload });
    dispatch(uploadUpdateRequestSuccess(data));
  } catch (error) {
    dispatch(uploadUpdateRequestError(error.response ? error.response.data : error));
  }
};

export const resetToast = () => ({ type: REUPLOADTOAST });

export const resetToastHandler = () => dispatch => {
  dispatch(resetToast());
};
