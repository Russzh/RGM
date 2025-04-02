import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SearchForm } from "./SearchForm";
import { ButtonTexts, InputPlaceholders } from "@shared/components";

describe("SearchForm", () => {
  it("renders with initial search query", () => {
    render(
      <SearchForm
        initialSearchQuery="Initial Query"
        onSearchClick={jest.fn()}
      />,
    );
    const input = screen.getByPlaceholderText(
      InputPlaceholders.WhatDoYouWantToWatch,
    ) as HTMLInputElement;

    expect(input.value).toBe("Initial Query");
  });

  it("updates search query on input change", async () => {
    render(<SearchForm initialSearchQuery="" onSearchClick={jest.fn()} />);
    const input = screen.getByPlaceholderText(
      InputPlaceholders.WhatDoYouWantToWatch,
    ) as HTMLInputElement;

    await userEvent.type(input, "New Query");

    expect(input.value).toBe("New Query");
  });

  it("calls onSearchClick with the correct query when form is submitted", async () => {
    const mockOnSearchClick = jest.fn();
    render(
      <SearchForm
        initialSearchQuery="Initial Query"
        onSearchClick={mockOnSearchClick}
      />,
    );
    const button = screen.getByText(ButtonTexts.Search.toUpperCase());

    await userEvent.click(button);

    expect(mockOnSearchClick).toHaveBeenCalledTimes(1);
    expect(mockOnSearchClick).toHaveBeenCalledWith("Initial Query");
  });

  it("renders the submit button with correct text and type", () => {
    render(<SearchForm initialSearchQuery="" onSearchClick={jest.fn()} />);
    const button = screen.getByText(ButtonTexts.Search.toUpperCase());

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "submit");
  });
});
