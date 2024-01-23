import { combineReducers } from 'redux';

import oauthReducer from './oauthReducer';

const rootReducer = combineReducers({
  auth: oauthReducer,
});

export default rootReducer;