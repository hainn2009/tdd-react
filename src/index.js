import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { router } from "./App";
import reportWebVitals from "./reportWebVitals";
import "./locale/i18n";
import { RouterProvider } from "react-router-dom";

ReactDOM.render(
    <React.StrictMode>
        {/* <UserSignupPage actions={actions} /> */}
        {/* <LoginPage /> */}
        {/* <App /> */}
        <RouterProvider router={router} />
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
