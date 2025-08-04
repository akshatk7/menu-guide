import { useState } from 'react';
import Header from '@/components/Header';
import InputCard from '@/components/InputCard';
import SwipeDeck from '@/components/SwipeDeck';
import ContextRibbon from '@/components/ContextRibbon';
import SkeletonCard from '@/components/SkeletonCard';
import EmptyState from '@/components/EmptyState';
import ErrorToast from '@/components/ErrorToast';

type AppState = 'input' | 'loading' | 'results' | 'error';

interface SearchFilters {
  mealTime?: string;
  cravings?: string[];
  dishQuery?: string;
}

const Index = () => {
  const [appState, setAppState] = useState<AppState>('input');
  const [showError, setShowError] = useState(false);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({});

  const handleSearch = (filters: SearchFilters) => {
    setSearchFilters(filters);
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
          <>
            <ContextRibbon {...searchFilters} />
            <div className="min-h-[calc(100vh-7rem)] px-4 py-8">
              <div className="max-w-md mx-auto relative">
                <div className="relative h-[600px]">
                  {Array.from({ length: 3 }).map((_, index) => {
                    const zIndex = 3 - index;
                    const scale = index === 0 ? 1 : 0.94;
                    const opacity = index === 0 ? 1 : 0.6;
                    const translateY = index * 8;

                    return (
                      <div
                        key={index}
                        className="absolute inset-0 transition-all duration-250 ease-out"
                        style={{
                          zIndex,
                          transform: `scale(${scale}) translateY(${translateY}px)`,
                          opacity
                        }}
                      >
                        <SkeletonCard />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        );
      
      case 'results':
        return (
          <>
            <ContextRibbon {...searchFilters} />
            <SwipeDeck {...searchFilters} />
          </>
        );
      
      default:
        return <EmptyState />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {renderContent()}
      
      <ErrorToast 
        show={showError} 
        onDismiss={() => setShowError(false)} 
      />
    </div>
  );
};

export default Index;