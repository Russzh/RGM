export interface IButtonProps {
  buttonText: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}
