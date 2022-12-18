import { render, screen } from "@testing-library/react";
import App from "./App";

describe("routing", () => {
    beforeEach(() => {
        // render(<App />);
    });
    it.each`
        path         | pageTestId
        ${"/"}       | ${"home-page"}
        ${"/signup"} | ${"signup-page"}
    `;
    it("display home page at /", () => {
        const homePage = screen.getByTestId("home-page");
        expect(homePage).toBeInTheDocument();
    });
    it("does not display SignUpPage when at /", () => {
        // choose query here because getBy will throw exception if not found
        // but getBy will return null
        const signUpPage = screen.queryByTestId("signup-page");
        expect(signUpPage).not.toBeInTheDocument();
    });
    it("display SignUpPage at /signup", () => {
        window.history.pushState({}, "", "/signup");
        // re-render after changing the url
        render(<App />);
        const signUpPage = screen.queryByTestId("signup-page");
        expect(signUpPage).toBeInTheDocument();
    });
    it("does not display HomePage when at /signup", () => {
        window.history.pushState({}, "", "/signup");
        render(<App />);
        const homePage = screen.queryByTestId("home-page");
        expect(homePage).not.toBeInTheDocument();
    });
});
