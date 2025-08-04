import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { sampleRestaurantData } from '@/data/sampleData';

interface DecisionSheetProps {
  onStartOver: () => void;
}

const DecisionSheet = ({ onStartOver }: DecisionSheetProps) => {

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">All Done!</h2>
          <p className="text-muted-foreground">
            You've seen all the top dishes at {sampleRestaurantData.name}
          </p>
        </div>

        <div className="space-y-3">
          <Button 
            onClick={onStartOver}
            className="w-full h-12 rounded-xl"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Start Over
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DecisionSheet;