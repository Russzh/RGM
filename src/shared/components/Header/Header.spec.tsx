import React from "react";
import { render, screen } from "@testing-library/react";

import { Header } from "./Header";

describe("Header Component", () => {
  it("should render the header container", () => {
    render(<Header />);

    const headerElement = screen.getByRole("banner");
    expect(headerElement).toBeInTheDocument();

    expect(headerElement).toHaveClass("headerContainer");
  });

  it("should render children inside the header content", () => {
    render(
      <Header>
        <p>Test Content</p>
      </Header>,
    );

    const headerContentElement = screen.getByText("Test Content");

    expect(headerContentElement).toBeInTheDocument();
  });

  it("should render empty header when no children are provided", () => {
    render(<Header />);

    const headerContentElement = screen.getByTestId("header-content");

    expect(headerContentElement).toBeInTheDocument();
    expect(headerContentElement.childNodes.length).toBe(0);
  });
});
