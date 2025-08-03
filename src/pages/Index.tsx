import { useState } from 'react';
import Header from '@/components/Header';
import InputCard from '@/components/InputCard';
import DishCard from '@/components/DishCard';
import SkeletonCard from '@/components/SkeletonCard';
import FooterBar from '@/components/FooterBar';
import EmptyState from '@/components/EmptyState';
import ErrorToast from '@/components/ErrorToast';
import { sampleRestaurantData } from '@/data/sampleData';

type AppState = 'input' | 'loading' | 'results' | 'error';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('input');
  const [showError, setShowError] = useState(false);

  const handleSearch = () => {
    setAppState('loading');
    
    // Simulate API call with 1.2s delay
    setTimeout(() => {
      // Simulate occasional error (20% chance)
      if (Math.random() < 0.2) {
        setAppState('input');
        setShowError(true);
      } else {
        setAppState('results');
      }
    }, 1200);
  };

  const renderContent = () => {
    switch (appState) {
      case 'input':
        return (
          <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center px-4 py-8">
            <InputCard onSubmit={handleSearch} />
          </div>
        );
      
      case 'loading':
        return (
          <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Title section with skeleton */}
            <div className="mb-8">
              <div className="h-8 bg-secondary rounded animate-pulse w-64 mb-2" />
              <div className="h-6 w-6 bg-secondary rounded-full animate-pulse" />
            </div>
            
            {/* Skeleton grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          </div>
        );
      
      case 'results':
        return (
          <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Title section */}
            <div className="mb-8 flex items-center gap-3">
              <h2 className="text-2xl font-heading font-bold text-foreground">
                Top picks at {sampleRestaurantData.name}
              </h2>
              <div className="bg-primary text-primary-foreground text-sm font-medium px-2 py-1 rounded-full min-w-[1.5rem] h-6 flex items-center justify-center">
                {sampleRestaurantData.dishes.length}
              </div>
            </div>
            
            {/* Dish grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
              {sampleRestaurantData.dishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </div>
          </div>
        );
      
      default:
        return <EmptyState />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {renderContent()}
      
      <FooterBar visible={appState === 'results'} />
      
      <ErrorToast 
        show={showError} 
        onDismiss={() => setShowError(false)} 
      />
    </div>
  );
};

export default Index;