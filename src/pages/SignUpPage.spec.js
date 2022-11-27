import SignUpPage from "./SignUpPage";
import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { setupServer } from "msw/node";
import { rest } from "msw";

describe("Signup Page", () => {
    describe("Layout", () => {
        beforeEach(() => {
            render(<SignUpPage />);
        });
        it("has header", () => {
            const header = screen.queryByRole("heading", { name: "Sign Up" });
            expect(header).toBeInTheDocument();
        });
        it("has username input", () => {
            // const { container } = render(<SignUpPage />);
            // const input = container.querySelector("input");
            const input = screen.getByLabelText("Username");
            expect(input).toBeInTheDocument();
        });
        it("has email input", () => {
            const input = screen.getByLabelText("Email");
            expect(input).toBeInTheDocument();
        });
        it("has password input", () => {
            const input = screen.getByLabelText("Password");
            expect(input).toBeInTheDocument();
        });
        it("has password type for password input", () => {
            const input = screen.getByLabelText("Password");
            expect(input.type).toBe("password");
        });
        it("has password repeat input", () => {
            const input = screen.getByLabelText("Password Repeat");
            expect(input).toBeInTheDocument();
        });
        it("has password type for password repeat input", () => {
            const input = screen.getByLabelText("Password Repeat");
            expect(input.type).toBe("password");
        });
        it("has Sign up button", () => {
            const button = screen.queryByRole("button", { name: "Sign Up" });
            expect(button).toBeInTheDocument();
        });
        it("disables the Sign Up button initially", () => {
            const button = screen.queryByRole("button", { name: "Sign Up" });
            expect(button).toBeDisabled();
        });
    });
    describe("Interactions", () => {
        let requestBody;
        let counter = 0;
        const server = setupServer(
            rest.post("/api/1.0/users", async (req, res, ctx) => {
                requestBody = await req.json();
                counter += 1;
                return res(ctx.status(200));
            })
        );
        let passwordInput;
        let passwordRepeatInput;
        let signUpButton;
        beforeAll(() => server.listen());
        beforeEach(() => {
            requestBody = null;
            counter = 0;
            render(<SignUpPage />);
            const usernameInput = screen.getByLabelText("Username");
            const emailInput = screen.getByLabelText("Email");
            passwordInput = screen.getByLabelText("Password");
            passwordRepeatInput = screen.getByLabelText("Password Repeat");
            userEvent.type(usernameInput, "user1");
            userEvent.type(emailInput, "user1@mail.com");
            userEvent.type(passwordInput, "Password");
            userEvent.type(passwordRepeatInput, "Password");
            signUpButton = screen.queryByRole("button", { name: "Sign Up" });
        });
        afterEach(() => {
            // quan trong vi no se thiet lap lai rest.post cho chung ta
            // nhung truong hop nao can override handler thi viet truc tiep tai tung case
            server.resetHandlers();
        });
        afterAll(() => server.close());
        it("enables the Sign Up button when password and password repeat are the same", () => {
            // const passwordInput = screen.getByLabelText("Password");
            // const passwordRepeatInput = screen.getByLabelText("Password Repeat");
            // userEvent.type(passwordInput, "Password");
            // userEvent.type(passwordRepeatInput, "Password");
            const button = screen.queryByRole("button", { name: "Sign Up" });
            expect(button).toBeEnabled();
        });
        it("call the backend when click the Sign Up button", async () => {
            const button = screen.queryByRole("button", { name: "Sign Up" });
            // const mockfn = jest.fn();
            // // axios.post = mockfn;
            // window.fetch = mockfn;
            userEvent.click(button);

            await screen.findByText("Please check your e-mail to activate your account");

            // const firstCallOfMockFuntion = mockfn.mock.calls[0];
            // const body = JSON.parse(firstCallOfMockFuntion[1].body);
            expect(requestBody).toEqual({ username: "user1", email: "user1@mail.com", password: "Password" });
        });
        it("disables sign up button when there is an ongoing api call", async () => {
            const button = screen.queryByRole("button", { name: "Sign Up" });

            // const mockfn = jest.fn();
            // // axios.post = mockfn;
            // window.fetch = mockfn;

            userEvent.click(button);
            userEvent.click(button);
            await screen.findByText("Please check your e-mail to activate your account");

            // const firstCallOfMockFuntion = mockfn.mock.calls[0];
            // const body = JSON.parse(firstCallOfMockFuntion[1].body);
            expect(counter).toBe(1);
        });
        it("display the spinner after click the Sign Up button", async () => {
            const button = screen.queryByRole("button", { name: "Sign Up" });
            expect(screen.queryByRole("status", { hidden: true })).not.toBeInTheDocument();
            userEvent.click(button);
            const spinner = screen.getByRole("status", { hidden: true });
            // Cần phải thực hiện việc waif for ở đây nghĩa là đợi cho các update state chạy hết
            // Sau khi click button, nó còn gọi về backend, update state dựa trên kết quả trả về
            // Bình thường thì test case kết thúc mà không chờ toàn bộ hành động update state
            // Nên sẽ báo warning ở đây dù test case vẫn pass
            await waitFor(() => {
                expect(spinner).toBeInTheDocument();
            });
        });
        it("display account activation notification after successful sign up request", async () => {
            const button = screen.queryByRole("button", { name: "Sign Up" });
            const message = "Please check your e-mail to activate your account";
            expect(screen.queryByText(message)).not.toBeInTheDocument();
            userEvent.click(button);
            // cái này nghĩa là chờ cho đến khi
            const text = await screen.findByText(message);
            expect(text).toBeInTheDocument();
        });
        it("hides sign up form after successful sign up request", async () => {
            const button = screen.queryByRole("button", { name: "Sign Up" });
            const message = "Please check your e-mail to activate your account";
            const form = screen.getByTestId("form-sign-up");
            userEvent.click(button);
            await waitFor(() => {
                expect(form).not.toBeInTheDocument();
            });
            // await waitForElementToBeRemoved(form);
        });
        const generateValidationError = (field, message) =>
            rest.post("/api/1.0/users", (req, res, ctx) => {
                return res(
                    ctx.status(400),
                    ctx.json({
                        validationErrors: { [field]: message },
                    })
                );
            });
        it.each`
            field         | message
            ${"username"} | ${"Username cannot be null"}
            ${"email"}    | ${"E-mail cannot be null"}
            ${"password"} | ${"Password cannot be null"}
        `("displays $message for $field", async ({ field, message }) => {
            server.use(generateValidationError(field, message));
            const button = screen.queryByRole("button", { name: "Sign Up" });
            userEvent.click(button);
            expect(await screen.findByText(message)).toBeInTheDocument();
        });
        it("hide the spinner and enable the sign up button after api response received", async () => {
            server.use(generateValidationError("username", "Username cannot be null"));
            const button = screen.queryByRole("button", { name: "Sign Up" });
            userEvent.click(button);
            await screen.findByText("Username cannot be null");
            // get the spinner
            expect(screen.queryByRole("status")).not.toBeInTheDocument();
            expect(button).toBeEnabled();
        });
        it("displays error message when password repeat mismatch", async () => {
            userEvent.type(passwordInput, "Password");
            userEvent.type(passwordRepeatInput, "Mismatch Password");
            await screen.findByText("Password mismatch");
        });
    });
});
