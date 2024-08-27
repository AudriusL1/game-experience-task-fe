import React from "react";

interface DropdownProps {
  options: { key: string; value: string }[];
  selected: string;
  onSelect: (option: string) => void;
  placeholder?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selected,
  onSelect,
  placeholder = "Select an option",
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.value);
  };

  return (
    <div className="relative inline-block text-left">
      <select
        value={selected}
        onChange={handleChange}
        className="block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.key} value={option.key}>
            {option.value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
