import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authUser from "./auth/reducer";
import cart from "./cart/reducer";

// used to persist your data It will not clear when you close your app.
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const reducers = combineReducers({
  authUser,
  cart
});

export default persistReducer(persistConfig, reducers);
