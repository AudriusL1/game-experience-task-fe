import React from "react";
import { Feedback } from "../../api/types";
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
  onActionClick?: (item: Feedback) => void;
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  currentPage,
  lastPage,
  onPageChange,
  withActions,
  onActionClick,
}) => {
  return (
    <div className="p-4 overflow-x-auto">
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
        {data && data.length > 0 ? (
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
                      onClick={() => onActionClick?.(item)}
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        ) : (
          <tr>
            <td
              colSpan={columns.length + 1}
              className="px-6 py-4 text-center text-gray-500"
            >
              No data
            </td>
          </tr>
        )}
      </table>
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="py-2 px-4 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none"
        >
          Previous
        </button>
        <span className="py-2 px-4 text-gray-700">
          Page {currentPage} of {lastPage}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === lastPage}
          className="py-2 px-4 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
