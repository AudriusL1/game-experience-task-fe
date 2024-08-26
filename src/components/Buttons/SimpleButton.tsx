import React from "react";

interface SimpleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const SimpleButton: React.FC<SimpleButtonProps> = ({
  text,
  onClick,
  ...props
}) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={onClick}
      {...props}
    >
      {text}
    </button>
  );
};

export default SimpleButton;
