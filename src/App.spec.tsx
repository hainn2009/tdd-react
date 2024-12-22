import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App, { routerConfig } from "./App";
import { RouterProvider, createMemoryRouter, BrowserRouter, MemoryRouter } from "react-router-dom";

import { setupServer } from "msw/node";
import { rest } from "msw";

const userAction = userEvent.setup();

const server = setupServer(
    rest.post("/api/1.0/users/token/:token", (req, res, ctx) => {
        return res(ctx.status(200));
    }),
    rest.get("/api/1.0/users", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ content: [{ id: 1, username: "user1", email: "user1@gmail.com" }], page: 0, size: 0, totalPages: 0 }));
    })
);
beforeAll(() => server.listen());

beforeEach(() => {
    server.resetHandlers();
});

describe("routing", () => {
    const setup = (path: string) => {
        // Change the url manually (not user any library)
        window.history.pushState({}, "", path);
        render(<RouterProvider router={createMemoryRouter(routerConfig, { initialEntries: [path] })} />);
    };
    it.each`
        path               | pageTestId
        ${"/"}             | ${"home-page"}
        ${"/signup"}       | ${"signup-page"}
        ${"/login"}        | ${"login-page"}
        ${"/user/1"}       | ${"user-page"}
        ${"/user/2"}       | ${"user-page"}
        ${"/activate/123"} | ${"activation-page"}
    `("display $pageTestId at $path", ({ path, pageTestId }) => {
        setup(path);
        const page = screen.getByTestId(pageTestId);
        expect(page).toBeInTheDocument();
    });
    it.each`
        path               | pageTestId
        ${"/"}             | ${"signup-page"}
        ${"/"}             | ${"login-page"}
        ${"/"}             | ${"user-page"}
        ${"/"}             | ${"activation-page"}
        ${"/signup"}       | ${"home-page"}
        ${"/signup"}       | ${"login-page"}
        ${"/signup"}       | ${"user-page"}
        ${"/signup"}       | ${"activation-page"}
        ${"/login"}        | ${"home-page"}
        ${"/login"}        | ${"signup-page"}
        ${"/login"}        | ${"user-page"}
        ${"/login"}        | ${"activation-page"}
        ${"/user/1"}       | ${"home-page"}
        ${"/user/1"}       | ${"signup-page"}
        ${"/user/1"}       | ${"login-page"}
        ${"/activate/123"} | ${"home-page"}
        ${"/activate/123"} | ${"signup-page"}
        ${"/activate/123"} | ${"user-page"}
        ${"/activate/123"} | ${"user-page"}
    `("does not display $pageTestId when path is $path", ({ path, pageTestId }) => {
        setup(path);
        const page = screen.queryByTestId(pageTestId);
        expect(page).not.toBeInTheDocument();
    });

    it.each`
        pageName
        ${"My TDD project My TDD project"}
        ${"Sign Up"}
        ${"Login"}
    `("display link to the $pageName page in the navbar", ({ pageName }) => {
        setup("/");
        const link = screen.getByRole("link", { name: pageName });
        expect(link).toBeInTheDocument();
    });
    it.each`
        initialPath  | clickedPath                        | pageTestId
        ${"/"}       | ${"Sign Up"}                       | ${"signup-page"}
        ${"/signup"} | ${"My TDD project My TDD project"} | ${"home-page"}
        ${"/signup"} | ${"Login"}                         | ${"login-page"}
    `("display $pageTestId after clicking $clickedPath link", async ({ initialPath, clickedPath, pageTestId }) => {
        setup(initialPath);
        const link = screen.getByRole("link", { name: clickedPath });
        await userEvent.click(link);
        expect(screen.getByTestId(pageTestId)).toBeInTheDocument();
    });
    it("display home page when clicking brand logo", async () => {
        setup("/login");
        const logo = screen.getByAltText("My TDD project");
        await userAction.click(logo);
        expect(screen.getByTestId("home-page")).toBeInTheDocument();
    });
    it("navigate to user page when clicking username", async () => {
        setup("/");
        const user1 = await screen.findByText("user1");
        await userAction.click(user1);
        expect(screen.getByTestId("user-page")).toBeInTheDocument();
    });
});
