export interface IButtonProps {
  buttonText: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export enum ButtonTexts {
  "Search" = "Search",
  "ContextMenu" = "...",
  "Edit" = "Edit",
  "Delete" = "Delete",
}
