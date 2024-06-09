export default function MovieListShimmerUi() {
  return (
    <ul className='movie-list'>
      {Array.from({ length: 12 }).map((_, index) => (
        <li key={index} className='shimmer-ui movie-card'></li>
      ))}
    </ul>
  );
}
