import React from "react";

export const SelectTrigger = ({ children, className = "" }) => {
  return (
    <div
      className={`border border-gray-300 rounded p-2 bg-white w-full ${className}`}
    >
      {children}
    </div>
  );
};

export const SelectValue = ({ placeholder }) => {
  return <span className="text-gray-500">{placeholder}</span>;
};

export const Select = ({ value, onValueChange, children }) => {
  const items = React.Children.toArray(children).filter(
    (child) => child.type === SelectContent
  )[0];

  const handleChange = (e) => {
    onValueChange(e.target.value);
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      className="p-2 border border-gray-300 rounded w-full bg-white focus:ring-2 focus:ring-blue-500"
    >
      {items &&
        React.Children.map(items.props.children, (item) => (
          <option key={item.props.value} value={item.props.value}>
            {item.props.children}
          </option>
        ))}
    </select>
  );
};

export const SelectContent = ({ children }) => <div>{children}</div>; 
export const SelectItem = ({ children, value, key }) => (
  <option value={value} key={key}>
    {children}
  </option>
); 
