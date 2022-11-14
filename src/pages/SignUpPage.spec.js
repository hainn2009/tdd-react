import SignUpPage from "./SignUpPage";
import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { setupServer } from "msw/node";
import { rest } from "msw";

describe("Signup Page", () => {
    describe("Layout", () => {
        it("has header", () => {
            render(<SignUpPage />);
            const header = screen.queryByRole("heading", { name: "Sign Up" });
            expect(header).toBeInTheDocument();
        });
        it("has username input", () => {
            // const { container } = render(<SignUpPage />);
            // const input = container.querySelector("input");
            render(<SignUpPage />);
            const input = screen.getByLabelText("Username");
            expect(input).toBeInTheDocument();
        });
        it("has email input", () => {
            render(<SignUpPage />);
            const input = screen.getByLabelText("Email");
            expect(input).toBeInTheDocument();
        });
        it("has password input", () => {
            render(<SignUpPage />);
            const input = screen.getByLabelText("Password");
            expect(input).toBeInTheDocument();
        });
        it("has password type for password input", () => {
            render(<SignUpPage />);
            const input = screen.getByLabelText("Password");
            expect(input.type).toBe("password");
        });
        it("has password repeat input", () => {
            render(<SignUpPage />);
            const input = screen.getByLabelText("Password Repeat");
            expect(input).toBeInTheDocument();
        });
        it("has password type for password repeat input", () => {
            render(<SignUpPage />);
            const input = screen.getByLabelText("Password Repeat");
            expect(input.type).toBe("password");
        });
        it("has Sign up button", () => {
            render(<SignUpPage />);
            const button = screen.queryByRole("button", { name: "Sign Up" });
            expect(button).toBeInTheDocument();
        });
        it("disables the Sign Up button initially", () => {
            render(<SignUpPage />);
            const button = screen.queryByRole("button", { name: "Sign Up" });
            expect(button).toBeDisabled();
        });
    });
    describe("Interactions", () => {
        let requestBody;
        let counter = 0;
        const server = setupServer(
            rest.post("/api/1.0/users", (req, res, ctx) => {
                requestBody = req.body;
                counter += 1;
                return res(ctx.status(200));
            })
        );
        beforeAll(() => server.listen());
        beforeEach(() => {
            server.resetHandlers();
            requestBody = null;
            counter = 0;
        });
        afterAll(() => server.close());
        it("enables the Sign Up button when password and password repeat are the same", () => {
            render(<SignUpPage />);
            const passwordInput = screen.getByLabelText("Password");
            const passwordRepeatInput = screen.getByLabelText("Password Repeat");
            userEvent.type(passwordInput, "Password");
            userEvent.type(passwordRepeatInput, "Password");
            const button = screen.queryByRole("button", { name: "Sign Up" });
            expect(button).toBeEnabled();
        });
        it("call the backend when click the Sign Up button", async () => {
            render(<SignUpPage />);
            const usernameInput = screen.getByLabelText("Username");
            const emailInput = screen.getByLabelText("Email");
            const passwordInput = screen.getByLabelText("Password");
            const passwordRepeatInput = screen.getByLabelText("Password Repeat");
            userEvent.type(usernameInput, "user1");
            userEvent.type(emailInput, "user1@mail.com");
            userEvent.type(passwordInput, "Password");
            userEvent.type(passwordRepeatInput, "Password");
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
            render(<SignUpPage />);
            const usernameInput = screen.getByLabelText("Username");
            const emailInput = screen.getByLabelText("Email");
            const passwordInput = screen.getByLabelText("Password");
            const passwordRepeatInput = screen.getByLabelText("Password Repeat");
            userEvent.type(usernameInput, "user1");
            userEvent.type(emailInput, "user1@mail.com");
            userEvent.type(passwordInput, "Password");
            userEvent.type(passwordRepeatInput, "Password");
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
            render(<SignUpPage />);
            const usernameInput = screen.getByLabelText("Username");
            const emailInput = screen.getByLabelText("Email");
            const passwordInput = screen.getByLabelText("Password");
            const passwordRepeatInput = screen.getByLabelText("Password Repeat");
            userEvent.type(usernameInput, "user1");
            userEvent.type(emailInput, "user1@mail.com");
            userEvent.type(passwordInput, "Password");
            userEvent.type(passwordRepeatInput, "Password");
            const button = screen.queryByRole("button", { name: "Sign Up" });
            expect(screen.queryByRole("status", { hidden: true })).not.toBeInTheDocument();
            userEvent.click(button);
            const spinner = screen.getByRole("status", { hidden: true });
            expect(spinner).toBeInTheDocument();
        });
        it("display account activation notification after successful sign up request", async () => {
            render(<SignUpPage />);
            const usernameInput = screen.getByLabelText("Username");
            const emailInput = screen.getByLabelText("Email");
            const passwordInput = screen.getByLabelText("Password");
            const passwordRepeatInput = screen.getByLabelText("Password Repeat");
            userEvent.type(usernameInput, "user1");
            userEvent.type(emailInput, "user1@mail.com");
            userEvent.type(passwordInput, "Password");
            userEvent.type(passwordRepeatInput, "Password");
            const button = screen.queryByRole("button", { name: "Sign Up" });
            const message = "Please check your e-mail to activate your account";
            expect(screen.queryByText(message)).not.toBeInTheDocument();
            userEvent.click(button);
            const text = await screen.findByText(message);
            expect(text).toBeInTheDocument();
        });
        it("hides sign up form after successful sign up request", async () => {
            render(<SignUpPage />);
            const usernameInput = screen.getByLabelText("Username");
            const emailInput = screen.getByLabelText("Email");
            const passwordInput = screen.getByLabelText("Password");
            const passwordRepeatInput = screen.getByLabelText("Password Repeat");
            userEvent.type(usernameInput, "user1");
            userEvent.type(emailInput, "user1@mail.com");
            userEvent.type(passwordInput, "Password");
            userEvent.type(passwordRepeatInput, "Password");
            const button = screen.queryByRole("button", { name: "Sign Up" });
            const message = "Please check your e-mail to activate your account";
            const form = screen.getByTestId("form-sign-up");
            userEvent.click(button);
            await waitFor(() => {
                expect(form).not.toBeInTheDocument();
            });
            // await waitForElementToBeRemoved(form);
        });
    });
});
