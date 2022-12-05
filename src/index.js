import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import UserSignupPage from "./pages/UserSignupPage";
import { LoginPage } from "./pages/LoginPage";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as apiCalls from "./api/apiCall";

import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        // the translations
        // (tip move them in a JSON file and import them,
        // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
        resources: {
            en: {
                translation: {
                    signUp: "Sign Up",
                },
            },
        },
        lng: "en", // if you're using a language detector, do not define the lng option
        fallbackLng: "en",

        interpolation: {
            escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        },
    });

const actions = {
    postSignup: apiCalls.Signup,
};

ReactDOM.render(
    <React.StrictMode>
        {/* <UserSignupPage actions={actions} /> */}
        {/* <LoginPage /> */}
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
