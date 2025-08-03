const SkeletonCard = () => {
  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-md border border-border">
      {/* Image skeleton */}
      <div className="aspect-[4/3] bg-secondary animate-pulse" />
      
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Title skeleton */}
        <div className="h-6 bg-secondary rounded animate-pulse" />
        
        {/* Badges skeleton */}
        <div className="flex gap-2">
          <div className="h-6 w-8 bg-secondary rounded-full animate-pulse" />
          <div className="h-6 w-8 bg-secondary rounded-full animate-pulse" />
        </div>
        
        {/* Blurb skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-secondary rounded animate-pulse" />
          <div className="h-4 bg-secondary rounded animate-pulse w-3/4" />
        </div>
        
        {/* Accordion header skeleton */}
        <div className="border-t border-border pt-3">
          <div className="h-4 bg-secondary rounded animate-pulse w-1/2" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;