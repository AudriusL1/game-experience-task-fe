import React from "react";
import Dropdown from "./Dropdown";

interface CategoriesDropdownProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoriesDropdown: React.FC<CategoriesDropdownProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  const categories = [
    { key: "", value: "None" },
    { key: "bug", value: "Bug" },
    { key: "suggestion", value: "Suggestion" },
    { key: "praise", value: "Praise" },
    { key: "inquiry", value: "Inquiry" },
  ];
  return (
    <Dropdown
      options={categories}
      selected={selectedCategory}
      onSelect={onCategoryChange}
      placeholder="Filter by Category"
    />
  );
};

export default CategoriesDropdown;
