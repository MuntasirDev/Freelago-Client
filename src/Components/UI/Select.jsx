// src/components/ui/select.jsx
import React from "react";

// SelectTrigger: Mocked component to visually hold the selected value (used only for styling if full Select is implemented)
export const SelectTrigger = ({ children, className = "" }) => {
  return (
    <div
      className={`border border-gray-300 rounded p-2 bg-white w-full ${className}`}
    >
      {children}
    </div>
  );
};

// SelectValue: Mocked component to display the placeholder
export const SelectValue = ({ placeholder }) => {
  return <span className="text-gray-500">{placeholder}</span>;
};

// Select: The main component rendering the HTML <select> tag
export const Select = ({ value, onValueChange, children }) => {
  // Find the SelectContent child to extract options
  const items = React.Children.toArray(children).find(
    (child) => child.type === SelectContent
  );

  const handleChange = (e) => {
    onValueChange(e.target.value);
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      // Full width, basic styling for a functional select input
      className="p-2 border border-gray-300 rounded w-full bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none"
    >
      {items &&
        React.Children.map(items.props.children, (item) => (
          // Ensure SelectItem children are correctly mapped to <option>
          <option key={item.props.value} value={item.props.value}>
            {item.props.children}
          </option>
        ))}
    </select>
  );
};

// SelectContent: A dummy container for SelectItem children (only used to structure the options inside <Select>)
export const SelectContent = ({ children }) => <div>{children}</div>; 

// SelectItem: A placeholder component; its props are used to render the final <option>
export const SelectItem = ({ children, value }) => (
    // Note: The actual <option> rendering happens inside the parent <Select> component.
    // This return is technically redundant in this structure but keeps the component API clean.
    <>{children}</> 
);

export default Select