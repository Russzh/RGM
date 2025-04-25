import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useOutletContext } from "react-router";

import { SearchForm } from "./SearchForm";
import { ButtonTexts, InputPlaceholders } from "@shared/components";

const mockUpdateSearchParams = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useOutletContext: jest.fn(),
}));

describe("SearchForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useOutletContext as jest.Mock).mockReturnValue({
      updateSearchParams: mockUpdateSearchParams,
    });
  });

  it("should be rendered with initial search query", () => {
    render(<SearchForm initialSearchQuery="Initial Query" />);
    const input = screen.getByPlaceholderText(
      InputPlaceholders.WhatDoYouWantToWatch,
    ) as HTMLInputElement;

    expect(input.value).toBe("Initial Query");
  });

  it("should initialize searchQuery with an empty string if initialSearchQuery is not provided", () => {
    render(<SearchForm initialSearchQuery={undefined} />);

    const input = screen.getByPlaceholderText(
      InputPlaceholders.WhatDoYouWantToWatch,
    ) as HTMLInputElement;

    expect(input.value).toBe("");
  });

  it("should update search query on input change", async () => {
    render(<SearchForm initialSearchQuery="" />);
    const input = screen.getByPlaceholderText(
      InputPlaceholders.WhatDoYouWantToWatch,
    ) as HTMLInputElement;

    await userEvent.type(input, "New Query");

    expect(input.value).toBe("New Query");
  });

  it("should call updateSearchParams with the correct query when form is submitted", async () => {
    render(<SearchForm initialSearchQuery="Initial Query" />);
    const button = screen.getByText(ButtonTexts.Search.toUpperCase());

    await userEvent.click(button);

    expect(mockUpdateSearchParams).toHaveBeenCalledTimes(1);
    expect(mockUpdateSearchParams).toHaveBeenCalledWith({
      query: "Initial Query",
    });
  });

  it("should render the submit button with correct text and type", () => {
    render(<SearchForm initialSearchQuery="" />);
    const button = screen.getByText(ButtonTexts.Search.toUpperCase());

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "submit");
  });
});
