import React from "react";
import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import HelloWorld from "./HelloWorld";

test("loads and displays greeting", async () => {
    // ARRANGE
    render(<HelloWorld />);

    // ACT
    // await userEvent.click(screen.getByText("Load Greeting"));
    await screen.findByRole("heading");

    // ASSERT
    expect(screen.getByRole("heading")).toHaveTextContent("Hello");
    // expect(screen.getByRole("button")).toBeDisabled();
});
