import React from "react";
import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Test } from "./index";

test("loads and displays greeting", async () => {
    // ARRANGE
    render(<Test />);

    // ACT
    // await userEvent.click(screen.getByText("Load Greeting"));
    await screen.findByRole("heading");

    // ASSERT
    expect(screen.getByRole("heading")).toHaveTextContent("Hello, this is test page");
    // expect(screen.getByRole("button")).toBeDisabled();
});
