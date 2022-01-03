import { api } from '../helper/api';

import {
  DEVICES_REQUEST_PROCESS,
  DEVICES_REQUEST_ERROR,
  DEVICES_REQUEST_SUCCESS,

  DEVICEADD_REQUEST_ERROR,
  DEVICEADD_REQUEST_SUCCESS,

  DEVICEDEL_REQUEST_ERROR,
  DEVICEDEL_REQUEST_SUCCESS,

  DEVICEUPDATE_REQUEST_ERROR,
  DEVICEUPDATE_REQUEST_SUCCESS,
  REDEVICETOAST
} from '../types';

export const devicesRequestProcess = () => ({
  type: DEVICES_REQUEST_PROCESS
});

export const devicesRequestSuccess = data => ({
  type: DEVICES_REQUEST_SUCCESS,
  data
});

export const devicesRequestError = error => ({
  type: DEVICES_REQUEST_ERROR,
  error
});

export const devicesFetchRequest = () => async dispatch => {
  try {
    dispatch(devicesRequestProcess());

    const data = await api("get", "devices");
    dispatch(devicesRequestSuccess(data));
  } catch (error) {
    dispatch(devicesRequestError(error.response ? error.response.data : error));
  }
};

export const deviceAddRequestSuccess = data => ({
  type: DEVICEADD_REQUEST_SUCCESS,
  data
});

export const deviceAddRequestError = error => ({
  type: DEVICEADD_REQUEST_ERROR,
  error
});

export const deviceAddRequest = (newDevice) => async dispatch => {
  try {
    const data = await api("post", "device/add", { data: newDevice });
    dispatch(deviceAddRequestSuccess(data));
  } catch (error) {
    dispatch(deviceAddRequestError(error.response ? error.response.data : error));
  }
};

export const deviceDelRequestSuccess = data => ({
  type: DEVICEDEL_REQUEST_SUCCESS,
  data
});

export const deviceDelRequestError = error => ({
  type: DEVICEDEL_REQUEST_ERROR,
  error
});

export const deviceDelRequest = (deviceid) => async dispatch => {
  try {
    const data = await api("post", "device/del", { id: deviceid });
    dispatch(deviceDelRequestSuccess(data));
  } catch (error) {
    dispatch(deviceDelRequestError(error.response ? error.response.data : error));
  }
};

export const deviceUpdateRequestSuccess = data => ({
  type: DEVICEUPDATE_REQUEST_SUCCESS,
  data
});

export const deviceUpdateRequestError = error => ({
  type: DEVICEUPDATE_REQUEST_ERROR,
  error
});

export const deviceUpdateRequest = (device) => async dispatch => {
  try {
    const data = await api("post", "device/update", { device: device });
    dispatch(deviceUpdateRequestSuccess(data));
  } catch (error) {
    dispatch(deviceUpdateRequestError(error.response ? error.response.data : error));
  }
};

export const resetToast = () => ({ type: REDEVICETOAST });

export const resetToastHandler = () => dispatch => {
  dispatch(resetToast());
};
