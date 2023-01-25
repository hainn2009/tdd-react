import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import LanguageSelector from "./components/LanguageSelector";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import logo from "./assets/logo.jpg";
import { BrowserRouter, Route, Link, createBrowserRouter, createRoutesFromElements, Outlet } from "react-router-dom";
import ErrorPage from "./pages/errorPage";
import Contact, { loader as contactLoader } from "./pages/contactPage";
import ContactHomePage, { loader as contactHomePageLoader, action as contactAction } from "./pages/contactHomePage";
import EditContact, { action as editContactAction } from "./pages/editContactPage";
import { action as deleteContactAction } from "./pages/deleteContact";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />} errorElement={<ErrorPage />}>
            <Route path="contacts" element={<ContactHomePage />} loader={contactHomePageLoader} action={contactAction}>
                <Route path=':contactId' element={<Contact />} loader={contactLoader} />
                <Route path=":contactId/edit" element={<EditContact />} loader={contactLoader} action={editContactAction} />
                <Route path=":contactId/delete" action={deleteContactAction} />
            </Route>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/user/:id" element={<UserPage />} />
        </Route>

    )
    //     [{
    //     path: "/",
    //     element: <App />
    // }]
)

function App() {
    const { t } = useTranslation();
    const [path, setPath] = useState(window.location.pathname);
    const handleNavLinkClick = (event) => {
        event.preventDefault();
        const path = event.currentTarget.attributes.href.value;
        window.history.pushState({}, "", path);
        // setPath(path);
    };
    return (
        // <h1>Hello World</h1>
        // <BrowserRouter>
        <>
            <nav className="navbar navbar-expand navbar-light bg-light shadow-sm">
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
                        <Link className="nav-link" to="/signup" title="Signup">
                            {t("signUp")}
                        </Link>
                        <Link className="nav-link" to="/login" title="Login">
                            Login
                        </Link>
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

