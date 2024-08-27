import { useEffect, useState } from "react";
import { fetchFeedbackData } from "../../api/apiService";
import Table from "../../components/Table/Table.tsx";
import CategoriesDropdown from "../../components/Select/CategoriesDropdown.tsx";
import StateDropdown from "../../components/Select/StateDropdown.tsx";
import { Feedback } from "../../api/types.js";
import { useNavigate } from "react-router-dom";

export default function Feedbacks() {
  const navigate = useNavigate();

  const [data, setData] = useState<Feedback[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");

  const columns = [
    { label: "Name", key: "game_name" },
    { label: "Created at", key: "created_at" },
    { label: "State", key: "feedback_state" },
    { label: "Platform", key: "platform" },
    { label: "Category", key: "category" },
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchFeedbackData(
          currentPage,
          selectedCategory,
          selectedState
        );
        setData(response.data);
        setCurrentPage(response.meta.current_page);
        setLastPage(response.meta.last_page);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    loadData();
  }, [currentPage, selectedCategory, selectedState]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    setCurrentPage(1);
  };

  const handleActionClick = (feedback: Feedback) => {
    navigate(`/feedbacks/${feedback.id}`);
  };

  return (
    <div className="p-4">
      <div className="flex flex-col p-4">
        <span className="text-lg font-semibold">Filters:</span>
        <div className="flex space-x-4">
          <StateDropdown
            selectedState={selectedState}
            onStateChange={handleStateChange}
          />
          <CategoriesDropdown
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>
      </div>
      <Table
        columns={columns}
        data={data}
        currentPage={currentPage}
        lastPage={lastPage}
        onPageChange={handlePageChange}
        withActions={true}
        onActionClick={handleActionClick}
      />
    </div>
  );
}
