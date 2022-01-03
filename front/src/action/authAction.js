import { api } from '../helper/api';
import { setAuthUserData, removeAuthUserData } from '../helper/auth';
import {
  SIGNIN_REQUEST_PROCESS,
  SIGNIN_REQUEST_ERROR,
  SIGNIN_SUCCESS,
  SIGNUP_REQUEST_PROCESS,
  SIGNUP_REQUEST_ERROR,
  SIGNUP_SUCCESS,
  LOGOUT,
  REAUTHTOAST
} from '../types';

export const signinRequestProcess = () => ({ type: SIGNIN_REQUEST_PROCESS });

export const signinSuccess = data => ({
  type: SIGNIN_SUCCESS,
  data
})

export const signinRequestError = error => ({
  type: SIGNIN_REQUEST_ERROR,
  error
})

export const signinRequest = (formData, goHome) => async (dispatch) => {
  try {
    const data = await api("post", "auth/signin", formData);
    setAuthUserData(data);
    dispatch(signinSuccess(data));
    goHome();
  } catch (error) {
    dispatch(signinRequestError(error.response ? error.response.data : error));
  }
}

export const signupRequestProcess = () => ({ type: SIGNUP_REQUEST_PROCESS });

export const signupSuccess = data => ({
  type: SIGNUP_SUCCESS,
  data
});

export const signupRequestError = error => ({
  type: SIGNUP_REQUEST_ERROR,
  error
});

export const signupRequest = (formData, goHome) => async dispatch => {
  try {
    dispatch(signupRequestProcess());
        
    const data = await api("post", "auth/signup", formData);
    setAuthUserData(data);
    dispatch(signupSuccess(data));
    goHome();
  } catch (error) {
    dispatch(signupRequestError(error.response ? error.response.data : error));
  }
};

export const resetToast = () => ({ type: REAUTHTOAST });

export const resetToastHandler = () => dispatch => {
  dispatch(resetToast());
};

export const logout = () => ({ type: LOGOUT });

export const logoutHandler = () => dispatch => {
  removeAuthUserData();
  dispatch(logout());
};
