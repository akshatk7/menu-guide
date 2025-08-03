import { Button } from '@/components/ui/button';
import { Copy, Share } from 'lucide-react';

interface FooterBarProps {
  visible: boolean;
}

const FooterBar = ({ visible }: FooterBarProps) => {
  const handleCopy = () => {
    // Placeholder for copy functionality
    console.log('Copy list clicked');
  };

  const handleShare = () => {
    // Placeholder for share functionality
    console.log('Share clicked');
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-14 bg-background border-t border-border shadow-lg md:hidden z-50">
      <div className="flex items-center justify-between h-full px-4 gap-3">
        <Button 
          variant="outline" 
          onClick={handleCopy}
          className="flex-1 h-10 rounded-xl"
        >
          <Copy className="h-4 w-4 mr-2" />
          Copy list
        </Button>
        
        <Button 
          onClick={handleShare}
          className="flex-1 h-10 rounded-xl"
        >
          <Share className="h-4 w-4 mr-2" />
          Share
        </Button>
      </div>
    </div>
  );
};

export default FooterBar;