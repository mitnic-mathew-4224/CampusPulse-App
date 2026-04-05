import { GeoLocation } from '../types';

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
  distance: number; // in meters
  duration: number; // in seconds
  steps: RouteStep[];
}

export const getRoute = async (start: GeoLocation, end: GeoLocation): Promise<Route | null> => {
  const apiKey = process.env.MAPBOX_API_KEY;
  
  if (!apiKey || apiKey === 'your_mapbox_token_here') {
    console.warn('Mapbox API key not configured, using straight line');
    return createFallbackRoute(start, end);
  }

  try {
    console.log('Requesting route from Mapbox...');
    console.log('Start:', start);
    console.log('End:', end);
    
    const url = `https://api.mapbox.com/directions/v5/mapbox/walking/${start.longitude},${start.latitude};${end.longitude},${end.latitude}?geometries=geojson&steps=true&access_token=${apiKey}`;
    
    const response = await fetch(url);

    console.log('Mapbox response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Mapbox API error:', response.status, errorText);
      throw new Error(`Mapbox API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Mapbox response:', data);
    
    if (!data.routes || data.routes.length === 0) {
      console.warn('No route found, using fallback');
      return createFallbackRoute(start, end);
    }

    const route = data.routes[0];
    const geometry = route.geometry;
    
    // Extract turn-by-turn instructions
    const steps = route.legs[0].steps.map((step: any) => ({
      instruction: step.maneuver.instruction,
      distance: step.distance,
      duration: step.duration,
      coordinates: step.maneuver.location,
      type: step.maneuver.type,
      name: step.name || '',
      way_points: [0, 0]
    }));
    
    const routeData = {
      coordinates: geometry.coordinates,
      distance: route.distance,
      duration: route.duration,
      steps: steps
    };
    
    console.log('Processed route:', routeData);
    return routeData;
    
  } catch (error) {
    console.error('Routing error:', error);
    console.log('Falling back to straight line route');
    return createFallbackRoute(start, end);
  }
};

const createFallbackRoute = (start: GeoLocation, end: GeoLocation): Route => {
  const distance = calculateStraightDistance(start, end);
  const duration = distance / 1.4; // Walking speed ~1.4 m/s
  
  return {
    coordinates: [[start.longitude, start.latitude], [end.longitude, end.latitude]],
    distance: distance,
    duration: duration,
    steps: [{
      instruction: `Walk straight to destination (${Math.round(distance)}m)`,
      distance: distance,
      duration: duration,
      coordinates: [end.longitude, end.latitude],
      type: 0,
      name: 'Direct route',
      way_points: [0, 1]
    }]
  };
};

const calculateStraightDistance = (pos1: GeoLocation, pos2: GeoLocation): number => {
  const R = 6371e3;
  const φ1 = (pos1.latitude * Math.PI) / 180;
  const φ2 = (pos2.latitude * Math.PI) / 180;
  const Δφ = ((pos2.latitude - pos1.latitude) * Math.PI) / 180;
  const Δλ = ((pos2.longitude - pos1.longitude) * Math.PI) / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};