// lib/api.ts
const TMDB_BASE = 'https://api.themoviedb.org/3';
const IMG_BASE = process.env.NEXT_PUBLIC_TMDB_IMG_BASE || 'https://image.tmdb.org/t/p/';
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

if (!API_KEY) throw new Error('Missing NEXT_PUBLIC_TMDB_API_KEY');

export interface TMDBMedia {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  overview: string;
  genre_ids: number[];
  media_type?: 'movie' | 'tv';
}

// 📸 Image URL Helper
export function getImageUrl(path: string | null, size = 'w500'): string {
  return path ? `${IMG_BASE}${size}${path}` : '/placeholder-poster.jpg';
}

// 🔄 Fetch Wrapper with Caching & Error Handling
async function tmdbFetch<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(`${TMDB_BASE}${endpoint}`);
  url.searchParams.set('api_key', API_KEY);
  url.searchParams.set('language', 'en-US');
  Object.entries(params).forEach(([k, v]) => v && url.searchParams.set(k, v));

  const res = await fetch(url.toString(), { next: { revalidate: 3600 } }); // Cache 1hr
  if (!res.ok) throw new Error(`API Error: ${res.status} ${res.statusText}`);
  return res.json();
}

// 🗺️ Transform TMDB → App Format
export function mapToAppMedia(item: TMDBMedia, type: 'movie' | 'tv' = 'movie') {
  const title = type === 'tv' ? (item.name || item.title) : (item.title || item.name);
  const date = type === 'tv' ? item.first_air_date : item.release_date;
  return {
    id: item.id,
    title: title || 'Untitled',
    year: date ? new Date(date).getFullYear() : 'N/A',
    rating: item.vote_average ? item.vote_average.toFixed(1) : 'N/A',
    poster: getImageUrl(item.poster_path),
    backdrop: getImageUrl(item.backdrop_path, 'original'),
    description: item.overview || 'No description available.',
    type,
    genres: item.genre_ids
  };
}

// 📡 API Endpoints
// lib/api.ts (REPLACE mapToAppMedia)
export function mapToAppMedia(item: any, type: 'movie' | 'tv' = 'movie', badge?: string) {
  const title = type === 'tv' ? (item.name || item.title || 'Untitled') : (item.title || item.name || 'Untitled');
  const date = type === 'tv' ? item.first_air_date : item.release_date;
  
  // TMDB quality mapping (simplified)
  const qualityMap: Record<number, string> = { 18: '720p', 10749: '1080p', 878: '4K' };
  const primaryGenre = item.genre_ids?.[0];
  
  return {
    id: item.id,
    title,
    year: date ? new Date(date).getFullYear().toString() : 'N/A',
    rating: item.vote_average ? item.vote_average.toFixed(1) : '0.0',
    poster: getImageUrl(item.poster_path, 'w342'),
    backdrop: getImageUrl(item.backdrop_path, 'original'),
    description: item.overview || 'No description available.',
    type,
    genres: item.genre_ids || [],
    quality: qualityMap[primaryGenre] || 'HD',
    badge: badge || null
  };
}