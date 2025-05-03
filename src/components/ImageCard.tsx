
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface ImageData {
  id: string;
  url: string;
  alt: string;
  photographer?: string;
  width: number;
  height: number;
}

interface ImageCardProps {
  image: ImageData;
  onClick: () => void;
  onSaveToggle: () => void;
  isSaved: boolean;
}

const ImageCard = ({ image, onClick, onSaveToggle, isSaved }: ImageCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const aspectRatio = image.width / image.height;
  
  // Calculate row span based on aspect ratio for masonry-like layout
  const getSpanClass = () => {
    if (aspectRatio > 1.7) return 'row-span-1';
    if (aspectRatio < 0.7) return 'row-span-2';
    return 'row-span-1';
  };

  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-lg shadow-md transition-all duration-300",
        getSpanClass(),
        isHovered && "ring-2 ring-blue-400",
        "group animate-fade-in"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="w-full h-full cursor-pointer"
        onClick={onClick}
      >
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse-soft flex items-center justify-center">
            <div className="h-8 w-8 border-4 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        )}
        
        <img
          src={image.url}
          alt={image.alt}
          className={cn(
            "w-full h-full object-cover transition-all duration-500",
            isLoaded ? "opacity-100" : "opacity-0",
            isHovered && "scale-105"
          )}
          onLoad={() => setIsLoaded(true)}
        />
      </div>

      <div className={cn(
        "absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white",
        "transform transition-all duration-300",
        isHovered ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      )}>
        <p className="text-sm font-medium truncate">
          {image.photographer ? `Photo by ${image.photographer}` : "Beautiful image"}
        </p>
      </div>

      <Button
        size="icon"
        variant="ghost"
        className={cn(
          "absolute top-2 right-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition-all",
          isHovered || isSaved ? "opacity-100" : "opacity-0"
        )}
        onClick={(e) => {
          e.stopPropagation();
          onSaveToggle();
        }}
      >
        {isSaved ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#ff3b5c" stroke="#ff3b5c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </Button>
    </div>
  );
};

export default ImageCard;
