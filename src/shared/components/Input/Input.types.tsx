export interface IInputProps {
  inputId: string;
  type?: string;
  invalid: boolean;
  inputValue: string;
  inputPlaceholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
