import React from "react";

import styles from "./Button.module.scss";
import { IButtonProps } from "./Button.types";

const { button } = styles;

const Button: React.FC<IButtonProps> = ({
  className,
  type,
  buttonText,
  onClick,
}) => {
  const toUpperCase = (text: string): string => text.toUpperCase();

  return (
    <button
      className={`${button} ${className}`}
      type={type ?? "button"}
      onClick={onClick}
    >
      {toUpperCase(buttonText)}
    </button>
  );
};

export { Button };
