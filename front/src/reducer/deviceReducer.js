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

const initialState = {
    data: [],
    isLoading: false,
    isError: false,
    errorMessage: ""
};

export const deviceReducer = (state = initialState, action) => {
    switch (action.type) {
        case DEVICES_REQUEST_PROCESS:
            return { ...state, isError: false, errorMessage: "", isLoading: true };
        case DEVICES_REQUEST_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: action.error.message
            };
        case DEVICES_REQUEST_SUCCESS:
            return {
                ...state,
                data: action.data,
                isLoading: false
            };
        case DEVICEADD_REQUEST_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: action.error.message
            };
        case DEVICEADD_REQUEST_SUCCESS:
            return {
                ...state,
                data: [...state.data, action.data.newDevice],
                isSuccess: true,
                isLoading: false
            };
        case DEVICEDEL_REQUEST_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: action.error.message
            };
        case DEVICEDEL_REQUEST_SUCCESS:
            return {
                ...state,
                data: [...state.data.filter(device => device._id !== action.data.id)],
                isLoading: false
            };
        case DEVICEUPDATE_REQUEST_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: action.error.message
            };
        case DEVICEUPDATE_REQUEST_SUCCESS:
            return {
                ...state,
                data: [...state.data.reduce((arr, device) => device._id !== action.data._id ? [...arr, device] : [...arr, action.data], [])],
                isLoading: false,
                isError: true,
                errorMessage: "Success Update"
            };
        case REDEVICETOAST:
            return { ...state, isError: false };
        default:
            return state;
    }
};
