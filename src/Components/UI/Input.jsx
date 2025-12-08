import React from "react";

export const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
}) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`p-2 border border-gray-300 rounded w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
  />
);

export default Input