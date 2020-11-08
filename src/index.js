import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { configureStore } from "./redux/store";
import { Provider } from "react-redux";
import Loader from "./component/custom/Loader";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={configureStore().store}>
      <Suspense fallback={<Loader />}>
        <PersistGate persistor={configureStore().persistor}>
          <App />
        </PersistGate>
      </Suspense>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
