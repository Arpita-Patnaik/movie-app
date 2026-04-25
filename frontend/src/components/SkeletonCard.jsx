const SkeletonCard = () => (
    <div className="skeleton-card">
      <div className="skeleton-img" />
      <div className="skeleton-text" />
      <div className="skeleton-text short" />
    </div>
  );
  
  export const SkeletonGrid = ({ count = 10 }) => (
    <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
      {Array.from({ length: count }).map((_, i) => (
        <div className="col" key={i}>
          <SkeletonCard />
        </div>
      ))}
    </div>
  );
  
  export default SkeletonCard;