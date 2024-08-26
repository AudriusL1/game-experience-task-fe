import { useEffect, useState } from "react";
import axiosClient from "../../axios-client.js";
import Table from "../../components/Table/Table.tsx";
import Dropdown from "../../components/Select/Dropdown.tsx";
import { Feedback, FetchResponse } from "./types"; // Adjust the import path as needed

export default function Feedbacks() {
  const [data, setData] = useState<Feedback[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const columns = [
    { label: "Name", key: "game_name" },
    { label: "State", key: "feedback_state" },
    { label: "Platform", key: "platform" },
    { label: "Version", key: "version" },
    { label: "Category", key: "category" },
    { label: "Content", key: "content" },
  ];

  useEffect(() => {
    fetchData(currentPage, selectedCategory);
  }, [currentPage, selectedCategory]);

  const fetchData = async (page: number, category: string) => {
    try {
      const response = await axiosClient.get<FetchResponse>(
        `/fetch?page=${page}&category=${category}`
      );
      setData(response.data.data);
      setCurrentPage(response.data.meta.current_page);
      setLastPage(response.data.meta.last_page);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to the first page when category changes
  };

  const categories = ["", "Action", "Adventure", "Strategy"]; // Add more categories as needed

  return (
    <>
      <Dropdown
        options={categories}
        selected={selectedCategory || "Filter by Category"}
        onSelect={handleCategoryChange}
      />
      <Table
        columns={columns}
        data={data}
        currentPage={currentPage}
        lastPage={lastPage}
        onPageChange={handlePageChange}
        withActions={true}
      />
    </>
  );
}
