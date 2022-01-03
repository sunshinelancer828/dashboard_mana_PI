import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { authReducer } from './authReducer';
import { deviceReducer } from './deviceReducer';
import { uploadReducer } from './uploadReducer';

export default combineReducers({
  user: userReducer,
  auth: authReducer,
  device: deviceReducer,
  upload: uploadReducer
});
