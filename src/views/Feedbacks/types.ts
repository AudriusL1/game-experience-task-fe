export interface Feedback {
  id: string;
  game_name: string;
  feedback_state: string;
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
