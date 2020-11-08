import React from "react";

function Input({
  callback,
  type = "text",
  disabled = false,
  readOnly = false,
  placeholder = "",
  id,
  name,
  ariaDescribedby,
}) {
  return (
    <input
      type={type}
      disabled={disabled}
      readOnly={readOnly}
      className="form-control"
      id={id}
      name={name}
      aria-describedby={ariaDescribedby}
      placeholder={placeholder}
      onChange={({ target: { value, name } }) => callback(value, name)}
    />
  );
}

export default Input;
