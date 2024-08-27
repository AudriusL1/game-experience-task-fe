import React from "react";
import Dropdown from "./Dropdown";

interface StateDropdownProps {
  selectedState: string;
  onStateChange: (category: string) => void;
}

const StateDropdown: React.FC<StateDropdownProps> = ({
  selectedState,
  onStateChange,
}) => {
  const states = [
    { key: "", value: "None" },
    { key: "new", value: "New" },
    { key: "in_progress", value: "In Progress" },
    { key: "completed", value: "Completed" },
  ];
  return (
    <Dropdown
      options={states}
      selected={selectedState}
      onSelect={onStateChange}
      placeholder="Filter by State"
    />
  );
};

export default StateDropdown;
