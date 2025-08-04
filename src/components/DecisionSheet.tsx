import { Button } from '@/components/ui/button';
import { Copy, Share, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

interface DecisionSheetProps {
  likedDishes: Dish[];
  onStartOver: () => void;
}

const DecisionSheet = ({ likedDishes, onStartOver }: DecisionSheetProps) => {
  const { toast } = useToast();

  const handleCopy = () => {
    const orderList = likedDishes
      .map((dish, index) => `${index + 1}. ${dish.name} - ${dish.vibeTag}`)
      .join('\n');
    
    navigator.clipboard.writeText(`My order at Cafe Aurora:\n\n${orderList}`);
    toast({
      title: "Copied to clipboard",
      description: "Your order list is ready to share!"
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      const orderList = likedDishes
        .map((dish, index) => `${index + 1}. ${dish.name}`)
        .join('\n');
      
      navigator.share({
        title: 'My Restaurant Order',
        text: `Check out what I'm ordering at Cafe Aurora:\n\n${orderList}`,
      });
    } else {
      handleCopy();
    }
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-background animate-slide-in-right">
      <div className="max-w-md mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
            Your Perfect Order
          </h2>
          <p className="text-muted-foreground">
            {likedDishes.length} dishes selected at Cafe Aurora
          </p>
        </div>

        {/* Dishes List */}
        {likedDishes.length > 0 ? (
          <div className="space-y-4 mb-8">
            {likedDishes.map((dish, index) => (
              <div key={dish.id} className="bg-card rounded-xl p-4 border border-border">
                <div className="flex gap-3">
                  <img
                    src={dish.photos[0]}
                    alt={dish.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">
                      {index + 1}. {dish.name}
                    </h3>
                    <p className="text-sm text-primary italic mb-1">
                      {dish.vibeTag}
                    </p>
                    <div className="flex gap-1">
                      {dish.badges.map((badge, badgeIndex) => (
                        <span key={badgeIndex} className="text-sm">
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
              <span className="text-2xl">🤔</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Nothing caught your eye?
            </h3>
            <p className="text-muted-foreground mb-6">
              No worries! Let's try again with fresh recommendations.
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          {likedDishes.length > 0 && (
            <>
              <Button
                onClick={handleCopy}
                variant="outline"
                className="w-full h-12 rounded-xl"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy order list
              </Button>
              
              <Button
                onClick={handleShare}
                className="w-full h-12 rounded-xl"
              >
                <Share className="h-4 w-4 mr-2" />
                Share with friends
              </Button>
            </>
          )}
          
          <Button
            onClick={onStartOver}
            variant={likedDishes.length > 0 ? "ghost" : "default"}
            className="w-full h-12 rounded-xl"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Start over
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DecisionSheet;