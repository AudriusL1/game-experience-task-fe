import axiosClient from "../../src/axios-client.js";
import { Feedback, FetchResponse } from "./types";
import { StatusEnum } from "../../src/api/Enums/FeedbackStatusEnum.js";

export const fetchFeedbackData = async (
  page: number,
  category: string,
  state: string
): Promise<FetchResponse> => {
  try {
    const response = await axiosClient.get<FetchResponse>(
      `/feedbacks?page=${page}&category=${category}&state=${state}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};

export const fetchSingleFeedback = async (id: string): Promise<Feedback> => {
  try {
    const response = await axiosClient.get<Feedback>(`/feedbacks/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};

export const updateFeedbackStatus = async (
  id: string,
  status: StatusEnum
): Promise<Feedback> => {
  try {
    const response = await axiosClient.put<Feedback>(
      `/feedbacks/${id}/update`,
      { status }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};
