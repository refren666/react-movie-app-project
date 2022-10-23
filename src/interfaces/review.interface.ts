export interface IReviewAuthor {
  name: string;
  username: string;
  avatar_path: string;
  rating: number;
}

export interface IReview {
  id: string;
  author: string;
  author_details: IReviewAuthor;
  content: string;
  created_at: string;
  iso_639_1: string;
  media_id: number;
  media_title: string;
  media_type: string;
  updated_at: string;
  url: string;
}

export interface IReviewResponse {
  id: number;
  page: number;
  results: IReview[];
  total_pages: number;
  total_results: number;
}