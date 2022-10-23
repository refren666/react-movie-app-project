import { IGenre } from "./genre.interface";
import { IProductionCompany } from "./productionCompany.interface";
import { IProductionCountry } from "./productionCountry.interface";
import { ISpokenLanguage } from "./spokenLanguage.interface";
import { IVideoResponse } from "./video.interface";

export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IMoviesResponse {
  page: number;
  results: IMovie[];
  total_results: number;
  total_pages: number;
}

export interface IMovieFull {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection?: any;
  budget: number;
  genres: IGenre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: IProductionCompany[];
  production_countries: IProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: ISpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  videos?: IVideoResponse;
  vote_average: number;
  vote_count: number;
}
