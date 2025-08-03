import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Dish {
  id: number;
  name: string;
  img: string;
  badges: string[];
  blurb: string;
  reviews: string[];
}

interface DishCardProps {
  dish: Dish;
}

const DishCard = ({ dish }: DishCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-md border border-border hover:shadow-lg transition-smooth">
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden">
        <img 
          src={dish.img} 
          alt="Placeholder dish photo"
          className="w-full h-full object-cover hover:scale-105 transition-smooth"
        />
      </div>
      
      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Dish Name */}
        <h4 className="font-heading font-semibold text-lg text-foreground">
          {dish.name}
        </h4>
        
        {/* Badges */}
        <div className="flex gap-2 flex-wrap">
          {dish.badges.map((badge, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-secondary rounded-full text-xs flex items-center gap-1"
            >
              {badge}
            </span>
          ))}
        </div>
        
        {/* Blurb */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {dish.blurb}
        </p>
        
        {/* Accordion */}
        <div className="border-t border-border pt-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full text-left"
            role="button"
            aria-expanded={isExpanded}
          >
            <span className="text-sm font-medium text-foreground">
              Why we picked it
            </span>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
          
          {isExpanded && (
            <div className="mt-3 space-y-2">
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