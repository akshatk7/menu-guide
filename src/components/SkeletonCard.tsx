const SkeletonCard = () => {
  return (
    <div className="bg-card rounded-xl overflow-hidden border border-border shadow-[0_4px_12px_rgba(0,0,0,0.12)] h-full flex flex-col">
      {/* Image skeleton */}
      <div className="aspect-[4/3] bg-secondary animate-pulse" />
      
      {/* Content skeleton */}
      <div className="p-4 space-y-3 flex-1 flex flex-col">
        {/* Title skeleton */}
        <div className="h-6 bg-secondary rounded animate-pulse" />
        
        {/* Vibe tag & badges skeleton */}
        <div className="flex justify-between">
          <div className="h-4 w-20 bg-secondary rounded animate-pulse" />
          <div className="flex gap-1">
            <div className="h-4 w-4 bg-secondary rounded animate-pulse" />
            <div className="h-4 w-4 bg-secondary rounded animate-pulse" />
          </div>
        </div>
        
        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-secondary rounded animate-pulse" />
          <div className="h-4 bg-secondary rounded animate-pulse w-3/4" />
        </div>
        
        {/* Watch out skeleton */}
        <div className="h-3 bg-secondary rounded animate-pulse w-2/3" />
        
        {/* More button skeleton */}
        <div className="border-t border-border pt-3 mt-auto">
          <div className="h-4 bg-secondary rounded animate-pulse w-1/3" />
        </div>
      </div>
      
      {/* Action buttons skeleton */}
      <div className="flex gap-3 p-4 pt-0">
        <div className="h-12 bg-secondary rounded-xl animate-pulse flex-1" />
        <div className="h-12 bg-secondary rounded-xl animate-pulse flex-1" />
      </div>
    </div>
  );
};

export default SkeletonCard;