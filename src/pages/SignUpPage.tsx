import { MouseEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import Input from "../components/InputComponent";
import { signUp } from "../api/apiCall";
import axios from "axios";

const SignUpPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [apiProgress, setApiProgress] = useState(false);
    const [signUpSuccess, setSignUpSuccess] = useState(false);
    const [errors, setErrors] = useState<{
        username: string;
        email: string;
        password: string;
    }>({ username: "", email: "", password: "" });
    const { t } = useTranslation();

    const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
        try {
            e.preventDefault();
            setApiProgress(true);
            await signUp({
                username,
                email,
                password,
            });
            setSignUpSuccess(true);
            // fetch("API/1.0/users", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify({
            //         username,
            //         email,
            //         password,
            //     }),
            // });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Handle Axios error
                // console.error("Axios error:", error.message);
                if (error.response) {
                    // Server responded with a status other than 200 range
                    // console.error("Response data:", error.response.data);
                    // console.error("Response status:", error.response.status);
                    if (error.response.status === 400) {
                        setErrors(error.response.data.validationErrors);
                    }
                } else if (error.request) {
                    // Request was made but no response received
                    console.error("Request data:", error.request);
                }
            } else {
                // Handle non-Axios error
                console.error("Unknown error:", error);
            }
            setApiProgress(false);
        }
    };
    return (
        <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2" data-testid="signup-page">
            {!signUpSuccess && (
                <form className="card mt-5" data-testid="form-sign-up">
                    <div className="card-header">
                        <h1 className="text-center">{t("signUp")}</h1>
                    </div>
                    <div className="card-body">
                        <Input
                            id="username"
                            label={t("username")}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setErrors({ ...errors, username: "" });
                            }}
                            help={errors && errors.username}
                        />
                        <Input
                            id="email"
                            label={t("email")}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setErrors({ ...errors, email: "" });
                            }}
                            help={errors && errors.email}
                        />
                        <Input
                            id="password"
                            label={t("password")}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setErrors({ ...errors, password: "" });
                            }}
                            help={errors && errors.password}
                            type="password"
                        />
                        <Input
                            id="passwordRepeat"
                            label={t("passwordRepeat")}
                            onChange={(e) => setPasswordRepeat(e.target.value)}
                            help={password !== passwordRepeat ? t("passwordMismatchValidation") : ""}
                            type="password"
                        />
                        {/* <div className="mb-3">
                            <label htmlFor="passwordRepeat" className="form-label">
                                Password Repeat
                            </label>
                            <input
                                type="password"
                                id="passwordRepeat"
                                onChange={(e) => setPasswordRepeat(e.target.value)}
                                className="form-control"
                            />
                        </div> */}
                        <div className="text-center">
                            <button
                                className="btn btn-primary"
                                onClick={handleSubmit}
                                disabled={!password || !passwordRepeat || password !== passwordRepeat || apiProgress}
                            >
                                {apiProgress && (
                                    <span
                                        className="spinner-border spinner-border-sm"
                                        role="status"
                                        aria-hidden="true" // cái này nghĩa là view from accessibility thì nó là hidden vì vốn không cần nó làm gì
                                    ></span>
                                )}
                                {t("signUp")}
                            </button>
                        </div>
                    </div>
                </form>
            )}
            {signUpSuccess && <div className="alert alert-success mt-3">Please check your e-mail to activate your account</div>}
        </div>
    );
};

export default SignUpPage;
