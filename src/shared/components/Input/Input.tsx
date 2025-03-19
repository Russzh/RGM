import React from "react";

import globalStyles from "../../../index.module.scss";
import { IInputProps, InputPlaceholders } from "./Input.types";

const { invalidClass } = globalStyles;

const Input: React.FC<IInputProps> = ({
  inputId,
  invalid,
  type,
  inputValue,
  inputPlaceholder,
  onChange,
}) => {
  return (
    <input
      value={inputValue}
      id={inputId}
      className={invalid ? invalidClass : ""}
      type={type ?? "text"}
      placeholder={inputPlaceholder ?? InputPlaceholders.Default}
      onChange={onChange}
    />
  );
};

export { Input };
