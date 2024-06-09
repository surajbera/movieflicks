export default function HeaderShimmer() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => {
        return <li key={index} className='genre-shimmer shimmer-ui'></li>;
      })}
    </>
  );
}
