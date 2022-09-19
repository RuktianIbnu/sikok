import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-circular-progressbar/dist/styles.css";
import "axios-progress-bar/dist/nprogress.css";
import { PersistGate } from "redux-persist/lib/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import { ToastProvider } from "react-toast-notifications";
import dotenv from "dotenv";

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
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
