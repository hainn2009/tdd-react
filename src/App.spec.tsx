import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { routerConfig } from "./App";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

import { setupServer } from "msw/node";
import { rest } from "msw";

const server = setupServer(
    rest.post("/api/1.0/users/token/:token", (req, res, ctx) => {
        return res(ctx.status(200));
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
        path           | pageTestId
        ${"/"}         | ${"signup-page"}
        ${"/"}         | ${"login-page"}
        ${"/"}         | ${"user-page"}
        ${"/"}         | ${"activation-page"}
        ${"/signup"}   | ${"home-page"}
        ${"/signup"}   | ${"login-page"}
        ${"/signup"}   | ${"user-page"}
        ${"/signup"}   | ${"activation-page"}
        ${"/login"}    | ${"home-page"}
        ${"/login"}    | ${"signup-page"}
        ${"/login"}    | ${"user-page"}
        ${"/login"}    | ${"activation-page"}
        ${"/user/1"}   | ${"home-page"}
        ${"/user/1"}   | ${"signup-page"}
        ${"/user/1"}   | ${"login-page"}
        ${"/activate"} | ${"home-page"}
        ${"/activate"} | ${"signup-page"}
        ${"/activate"} | ${"user-page"}
        ${"/activate"} | ${"user-page"}
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
});
