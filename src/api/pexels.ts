
import { ImageData } from '@/components/ImageCard';

// Using Pexels API
const API_KEY = 'PxHkW7PErSNJSA0HmvPwNlcdaBUlVlsDFYgQ8okDVrSlESaeAMpvS6g1'; // Updated with actual API key
const BASE_URL = 'https://api.pexels.com/v1';

export interface PexelsResponse {
  page: number;
  per_page: number;
  total_results: number;
  next_page: string;
  photos: PexelsPhoto[];
}

export interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  liked: boolean;
  alt: string;
}

export const searchImages = async (query: string, page: number = 1): Promise<{
  images: ImageData[];
  hasMore: boolean;
}> => {
  try {
    const response = await fetch(`${BASE_URL}/search?query=${encodeURIComponent(query)}&page=${page}&per_page=30`, {
      headers: {
        Authorization: API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }

    const data: PexelsResponse = await response.json();
    
    const images: ImageData[] = data.photos.map((photo) => ({
      id: photo.id.toString(),
      url: photo.src.large,
      alt: photo.alt || `Photo by ${photo.photographer}`,
      photographer: photo.photographer,
      width: photo.width,
      height: photo.height,
    }));

    return {
      images,
      hasMore: !!data.next_page,
    };
  } catch (error) {
    console.error('Error searching images:', error);
    return {
      images: [],
      hasMore: false,
    };
  }
};

export const getCuratedImages = async (page: number = 1): Promise<{
  images: ImageData[];
  hasMore: boolean;
}> => {
  try {
    const response = await fetch(`${BASE_URL}/curated?page=${page}&per_page=30`, {
      headers: {
        Authorization: API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch curated images');
    }

    const data: PexelsResponse = await response.json();
    
    const images: ImageData[] = data.photos.map((photo) => ({
      id: photo.id.toString(),
      url: photo.src.large,
      alt: photo.alt || `Photo by ${photo.photographer}`,
      photographer: photo.photographer,
      width: photo.width,
      height: photo.height,
    }));

    return {
      images,
      hasMore: !!data.next_page,
    };
  } catch (error) {
    console.error('Error getting curated images:', error);
    return {
      images: [],
      hasMore: false,
    };
  }
};
