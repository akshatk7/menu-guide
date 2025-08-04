import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, Heart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Dish {
  id: number;
  name: string;
  photos: string[];
  badges: string[];
  vibeTag: string;
  whyOrder: string;
  watchOut: string;
  reviews: string[];
}

interface DishCardProps {
  dish: Dish;
  isActive?: boolean;
  onSwipe?: (direction: 'left' | 'right') => void;
}

const DishCard = ({ dish, isActive = true, onSwipe }: DishCardProps) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [dragState, setDragState] = useState({ isDragging: false, startX: 0, currentX: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  // Reset photo index when dish changes
  useEffect(() => {
    setCurrentPhotoIndex(0);
    setIsExpanded(false);
  }, [dish.id]);

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

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isActive) return;
    setDragState({
      isDragging: true,
      startX: e.touches[0].clientX,
      currentX: e.touches[0].clientX
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragState.isDragging || !isActive) return;
    
    const currentX = e.touches[0].clientX;
    const diffX = currentX - dragState.startX;
    
    setDragState(prev => ({ ...prev, currentX }));
    
    if (cardRef.current) {
      const rotation = diffX * 0.1;
      cardRef.current.style.transform = `translateX(${diffX}px) rotate(${rotation}deg)`;
      cardRef.current.style.opacity = `${Math.max(0.6, 1 - Math.abs(diffX) / 300)}`;
    }
  };

  const handleTouchEnd = () => {
    if (!dragState.isDragging || !isActive) return;
    
    const diffX = dragState.currentX - dragState.startX;
    const threshold = 80;
    
    if (Math.abs(diffX) > threshold && onSwipe) {
      onSwipe(diffX > 0 ? 'right' : 'left');
    } else if (cardRef.current) {
      // Snap back
      cardRef.current.style.transform = 'translateX(0px) rotate(0deg)';
      cardRef.current.style.opacity = '1';
    }
    
    setDragState({ isDragging: false, startX: 0, currentX: 0 });
  };

  const handleButtonAction = (action: 'skip' | 'like') => {
    if (onSwipe) {
      onSwipe(action === 'like' ? 'right' : 'left');
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div
        ref={cardRef}
        className={`bg-card rounded-xl overflow-hidden border border-border transition-all duration-250 ease-out ${
          isActive ? 'shadow-[0_4px_12px_rgba(0,0,0,0.12)] hover:shadow-xl' : ''
        } flex-1 flex flex-col`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: 'none' }}
      >
        {/* Photo Carousel */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={dish.photos[currentPhotoIndex]} 
            alt="Placeholder dish photo"
            className="w-full h-full object-cover"
          />
          
          {/* Photo Navigation Overlay */}
          {dish.photos.length > 1 && (
            <>
              <button
                onClick={() => handlePhotoNavigation('prev')}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
              >
                ←
              </button>
              <button
                onClick={() => handlePhotoNavigation('next')}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
              >
                →
              </button>
              
              {/* Dot Indicators */}
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
            </>
          )}
        </div>
        
        {/* Content */}
        <div className="p-4 space-y-3 flex-1 flex flex-col">
          {/* Dish Name */}
          <h3 className="font-heading font-bold text-xl text-foreground">
            {dish.name}
          </h3>
          
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
          <div className="border-t border-border pt-3 mt-auto">
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
      
      {/* Action Buttons */}
      {isActive && onSwipe && (
        <div className="flex gap-3 mt-4">
          <Button
            variant="outline"
            onClick={() => handleButtonAction('skip')}
            className="flex-1 h-12 rounded-xl"
          >
            <X className="h-4 w-4 mr-2" />
            Skip
          </Button>
          
          <Button
            onClick={() => handleButtonAction('like')}
            className="flex-1 h-12 rounded-xl"
          >
            <Heart className="h-4 w-4 mr-2" />
            Add to order
          </Button>
        </div>
      )}
    </div>
  );
};

export default DishCard;