import { combineReducers } from "redux";
import appReducer from "./app";
import storage from "redux-persist/lib/storage";
import authReducer from "./silice/auth";
import convsersionReducer from "./silice/conversions";
const rootPersistConfig = {
  key: "root",
  storage,
  // keyPrefix: "redu",
};
const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  conversions: convsersionReducer,
});
export { rootPersistConfig, rootReducer };
