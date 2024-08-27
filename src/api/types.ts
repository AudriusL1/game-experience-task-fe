import { StatusEnum } from "./Enums/FeedbackStatusEnum";

export interface Feedback {
  id: string;
  created_at: string;
  game_name: string;
  feedback_state: StatusEnum;
  platform: string;
  version: string;
  category: string;
  content: string;
}

export interface PaginationMeta {
  current_page: number;
  last_page: number;
}

export interface FetchResponse {
  data: Feedback[];
  meta: PaginationMeta;
}
