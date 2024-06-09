import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useAppContext } from "../hooks/useAppContext";

export default function MovieDetailPage() {
  const { id } = useParams();
  const { apiKey, apiBaseUrl } = useAppContext();

  const { data: movie, isPending, error } = useFetch(`${apiBaseUrl}/movie/${id}?api_key=${apiKey}`);

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {movie ? (
        <article>This application is almost done!</article>
      ) : (
        <p>No movie details available.</p>
      )}
    </div>
  );
}
