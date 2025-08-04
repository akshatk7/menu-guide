import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin } from 'lucide-react';

interface SearchFilters {
  mealTime?: string;
  cravings?: string[];
  dishQuery?: string;
}

interface InputCardProps {
  onSubmit: (filters: SearchFilters) => void;
}

const InputCard = ({ onSubmit }: InputCardProps) => {
  const [restaurant, setRestaurant] = useState('');
  const [mealTime, setMealTime] = useState('');
  const [cravings, setCravings] = useState<string[]>([]);
  const [specificDish, setSpecificDish] = useState('');

  const mealTimes = ['Brunch', 'Lunch', 'Dinner'];
  const cravingOptions = ['Healthy', 'Hearty', 'Protein Rich', 'Sweet', 'Cheap'];

  const toggleCraving = (craving: string) => {
    setCravings(prev => 
      prev.includes(craving) 
        ? prev.filter(c => c !== craving)
        : [...prev, craving]
    );
  };

  const handleSubmit = () => {
    onSubmit({
      mealTime: mealTime || undefined,
      cravings: cravings,
      dishQuery: specificDish.trim() || undefined
    });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-card rounded-xl p-6 shadow-lg border border-border">
      <div className="space-y-6">
        {/* Restaurant Search */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search restaurant"
            value={restaurant}
            onChange={(e) => setRestaurant(e.target.value)}
            className="pl-10 h-12 text-base rounded-xl border-input"
          />
        </div>

        {/* Meal Time Selector */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Meal Time</label>
          <div className="flex gap-2">
            {mealTimes.map((time) => (
              <button
                key={time}
                onClick={() => setMealTime(mealTime === time ? '' : time)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-smooth ${
                  mealTime === time
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Craving Toggles */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Cravings</label>
          <div className="flex flex-wrap gap-2">
            {cravingOptions.map((craving) => (
              <button
                key={craving}
                onClick={() => toggleCraving(craving)}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-smooth ${
                  cravings.includes(craving)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {craving}
              </button>
            ))}
          </div>
        </div>

        {/* Optional Dish Field */}
        <div>
          <Input
            type="text"
            placeholder="Eyeing a dish? Type it here…"
            value={specificDish}
            onChange={(e) => setSpecificDish(e.target.value)}
            className="h-12 text-base rounded-xl border-input"
          />
        </div>

        {/* CTA Button */}
        <Button 
          onClick={handleSubmit}
          className="w-full h-12 text-base font-medium rounded-xl"
          disabled={false}
        >
          Find best dishes
        </Button>

      </div>
    </div>
  );
};

export default InputCard;