import React from "react";

export interface IDialogProps {
  title: string | React.ReactNode;
  children: React.ReactNode;
  buttonsText: { okText: string; cancelText?: string };
  isConfirmModal?: boolean;
  onOkClick: () => void;
  onCancelClick: () => void;
}

export enum DialogTitles {
  "Delete" = "DELETE MOVIE",
  "Edit" = "EDIT MOVIE",
  "Add" = "ADD MOVIE",
}

export enum DialogConfirmTexts {
  "Delete" = "Are you sure you want to delete this movie?",
}

export enum DialogButtonTexts {
  "Confirm" = "CONFIRM",
  "Submit" = "SUBMIT",
  "Reset" = "RESET",
}

export const datepickerFormat = "YYYY-MM-DD";
