import { combineReducers } from "redux";
import appReducer from "./app";
import storage from "redux-persist/lib/storage";
import authReducer from "./silice/auth";
const rootPersistConfig = {
  key: "root",
  storage,
  // keyPrefix: "redu",
};
const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
});
export { rootPersistConfig, rootReducer };
