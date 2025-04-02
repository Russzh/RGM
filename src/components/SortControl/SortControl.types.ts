export interface ISortControlProps {
  currentSelection: string;
  onSelectionChange: (newValue: string) => void;
}

export enum SortByOptions {
  "ReleaseDate" = "RELEASE DATE",
  "Title" = "TITLE",
}
