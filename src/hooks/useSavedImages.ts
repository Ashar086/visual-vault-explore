
import { useState, useEffect } from 'react';
import { ImageData } from '@/components/ImageCard';

export const useSavedImages = () => {
  const [savedImageIds, setSavedImageIds] = useState<Set<string>>(new Set());
  const [savedImages, setSavedImages] = useState<ImageData[]>([]);

  // Load saved images from localStorage on initial render
  useEffect(() => {
    const savedData = localStorage.getItem('savedImages');
    if (savedData) {
      try {
        const parsedData: ImageData[] = JSON.parse(savedData);
        setSavedImages(parsedData);
        setSavedImageIds(new Set(parsedData.map(img => img.id)));
      } catch (error) {
        console.error('Error parsing saved images:', error);
        // Clear potentially corrupted data
        localStorage.removeItem('savedImages');
      }
    }
  }, []);

  // Save to localStorage whenever savedImages changes
  useEffect(() => {
    localStorage.setItem('savedImages', JSON.stringify(savedImages));
  }, [savedImages]);

  const toggleSaveImage = (image: ImageData) => {
    setSavedImages(prev => {
      if (savedImageIds.has(image.id)) {
        // Remove image
        const newSavedImages = prev.filter(img => img.id !== image.id);
        setSavedImageIds(new Set(newSavedImages.map(img => img.id)));
        return newSavedImages;
      } else {
        // Add image
        const newSavedImages = [...prev, image];
        setSavedImageIds(new Set(newSavedImages.map(img => img.id)));
        return newSavedImages;
      }
    });
  };

  return {
    savedImages,
    savedImageIds,
    toggleSaveImage,
    isSaved: (id: string) => savedImageIds.has(id),
  };
};

export default useSavedImages;
