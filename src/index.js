import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import UserSignupPage from './pages/UserSignupPage';
import { LoginPage } from './pages/LoginPage';
import reportWebVitals from './reportWebVitals';
import * as apiCalls from './api/apiCall';

const actions = {
  postSignup: apiCalls.Signup,
};

ReactDOM.render(
  <React.StrictMode>
    {/* <UserSignupPage actions={actions} /> */}
    <LoginPage />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
