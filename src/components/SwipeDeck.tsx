import { useState, useRef } from 'react';
import DishCard from './DishCard';
import DecisionSheet from './DecisionSheet';
import { sampleRestaurantData } from '@/data/sampleData';

interface SwipeDeckProps {
  mealTime?: string;
  cravings?: string[];
  dishQuery?: string;
}

const SwipeDeck = ({ mealTime, cravings, dishQuery }: SwipeDeckProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedDishes, setLikedDishes] = useState<number[]>([]);
  const [showDecisionSheet, setShowDecisionSheet] = useState(false);
  const [cardKey, setCardKey] = useState(0);

  const dishes = sampleRestaurantData.dishes;
  const isLastCard = currentIndex >= dishes.length - 1;

  const handleSwipe = () => {
    if (isLastCard) {
      setShowDecisionSheet(true);
    } else {
      setCurrentIndex(prev => prev + 1);
      setCardKey(prev => prev + 1); // Force re-render for animation
    }
  };

  const handleStartOver = () => {
    setCurrentIndex(0);
    setLikedDishes([]);
    setShowDecisionSheet(false);
    setCardKey(prev => prev + 1);
  };

  if (showDecisionSheet) {
    return (
      <DecisionSheet
        onStartOver={handleStartOver}
      />
    );
  }

  return (
    <div className="min-h-[calc(100vh-7rem)] px-4 py-8">
      <div className="max-w-md mx-auto relative">
        {/* Card Stack */}
        <div className="relative h-[600px]">
          {dishes.slice(currentIndex, currentIndex + 3).map((dish, stackIndex) => {
            const isActive = stackIndex === 0;
            const zIndex = 3 - stackIndex;
            const scale = isActive ? 1 : 0.94;
            const opacity = isActive ? 1 : 0.6;
            const translateY = stackIndex * 8;

            return (
              <div
                key={`${dish.id}-${cardKey}`}
                className="absolute inset-0 transition-all duration-250 ease-out"
                style={{
                  zIndex,
                  transform: `scale(${scale}) translateY(${translateY}px)`,
                  opacity
                }}
              >
                <DishCard
                  dish={dish}
                  isActive={isActive}
                  onSwipe={handleSwipe}
                />
              </div>
            );
          })}
        </div>

        {/* Progress Indicator */}
        <div className="mt-6 flex justify-center gap-2">
          {dishes.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index < currentIndex
                  ? 'w-2 bg-primary'
                  : index === currentIndex
                  ? 'w-8 bg-primary'
                  : 'w-2 bg-secondary'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SwipeDeck;