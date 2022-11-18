import { useState } from "react";
import axios from "axios";
import { handleRequest } from "msw";

export default function () {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordRepeat, setPasswordRepeat] = useState();
    const [apiProgress, setApiProgress] = useState(false);
    const [signUpSuccess, setSignUpSuccess] = useState(false);
    const [errors, setErrors] = useState();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setApiProgress(true);
            await axios.post("/API/1.0/users", { username, email, password });
            // setSignUpSuccess(true);
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
            if (error.response.status === 400) {
                // setErrors(error.response.data.validationErrors);
            }
        }
    };
    return (
        <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
            {!signUpSuccess && (
                <form className="card mt-5" data-testid="form-sign-up">
                    <div className="card-header">
                        <h1 className="text-center">Sign Up</h1>
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                onChange={(e) => setUsername(e.target.value)}
                                className="form-control"
                            />
                            <span>{errors && errors.username}</span>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                type="text"
                                id="email"
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="passwordRepeat" className="form-label">
                                Password Repeat
                            </label>
                            <input
                                type="password"
                                id="passwordRepeat"
                                onChange={(e) => setPasswordRepeat(e.target.value)}
                                className="form-control"
                            />
                        </div>
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
                                        aria-hidden="true"
                                    ></span>
                                )}
                                Sign Up
                            </button>
                        </div>
                    </div>
                </form>
            )}
            {signUpSuccess && (
                <div className="alert alert-success mt-3">Please check your e-mail to activate your account</div>
            )}
        </div>
    );
}
