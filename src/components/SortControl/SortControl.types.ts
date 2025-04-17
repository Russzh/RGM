export interface ISortControlProps {
  currentSelection: string;
  onSelectionChange: (newValue: string) => void;
}

export enum SortByOptions {
  "release_date" = "RELEASE DATE",
  "title" = "TITLE",
}
