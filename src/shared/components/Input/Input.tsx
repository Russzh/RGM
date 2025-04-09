import React from "react";

import globalStyles from "../../../index.module.scss";
import styles from "./Input.module.scss";
import { IInputProps, InputPlaceholders } from "./Input.types";

const { invalidClass } = globalStyles;
const { inputContainer } = styles;

const Input: React.FC<IInputProps> = ({
  inputId,
  invalid,
  type,
  currentValue,
  defaultValue,
  inputPlaceholder,
  onChange,
  onBlur,
  labelText,
}) => {
  const renderWrapper = (children: React.ReactNode) =>
    labelText ? (
      <div className={inputContainer}>{children}</div>
    ) : (
      <>{children}</>
    );

  return renderWrapper(
    <>
      {labelText && <label htmlFor={inputId}>{labelText}</label>}

      <input
        onBlur={onBlur}
        value={currentValue}
        defaultValue={defaultValue}
        id={inputId}
        className={invalid ? invalidClass : ""}
        type={type ?? "text"}
        placeholder={inputPlaceholder ?? InputPlaceholders.Default}
        onChange={onChange}
      />
    </>,
  );
};

export { Input };
