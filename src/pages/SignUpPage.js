import { useState } from "react";
import axios from "axios";
import { handleRequest } from "msw";
import Input from "../components/InputComponent";

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
            if (error.response.status === 400) {
                setErrors(error.response.data.validationErrors);
            }
            setApiProgress(false);
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
                        <Input
                            id="username"
                            label="Username"
                            onChange={(e) => setUsername(e.target.value)}
                            help={errors && errors.username}
                        />
                        <Input
                            id="email"
                            label="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            help={errors && errors.email}
                        />
                        <Input
                            id="password"
                            label="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            help={errors && errors.password}
                            type="password"
                        />
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
