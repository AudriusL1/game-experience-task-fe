import React from "react";
import { Feedback } from "../../views/Feedbacks/types";
import SimpleButton from "../../components/Buttons/SimpleButton.tsx";

interface Column {
  label: string;
  key: string;
}

interface TableProps {
  columns: Column[];
  data: Feedback[];
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
  withActions?: boolean;
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  currentPage,
  lastPage,
  onPageChange,
  withActions,
}) => {
  return (
    <div className="p-4">
      <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            {columns.map((col) => (
              <th key={col.key} className="py-2 px-4 text-left">
                {col.label}
              </th>
            ))}
            {withActions && (
              <th className="py-2 px-4 text-left">{"Actions"}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              {columns.map((col) => (
                <td key={col.key} className="py-2 px-4 border-b">
                  {item[col.key as keyof Feedback]}
                </td>
              ))}
              {withActions && (
                <td className="py-2 px-4 border-b">
                  <SimpleButton
                    text={"View"}
                    onClick={() => console.log("clicked", item.id)}
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-center space-x-2">
        {Array.from({ length: lastPage }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => onPageChange(index + 1)}
            disabled={currentPage === index + 1}
            className={`py-2 px-4 rounded-lg ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } focus:outline-none`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Table;
