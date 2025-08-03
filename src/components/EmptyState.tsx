const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {/* Plate SVG illustration */}
      <div className="mb-6">
        <svg 
          width="120" 
          height="120" 
          viewBox="0 0 120 120" 
          fill="none" 
          className="text-muted-foreground"
        >
          <circle 
            cx="60" 
            cy="60" 
            r="50" 
            stroke="currentColor" 
            strokeWidth="2" 
            fill="none"
          />
          <circle 
            cx="60" 
            cy="60" 
            r="35" 
            stroke="currentColor" 
            strokeWidth="1" 
            fill="none"
            strokeDasharray="3 3"
          />
          <circle 
            cx="60" 
            cy="60" 
            r="2" 
            fill="currentColor"
          />
        </svg>
      </div>
      
      <p className="text-lg text-muted-foreground max-w-md">
        We will serve results once you pick a place.
      </p>
    </div>
  );
};

export default EmptyState;