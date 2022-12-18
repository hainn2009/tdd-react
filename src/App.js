import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import LanguageSelector from "./components/LanguageSelector";

function App() {
    return (
        <div className="container">
            {window.location.pathname === "/" && <HomePage />}
            {window.location.pathname === "/signup" && <SignUpPage />}
            <LanguageSelector />
        </div>
    );
}

export default App;
