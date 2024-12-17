import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import LanguageSelector from "./components/LanguageSelector";
import { useTranslation } from "react-i18next";
import logo from "./assets/logo.jpg";
import { Route, Link, createBrowserRouter, createRoutesFromElements, Outlet, NavLink } from "react-router-dom";
import ErrorPage from "./pages/errorPage";
import TodoApp from "./pages/TodoApp";
import WeatherApp from "./pages/WeatherApp";
import { Test } from "./pages/Test";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />} errorElement={<ErrorPage />}>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/user/:id" element={<UserPage />} />
            <Route path="/todos" element={<TodoApp />} />
            <Route path="/weather" element={<WeatherApp />} />
            <Route path="test" element={<Test />} />
        </Route>
    )
);

function App() {
    const { t } = useTranslation();
    return (
        <>
            <nav className="navbar navbar-expand bg-light shadow-sm nav-pills">
                <div className="container">
                    <Link className="navbar-brand text-primary" to="/" title="Home">
                        <img src={logo} alt="My TDD project" width="60" />
                        My TDD project
                    </Link>
                    <div className="navbar-nav text-nowrap">
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
                        <NavLink className="nav-item nav-link" to="/todos" title="Contact">
                            Todo App
                        </NavLink>
                        <NavLink className="nav-item nav-link" to="/weather" title="Weather App">
                            Weather App
                        </NavLink>
                        <NavLink className="nav-item nav-link" to="/test" title="Test">
                            Test
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
