import React from "react";
import { render, screen } from "@testing-library/react";
import { LoginPage } from "./LoginPage";
import userEvent from "@testing-library/user-event";

describe("Login Page", () => {
    describe("Layout", () => {
        beforeEach(() => {
            render(<LoginPage />);
        });
        it("has header of Login", () => {
            render(<LoginPage />);
            const header = screen.queryByRole("heading", { value: { text: "Login" } });
            expect(header).toHaveTextContent("Login");
        });

        it("has input for username", () => {
            render(<LoginPage />);
            const input = screen.queryByPlaceholderText("Your username");
            expect(input).toBeInTheDocument();
        });

        it("has input for password", () => {
            render(<LoginPage />);
            const input = screen.queryByPlaceholderText("Your password");
            expect(input).toBeInTheDocument();
        });

        it("has password type for password input", () => {
            render(<LoginPage />);
            const input = screen.queryByPlaceholderText("Your password");
            expect(input.type).toBe("password");
        });

        it("has button for login", () => {
            render(<LoginPage />);
            const loginButton = screen.queryByRole("button", { value: { text: "Login" } });
            expect(loginButton).toBeInTheDocument();
        });

        describe("Interactions", () => {
            it("set the value of input username to the state", () => {
                render(<LoginPage />);
                const inputUsername = screen.queryByPlaceholderText("Your username");
                userEvent.type(inputUsername, "my-user-name");
                expect(inputUsername).toHaveValue("my-user-name");
            });
        });
    });
});
