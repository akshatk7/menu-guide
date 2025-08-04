import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Dish {
  id: number;
  name: string;
  photos: string[];
  badges: string[];
  vibeTag: string;
  whyOrder: string;
  watchOut: string;
  score: number;
  reviews: string[];
}

interface DishCardProps {
  dish: Dish;
  isActive?: boolean;
  onSwipe?: () => void;
}

const DishCard = ({ dish, isActive = true }: DishCardProps) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const handlePhotoNavigation = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentPhotoIndex((prev) => 
        prev === dish.photos.length - 1 ? 0 : prev + 1
      );
    } else {
      setCurrentPhotoIndex((prev) => 
        prev === 0 ? dish.photos.length - 1 : prev - 1
      );
    }
  };

  const handleImageClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const imageWidth = rect.width;
    
    if (clickX > imageWidth / 2) {
      handlePhotoNavigation('next');
    } else {
      handlePhotoNavigation('prev');
    }
  };

  return (
    <div className="bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow">
      {/* Photo Carousel */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={dish.photos[currentPhotoIndex]} 
          alt={`${dish.name} photo`}
          className="w-full h-full object-cover cursor-pointer"
          onClick={handleImageClick}
        />
        
        {/* Dot Indicators */}
        {dish.photos.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
            {dish.photos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPhotoIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentPhotoIndex 
                    ? 'bg-white scale-110' 
                    : 'bg-white/60'
                }`}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Dish Name & Score */}
        <div className="flex items-start justify-between">
          <h3 className="font-bold text-lg text-foreground flex-1 pr-2">
            {dish.name}
          </h3>
          <div className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-full">
            <span className="text-sm font-semibold">{dish.score}</span>
            <span className="text-xs">/10</span>
          </div>
        </div>
        
        {/* Vibe Tag & Badges */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-primary italic">
            {dish.vibeTag}
          </span>
          <div className="flex gap-1">
            {dish.badges.map((badge, index) => (
              <span key={index} className="text-lg">
                {badge}
              </span>
            ))}
          </div>
        </div>
        
        {/* Why Order */}
        <p className="text-sm text-foreground leading-relaxed">
          {dish.whyOrder}
        </p>
        
        {/* Watch Out */}
        <p className="text-xs text-muted-foreground leading-relaxed">
          <span className="font-medium">Watch out:</span> {dish.watchOut}
        </p>
        
        {/* More Button */}
        <div className="border-t border-border pt-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full text-left"
            role="button"
            aria-expanded={isExpanded}
          >
            <span className="text-sm font-medium text-foreground">
              More reviews
            </span>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
          
          {isExpanded && (
            <div className="mt-3 space-y-2 animate-accordion-down">
              {dish.reviews.map((review, index) => (
                <p key={index} className="text-sm italic text-muted-foreground">
                  "{review}"
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DishCard;