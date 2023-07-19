import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import LanguageSelector from "./components/LanguageSelector";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import logo from "./assets/logo.jpg";
import { BrowserRouter, Route, Link, createBrowserRouter, createRoutesFromElements, Outlet, NavLink } from "react-router-dom";
import ErrorPage from "./pages/errorPage";
import Contact, { loader as contactLoader } from "./pages/contactPage";
import ContactHomePage, { loader as contactHomePageLoader, action as contactAction } from "./pages/contactHomePage";
import EditContact, { action as editContactAction } from "./pages/editContactPage";
import { action as deleteContactAction } from "./pages/deleteContact";
import AddTwoNumberPage, { loader as addTwoNumberLoader, action as calculateAction } from "./pages/AddTwoNumberPage";
import TodoApp, { loader as todoAppLoader } from "./pages/TodoApp";
import WeatherApp from "./pages/WeatherApp";
import API from "./pages/api";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />} errorElement={<ErrorPage />}>
            <Route path="contacts" element={<ContactHomePage />} loader={contactHomePageLoader} action={contactAction}>
                <Route path=":contactId" element={<Contact />} loader={contactLoader} />
                <Route path=":contactId/edit" element={<EditContact />} loader={contactLoader} action={editContactAction} />
                <Route path=":contactId/delete" action={deleteContactAction} />
            </Route>
            <Route path="addTwoNumber" element={<AddTwoNumberPage />} loader={addTwoNumberLoader} action={calculateAction} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/user/:id" element={<UserPage />} />
            <Route path="/todos" loader={todoAppLoader} element={<TodoApp />} />
            <Route path="/weather" element={<WeatherApp />} />
            {/* <Route path="/api" element={<API />} /> */}
        </Route>
    )
    //     [{
    //     path: "/",
    //     element: <App />
    // }]
);

function App() {
    const { t } = useTranslation();
    const [path, setPath] = useState(window.location.pathname);
    const handleNavLinkClick = (event) => {
        event.preventDefault();
        const path = event.currentTarget.attributes.href.value;
        window.history.pushState({}, "", path);
        setPath(path);
    };

    return (
        // <h1>Hello World</h1>
        // <BrowserRouter>
        <>
            <nav className="navbar navbar-expand bg-light shadow-sm nav-pills">
                <div className="container">
                    {/* <a className="navbar-brand" href="/" title="Home" onClick={handleNavLinkClick}>
                        <img src={logo} alt="My TDD project" width="60" />
                        My TDD project
                    </a> */}
                    <Link className="navbar-brand" to="/" title="Home">
                        <img src={logo} alt="My TDD project" width="60" />
                        My TDD project
                    </Link>
                    <div className="navbar-nav">
                        {/* <a className="nav-link" href="/signup" title="Signup" onClick={handleNavLinkClick}>
                            {t("signUp")}
                        </a>
                        <a className="nav-link" href="/login" title="Login" onClick={handleNavLinkClick}>
                            Login
                        </a> */}
                        <NavLink className="nav-item nav-link" to="/signup" title="Signup">
                            {t("signUp")}
                        </NavLink>
                        <NavLink className="nav-item nav-link" to="/login" title="Login">
                            Login
                        </NavLink>
                        <NavLink className="nav-item nav-link" to="/contacts" title="Contact">
                            Contact
                        </NavLink>
                        <NavLink className="nav-item nav-link" to="/addTwoNumber" title="Contact">
                            Add Number
                        </NavLink>
                        <NavLink className="nav-item nav-link" to="/todos" title="Contact">
                            Todo App
                        </NavLink>
                        <NavLink className="nav-item nav-link" to="/weather" title="Weather App">
                            Weather App
                        </NavLink>
                    </div>
                </div>
            </nav>
            <div className="container">
                <Outlet />
                {/* <Route exact path="/" component={HomePage} /> */}
                {/* <Route path="/signup" component={SignUpPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/user/:id" component={UserPage} /> */}
                {/* {path === "/" && <HomePage />}
                {path === "/signup" && <SignUpPage />}
                {path === "/login" && <LoginPage />}
                {path.startsWith("/user/") && <UserPage />} */}
                <LanguageSelector />
            </div>
        </>
        // </BrowserRouter>
    );
}

export default App;
