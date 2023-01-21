import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import UserSignupPage from "./pages/UserSignupPage";
import { LoginPage } from "./pages/LoginPage";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as apiCalls from "./api/apiCall";
import "./locale/i18n";
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

// const actions = {
//     postSignup: apiCalls.Signup,
// };

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="/signup" component={SignUpPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/user/:id" component={UserPage} />
        </Route>

    )
    //     [{
    //     path: "/",
    //     element: <App />
    // }]
)

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
