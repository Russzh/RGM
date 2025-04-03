import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SortControl } from "@components/SortControl/SortControl";
import { SortByOptions } from "@components/SortControl/SortControl.types";

describe("SortControl", () => {
  it("should render sortControlWrapper with correct number of option", () => {
    render(
      <SortControl
        currentSelection={Object.keys(SortByOptions)[0]}
        onSelectionChange={jest.fn()}
      />,
    );

    const sortControlWrapper = screen.queryByTestId("sort-control-wrapper");

    expect(sortControlWrapper).toBeInTheDocument();
    expect(screen.getAllByRole("option")).toHaveLength(2);
  });

  it("should render select with correct value", () => {
    render(
      <SortControl
        currentSelection={Object.keys(SortByOptions)[0]}
        onSelectionChange={jest.fn()}
      />,
    );

    const select = screen.getByRole("combobox") as HTMLSelectElement;
    expect(select.value).toBe(Object.keys(SortByOptions)[0]);
  });

  it("should call onSelectionChange method with the correct value when an option is selected", async () => {
    const mockOnSelectionChange = jest.fn();

    render(
      <SortControl
        currentSelection={Object.keys(SortByOptions)[0]}
        onSelectionChange={mockOnSelectionChange}
      />,
    );

    const select = screen.getByRole("combobox") as HTMLSelectElement;
    await userEvent.selectOptions(select, Object.keys(SortByOptions)[1]);

    expect(mockOnSelectionChange).toHaveBeenCalledWith(
      Object.keys(SortByOptions)[1],
    );
  });
});
