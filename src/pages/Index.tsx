import { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DishCard from '@/components/DishCard';
import { sampleRestaurantData } from '@/data/sampleData';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call with 1s delay
    setTimeout(() => {
      setIsLoading(false);
      setShowResults(true);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Filter dishes based on search query
  const filteredDishes = sampleRestaurantData.dishes.filter(dish =>
    dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dish.vibeTag.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dish.whyOrder.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Show first 10 results
  const displayDishes = filteredDishes.slice(0, 10);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="px-4 py-6 max-w-2xl mx-auto">
        {/* Search Section - Positioned at top */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <Input
              type="text"
              placeholder="Where are you eating today?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="h-12 text-base rounded-xl border-input"
            />
          </div>
          
          <Button 
            onClick={handleSearch}
            disabled={!searchQuery.trim() || isLoading}
            className="w-full h-12 text-base font-medium rounded-xl"
          >
            {isLoading ? 'Finding dishes...' : 'Find best dishes'}
          </Button>
        </div>

        {/* Results Section - Directly below search */}
        {showResults && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                Found {displayDishes.length} dishes
              </h2>
              {displayDishes.length === 0 && (
                <p className="text-muted-foreground mt-2">
                  No dishes found. Try a different search term.
                </p>
              )}
            </div>
            
            <div className="space-y-4">
              {displayDishes.map((dish) => (
                <div key={dish.id} className="bg-card rounded-xl border border-border overflow-hidden">
                  <DishCard dish={dish} isActive={true} onSwipe={() => {}} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;