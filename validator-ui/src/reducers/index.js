import { combineReducers } from 'redux';

import oauthReducer from './authReducer';

const rootReducer = combineReducers({
  auth: oauthReducer,
});

export default rootReducer;