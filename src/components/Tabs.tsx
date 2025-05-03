
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface TabsProps {
  activeTab: 'explore' | 'favorites';
  onTabChange: (tab: 'explore' | 'favorites') => void;
  savedCount: number;
}

const Tabs = ({ activeTab, onTabChange, savedCount }: TabsProps) => {
  return (
    <div className="container max-w-7xl mx-auto px-4 border-b">
      <div className="flex gap-1">
        <Button
          variant="ghost"
          className={cn(
            "relative rounded-none border-b-2 border-transparent py-4 text-sm font-medium transition-all",
            activeTab === 'explore' && "border-blue-500 text-foreground"
          )}
          onClick={() => onTabChange('explore')}
        >
          Explore
        </Button>
        
        <Button
          variant="ghost"
          className={cn(
            "relative rounded-none border-b-2 border-transparent py-4 text-sm font-medium transition-all",
            activeTab === 'favorites' && "border-blue-500 text-foreground"
          )}
          onClick={() => onTabChange('favorites')}
        >
          Favorites
          {savedCount > 0 && (
            <span className="ml-2 rounded-full bg-blue-100 text-blue-600 px-2 py-0.5 text-xs font-medium">
              {savedCount}
            </span>
          )}
        </Button>
      </div>
    </div>
  )
}

export default Tabs;
