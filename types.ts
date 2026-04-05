
export interface GeoLocation {
  latitude: number;
  longitude: number;
}

export interface POI {
  id: string;
  name: string;
  category: 'Academic' | 'Administrative' | 'Facility' | 'Dining';
  description: string;
  longDescription: string;
  academicDetails?: string;
  facilities?: string[];
  location: GeoLocation;
  imageUrl: string;
  languageSupport: string[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface RouteStep {
  instruction: string;
  distance: number;
  duration: number;
  coordinates: [number, number];
  type: number;
  name?: string;
  way_points: [number, number];
}

export interface Route {
  coordinates: [number, number][];
  distance: number;
  duration: number;
  steps: RouteStep[];
}

export enum Language {
  ENGLISH = 'English',
  TAMIL = 'Tamil',
  HINDI = 'Hindi'
}

export const LANGUAGE_VOICES = {
  [Language.ENGLISH]: 'Kore',
  [Language.TAMIL]: 'Puck',
  [Language.HINDI]: 'Charon'
};
