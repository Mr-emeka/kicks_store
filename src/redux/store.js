import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import reducers from "./reducers";
import sagas from "./sagas";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

export function configureStore(initialState) {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    const { createLogger } = require("redux-logger");
    middlewares.push(createLogger());
  }
  middlewares.push(thunk);

  const store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(...middlewares))
  );

  sagaMiddleware.run(sagas);
  const persistor = persistStore(store);
  if (module.hot) {
    module.hot.accept("./reducers", () => {
      const nextRootReducer = require("./reducers");
      store.replaceReducer(nextRootReducer);
    });
  }

  return { store, persistor };
}
