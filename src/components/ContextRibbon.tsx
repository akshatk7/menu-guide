interface ContextRibbonProps {
  mealTime?: string;
  cravings?: string[];
  dishQuery?: string;
}

const ContextRibbon = ({ mealTime, cravings, dishQuery }: ContextRibbonProps) => {
  const items = [
    mealTime,
    ...(cravings || []),
    dishQuery
  ].filter(Boolean);

  if (items.length === 0) return null;

  return (
    <div className="sticky top-14 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-md mx-auto px-4 py-2">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          <span className="text-xs text-muted-foreground whitespace-nowrap">Filters:</span>
          {items.map((item, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full whitespace-nowrap"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContextRibbon;