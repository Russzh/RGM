import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Counter from "./Counter";

describe("Counter", () => {
  it("should render with initial value", () => {
    render(<Counter initialValue={5} />);

    expect(screen.getByText("Count: 5")).toBeInTheDocument();
  });

  it("should increment the count", async () => {
    render(<Counter initialValue={5} />);

    await userEvent.click(screen.getByText("Increment"));

    expect(screen.getByText("Count: 6")).toBeInTheDocument();
  });

  it("should decrement the count", async () => {
    render(<Counter initialValue={5} />);

    await userEvent.click(screen.getByText("Decrement"));

    expect(screen.getByText("Count: 4")).toBeInTheDocument();
  });
});
