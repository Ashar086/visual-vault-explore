
import { useState, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import ImageGrid from '@/components/ImageGrid';
import ImageViewer from '@/components/ImageViewer';
import Tabs from '@/components/Tabs';
import { ImageData } from '@/components/ImageCard';
import { searchImages, getCuratedImages } from '@/api/pexels';
import { useSavedImages } from '@/hooks/useSavedImages';
import { toast } from '@/components/ui/sonner';

const Index = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'explore' | 'favorites'>('explore');

  const { savedImages, savedImageIds, toggleSaveImage, isSaved } = useSavedImages();

  const fetchImages = useCallback(async (query: string, page: number) => {
    setIsLoading(true);
    try {
      const result = query
        ? await searchImages(query, page)
        : await getCuratedImages(page);

      if (page === 1) {
        setImages(result.images);
      } else {
        setImages(prev => [...prev, ...result.images]);
      }
      
      setHasMore(result.hasMore);
    } catch (error) {
      console.error('Error fetching images:', error);
      toast.error('Failed to load images. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    // Display loading toast on initial load
    if (currentPage === 1 && !searchQuery) {
      toast.info('Loading curated images...', { id: 'loading-toast', duration: 1000 });
    }
    
    fetchImages('', 1);
  }, [fetchImages]);

  const handleSearch = (query: string) => {
    if (query) {
      toast.info(`Searching for "${query}"...`, { id: 'search-toast', duration: 1500 });
    }
    
    setSearchQuery(query);
    setCurrentPage(1);
    fetchImages(query, 1);
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchImages(searchQuery, nextPage);
  };

  const handleImageClick = (image: ImageData) => {
    setSelectedImage(image);
    setIsViewerOpen(true);
  };

  const handleViewerClose = () => {
    setIsViewerOpen(false);
  };

  const handleSaveToggle = (image: ImageData) => {
    toggleSaveImage(image);
    
    if (isSaved(image.id)) {
      toast.info('Removed from favorites');
    } else {
      toast.success('Added to favorites');
    }
  };

  const handleTabChange = (tab: 'explore' | 'favorites') => {
    setActiveTab(tab);
    
    // Reset view when switching tabs
    if (tab === 'explore' && images.length === 0) {
      fetchImages('', 1);
    }
    
    // Show toast when switching to favorites tab
    if (tab === 'favorites') {
      if (savedImages.length === 0) {
        toast.info('No favorites yet. Save some images first!');
      } else {
        toast.info(`Viewing ${savedImages.length} favorites`);
      }
    }
  };

  // Handle keyboard navigation for viewer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isViewerOpen) return;
      
      if (e.key === 'Escape') {
        handleViewerClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isViewerOpen]);

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={handleSearch} />
      
      <Tabs 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
        savedCount={savedImages.length}
      />
      
      {activeTab === 'explore' ? (
        <ImageGrid 
          images={images}
          isLoading={isLoading}
          hasMore={hasMore}
          onLoadMore={handleLoadMore}
          onImageClick={handleImageClick}
          onSaveToggle={handleSaveToggle}
          savedImages={savedImageIds}
        />
      ) : (
        <ImageGrid 
          images={savedImages}
          isLoading={false}
          hasMore={false}
          onLoadMore={() => {}}
          onImageClick={handleImageClick}
          onSaveToggle={handleSaveToggle}
          savedImages={savedImageIds}
        />
      )}
      
      <ImageViewer
        image={selectedImage}
        isOpen={isViewerOpen}
        onClose={handleViewerClose}
        onSaveToggle={() => selectedImage && handleSaveToggle(selectedImage)}
        isSaved={selectedImage ? isSaved(selectedImage.id) : false}
      />
    </div>
  );
};

export default Index;
