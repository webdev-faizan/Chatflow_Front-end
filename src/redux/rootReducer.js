import { combineReducers } from "redux";
import appReducer from "./app";
import storage from 'redux-persist/lib/storage';
import {} from '../'
const rootPersistConfig = {
  key: "root",
  storage,
  // keyPrefix: "redu",
};
const rootReducer = combineReducers({
  app: appReducer,
});
export { rootPersistConfig, rootReducer };
