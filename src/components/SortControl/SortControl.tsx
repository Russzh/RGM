import React from "react";

import styles from "./SortControl.module.scss";
import { ISortControlProps, SortByOptions } from "./SortControl.types";

const { sortControlWrapper, sortControlSelect } = styles;

const SortControl: React.FC<ISortControlProps> = ({
  currentSelection,
  onSelectionChange,
}) => {
  return (
    <div className={sortControlWrapper}>
      <label htmlFor="sort-control-select">SORT BY:</label>
      <select
        id="sort-control-select"
        value={currentSelection}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
          onSelectionChange(event.target.value)
        }
        className={sortControlSelect}
      >
        {Object.entries(SortByOptions).map(([key, optionName]) => (
          <option key={key} value={key}>
            {optionName}
          </option>
        ))}
      </select>
    </div>
  );
};

export { SortControl };
