import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

type MovieRatingProps = {
  rating: number; // Rating out of 10
};

export default function MovieRating({ rating }: MovieRatingProps) {
  const ratingOutOfFive = rating / 2;
  const fullStars = Math.floor(ratingOutOfFive);
  const halfStar = ratingOutOfFive % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;
  const starColor = "#ffc107";

  return (
    <div>
      {Array.from({ length: fullStars }, (_, i) => (
        <FaStar key={i} color={starColor} />
      ))}
      {halfStar === 1 && <FaStarHalfAlt color={starColor} />}
      {Array.from({ length: emptyStars }, (_, i) => (
        <FaRegStar key={i} color={starColor} />
      ))}
    </div>
  );
}
