export interface MovieDetailType {
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
  genres: Array<{ id: number; name: string }>;
  runtime: number;
  tagline: string;
  production_companies: Array<{
    id: number;
    name: string;
    logo_path: string | null;
  }>;
  budget: number;
}
