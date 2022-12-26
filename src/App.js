import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import LanguageSelector from "./components/LanguageSelector";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function App() {
    const { t } = useTranslation();
    const [path, setPath] = useState(window.location.pathname);
    const handleNavLinkClick = (event) => {
        event.preventDefault();
        const path = event.target.attributes.href.value;
        window.history.pushState({}, "", path);
        setPath(path);
    };
    return (
        <div className="container">
            <div>
                <a href="/" title="Home" onClick={handleNavLinkClick}>
                    My TDD project
                </a>
                <a href="/signup" title="Signup" onClick={handleNavLinkClick}>
                    {t("signUp")}
                </a>
                <a href="/login" title="Login" onClick={handleNavLinkClick}>
                    Login
                </a>
            </div>
            {path === "/" && <HomePage />}
            {path === "/signup" && <SignUpPage />}
            {path === "/login" && <LoginPage />}
            {path.startsWith("/user/") && <UserPage />}
            <LanguageSelector />
        </div>
    );
}

export default App;
