import React from "react";
import { useNavigate } from "react-router-dom";

interface GoBackButtonProps {
  text: string;
}

const GoBackButton: React.FC<GoBackButtonProps> = ({ text }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default GoBackButton;
