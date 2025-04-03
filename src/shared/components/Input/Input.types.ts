export interface IInputProps {
  inputId: string;
  type?: string;
  invalid: boolean;
  inputValue: string;
  inputPlaceholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export enum InputPlaceholders {
  Default = "Please enter a search query",
  WhatDoYouWantToWatch = "What do you want to watch?",
}
