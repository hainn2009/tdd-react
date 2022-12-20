import { render, screen } from "@testing-library/react";
import App from "./App";

describe("routing", () => {
    const setup = (path) => {
        window.history.pushState({}, "", path);
        // render(<App />);
    };
    it.each`
        path         | pageTestId
        ${"/"}       | ${"home-page"}
        ${"/signup"} | ${"signup-page"}
        ${"/login"}  | ${"login-page"}
        ${"/user/1"} | ${"user-page"}
        ${"/user/2"} | ${"user-page"}
    `("display $pageTestId at $path", ({ path, pageTestId }) => {
        setup(path);
        const page = screen.queryByTestId(pageTestId);
        expect(page).toBeInTheDocument();
    });
    it.each`
        path         | pageTestId
        ${"/"}       | ${"signup-page"}
        ${"/"}       | ${"login-page"}
        ${"/"}       | ${"user-page"}
        ${"/signup"} | ${"home-page"}
        ${"/signup"} | ${"login-page"}
        ${"/signup"} | ${"user-page"}
        ${"/login"}  | ${"home-page"}
        ${"/login"}  | ${"signup-page"}
        ${"/login"}  | ${"user-page"}
        ${"/user"}   | ${"home-page"}
        ${"/user"}   | ${"signup-page"}
        ${"/user"}   | ${"login-page"}
    `("does not display $pageTestId at $path", ({ path, pageTestId }) => {
        setup(path);
        const page = screen.queryByTestId(pageTestId);
        expect(page).not.toBeInTheDocument();
    });
});
