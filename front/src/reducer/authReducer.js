import {
  SIGNIN_REQUEST_PROCESS,
  SIGNIN_REQUEST_ERROR,
  SIGNIN_SUCCESS,
  SIGNUP_REQUEST_PROCESS,
  SIGNUP_REQUEST_ERROR,
  SIGNUP_SUCCESS,
  REAUTHTOAST,
  LOGOUT
} from '../types';

const initialState = {
  isLoading: false,
  isError: false,
  errorMessage: "",
  isAuth: false,
  accessToken: "",
  refreshToken: "",
  user: {
    id: "",
    name: "",
    email: ""
  }
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_REQUEST_PROCESS:
      return { ...state, isError: false, errorMessage: "", isLoading: true };
    case SIGNIN_REQUEST_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.error.message
      };
    case SIGNIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        user: action.data.user,
        accessToken: action.data.accessToken,
        refreshToken: action.data.refreshToken
      };
    case SIGNUP_REQUEST_PROCESS:
      return { ...state, isError: false, errorMessage: "", isLoading: true };
    case SIGNUP_REQUEST_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.error.message
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isSuccess: true,
        isLoading: false,
        user: action.data.user,
        accessToken: action.data.accessToken,
        refreshToken: action.data.refreshToken
      };
    case REAUTHTOAST:
      return { ...state, isError: false };
    case LOGOUT:
      return { ...state, isAuth: false }; 
    default:
      return state;
  }
};
