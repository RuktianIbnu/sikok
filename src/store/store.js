import { persistStore, persistReducer } from "redux-persist";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { CookieStorage } from "redux-persist-cookie-storage";
import Cookies from "js-cookie";

import * as reducers from "./reducers";

// const in24Hours = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
const timestamp = Math.round(new Date().getTime() / 1000);
const in24Hours = timestamp + 24 * 3600;

const persistConfig = {
  key: "root",
  storage: new CookieStorage(Cookies, {
    setCookieOptions: {
      expires: in24Hours,
      // secure: true,
      // sameSite: "strict",
    },
  }),
  whitelist: ["user", "accessToken", "profile"],
};

const allReducers = combineReducers(reducers);
const persistedReducer = persistReducer(persistConfig, allReducers);

const store = createStore(persistedReducer, applyMiddleware());
const persistor = persistStore(store);
export { store, persistor };