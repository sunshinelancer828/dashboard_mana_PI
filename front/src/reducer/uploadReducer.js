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

const initialState = {
    data: [],
    isLoading: false,
    isError: false,
    errorMessage: ""
};

export const uploadReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPLOADS_REQUEST_PROCESS:
            return { ...state, isError: false, errorMessage: "", isLoading: true };
        case UPLOADS_REQUEST_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: action.error.message
            };
        case UPLOADS_REQUEST_SUCCESS:
            return {
                ...state,
                data: action.data,
                isLoading: false
            };
        case UPLOADADD_REQUEST_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: action.error.message
            };
        case UPLOADADD_REQUEST_SUCCESS:
            return {
                ...state,
                data: [...state.data, action.data.newDevice],
                isSuccess: true,
                isLoading: false
            };
        case UPLOADDEL_REQUEST_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: action.error.message
            };
        case UPLOADDEL_REQUEST_SUCCESS:
            return {
                ...state,
                data: [...state.data.filter(device => device._id !== action.data.id)],
                isLoading: false
            };
        case UPLOADUPDATE_REQUEST_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: action.error.message
            };
        case UPLOADUPDATE_REQUEST_SUCCESS:
            return {
                ...state,
                data: [...state.data.reduce((arr, device) => device._id !== action.data._id ? [...arr, device] : [...arr, action.data], [])],
                isLoading: false,
                isError: true,
                errorMessage: "Success Update"
            };
        case REUPLOADTOAST:
            return { ...state, isError: false };
        default:
            return state;
    }
};
