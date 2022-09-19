import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-circular-progressbar/dist/styles.css";
import "axios-progress-bar/dist/nprogress.css";
import App from "./App";
import { PersistGate } from "redux-persist/lib/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import { ToastProvider } from "react-toast-notifications";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ToastProvider autoDismiss>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ToastProvider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
