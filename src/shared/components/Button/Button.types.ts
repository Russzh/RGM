import React from "react";

export interface IButtonProps {
  buttonText: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (event: React.MouseEvent) => void;
}

export enum ButtonTexts {
  "Search" = "Search",
  "ContextMenu" = "...",
  "Edit" = "Edit",
  "Delete" = "Delete",
  "AddMovie" = "+ Add Movie",
  "Confirm" = "CONFIRM",
  "Submit" = "SUBMIT",
  "Reset" = "RESET",
}
