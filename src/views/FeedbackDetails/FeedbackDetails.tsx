import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Feedback } from "../../api/types";
import GoBackButton from "../../components/Navigation/GoBackButton";
import {
  fetchSingleFeedback,
  updateFeedbackStatus,
} from "../../api/apiService";
import SimpleButton from "../../components/Buttons/SimpleButton";
import StateDropdown from "../../components/Select/StateDropdown";
import { StatusEnum } from "api/Enums/FeedbackStatusEnum";

export default function FeedbackDetails() {
  const { id } = useParams<{ id: string }>();
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedState, setSelectedState] = useState(
    feedback?.feedback_state || null
  );

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        if (id) {
          const response = await fetchSingleFeedback(id);
          setFeedback(response);
          setSelectedState(response.feedback_state);
        }
      } catch (error) {
        console.error("Error fetching feedback:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [id]);

  const onStateChange = (newState: StatusEnum) => {
    setSelectedState(newState);
  };

  const onSubmit = async () => {
    if (!selectedState) {
      window.alert("Please select a valid status before submitting.");
      return;
    }
    if (feedback) {
      try {
        await updateFeedbackStatus(id!, selectedState);
        window.alert("State changed successfuly");
      } catch (error) {
        console.error("Error updating status:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!feedback) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-red-500">Feedback not found</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Feedback Details
      </h1>
      <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-medium text-gray-700">Game Name:</p>
            <p className="text-gray-600">{feedback.game_name}</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Platform:</p>
            <p className="text-gray-600">{feedback.platform}</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Version:</p>
            <p className="text-gray-600">{feedback.version}</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Category:</p>
            <p className="text-gray-600">{feedback.category}</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Created at:</p>
            <p className="text-gray-600">{feedback.created_at}</p>
          </div>
          <div className="col-span-2">
            <p className="font-medium text-gray-700">Content:</p>
            <p className="text-gray-600">{feedback.content}</p>
          </div>

          <div className="col-span-2">
            <p className="font-medium text-gray-700">Status:</p>
            <StateDropdown
              selectedState={selectedState}
              onStateChange={onStateChange}
            />
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-between">
        <GoBackButton text="Go Back" />
        <SimpleButton text="Change Status" onClick={onSubmit} />
      </div>
    </div>
  );
}
