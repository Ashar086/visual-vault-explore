
import ImageCard, { ImageData } from './ImageCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ImageGridProps {
  images: ImageData[];
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  onImageClick: (image: ImageData) => void;
  onSaveToggle: (image: ImageData) => void;
  savedImages: Set<string>;
}

const ImageGrid = ({ 
  images, 
  isLoading, 
  hasMore, 
  onLoadMore, 
  onImageClick, 
  onSaveToggle,
  savedImages 
}: ImageGridProps) => {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      {images.length === 0 && !isLoading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="rounded-full bg-gray-100 p-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
          </div>
          <h2 className="text-2xl font-medium mt-6 text-center">No images found</h2>
          <p className="text-gray-500 mt-2 text-center">Search for something else or explore trending images</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-min">
          {images.map((image) => (
            <ImageCard 
              key={image.id} 
              image={image} 
              onClick={() => onImageClick(image)}
              onSaveToggle={() => onSaveToggle(image)}
              isSaved={savedImages.has(image.id)}
            />
          ))}
          {isLoading && (
            Array.from({ length: 8 }).map((_, index) => (
              <div 
                key={`skeleton-${index}`} 
                className={cn(
                  "rounded-lg bg-gray-200 animate-pulse-soft",
                  index % 5 === 0 ? "row-span-2" : "row-span-1",
                  "h-[300px]"
                )}
              ></div>
            ))
          )}
        </div>
      )}

      {hasMore && images.length > 0 && (
        <div className="flex justify-center mt-8">
          <Button 
            onClick={onLoadMore} 
            disabled={isLoading}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          >
            {isLoading ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageGrid;
