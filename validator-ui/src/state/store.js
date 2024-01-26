import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "oauth",
  storage,
};

const persist = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persist,
});
export default store;
