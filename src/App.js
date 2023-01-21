import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import LanguageSelector from "./components/LanguageSelector";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import logo from "./assets/logo.jpg";
import { BrowserRouter, Route, Link, createBrowserRouter, Outlet } from "react-router-dom";

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
                        <Link className="nav-link" href="/signup" title="Signup" onClick={handleNavLinkClick}>
                            {t("signUp")}
                        </Link>
                        <Link className="nav-link" href="/login" title="Login" onClick={handleNavLinkClick}>
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
