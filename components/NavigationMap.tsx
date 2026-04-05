
import React, { useEffect, useRef, useState } from 'react';
import { GeoLocation, POI } from '../types';
import { calculateDistance } from '../services/locationService';

// Access Leaflet from the window object (loaded in index.html)
declare const L: any;

interface NavigationMapProps {
  userLocation: GeoLocation;
  targetPOI: POI | null;
  hideOverlay?: boolean;
}

const NavigationMap: React.FC<NavigationMapProps> = ({ userLocation, targetPOI, hideOverlay }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const userMarkerRef = useRef<any>(null);
  const targetMarkerRef = useRef<any>(null);
  const pathRef = useRef<any>(null);
  const lastTargetIdRef = useRef<string | null>(null);
  const [routeLoading, setRouteLoading] = useState(false);

  // Fetch route from Mapbox
  const fetchRoute = async (start: GeoLocation, end: GeoLocation) => {
    const apiKey = import.meta.env.VITE_MAPBOX_TOKEN || 'pk.YOUR_TOKEN_HERE';
    const url = `https://api.mapbox.com/directions/v5/mapbox/walking/${start.longitude},${start.latitude};${end.longitude},${end.latitude}?geometries=geojson&access_token=${apiKey}`;

    try {
      setRouteLoading(true);
      const response = await fetch(url);
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        const coordinates = data.routes[0].geometry.coordinates;
        // Convert [lon, lat] to [lat, lon] for Leaflet
        return coordinates.map((coord: number[]) => [coord[1], coord[0]]);
      }
      // Fallback to straight line only if API fails
      return [
        [start.latitude, start.longitude],
        [end.latitude, end.longitude]
      ];
    } catch (error) {
      console.error('Route fetch error:', error);
      // Fallback to straight line
      return [
        [start.latitude, start.longitude],
        [end.latitude, end.longitude]
      ];
    } finally {
      setRouteLoading(false);
    }
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;
    
    try {
      mapRef.current = L.map(mapContainerRef.current, {
        zoomControl: false,
        attributionControl: true
      }).setView([userLocation.latitude, userLocation.longitude], 17);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(mapRef.current);

      // Custom User Icon (Blue Pulse)
      const userIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div class="user-marker w-4 h-4"><div class="user-marker-pulse"></div></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });

      userMarkerRef.current = L.marker([userLocation.latitude, userLocation.longitude], { icon: userIcon })
        .addTo(mapRef.current);
    } catch (error) {
      console.error('Map initialization error:', error);
    }
  }, []);

  // Update Map Elements when location or target changes
  useEffect(() => {
    if (!mapRef.current) return;

    // Update User Marker
    userMarkerRef.current.setLatLng([userLocation.latitude, userLocation.longitude]);

    // Update Target Marker and Route
    if (targetPOI) {
      const targetCoords = [targetPOI.location.latitude, targetPOI.location.longitude];
      
      if (!targetMarkerRef.current) {
        targetMarkerRef.current = L.marker(targetCoords).addTo(mapRef.current);
      } else {
        targetMarkerRef.current.setLatLng(targetCoords);
      }

      // Fetch and draw route ONLY when target changes, not on every location update
      const targetId = targetPOI.id;
      if (lastTargetIdRef.current !== targetId) {
        lastTargetIdRef.current = targetId;

        // Clear old route
        if (pathRef.current) {
          mapRef.current.removeLayer(pathRef.current);
          pathRef.current = null;
        }

        fetchRoute(userLocation, targetPOI.location).then(routeCoords => {
          if (!routeCoords || routeCoords.length === 0) return;
          pathRef.current = L.polyline(routeCoords, {
            color: '#4f46e5',
            weight: 5,
            opacity: 0.8,
            lineJoin: 'round',
            lineCap: 'round'
          }).addTo(mapRef.current);
          const bounds = L.latLngBounds(routeCoords);
          mapRef.current.fitBounds(bounds, { padding: [80, 80] });
        });
      }

    } else {
      // Clear target elements if no target
      if (targetMarkerRef.current) {
        mapRef.current.removeLayer(targetMarkerRef.current);
        targetMarkerRef.current = null;
      }
      if (pathRef.current) {
        mapRef.current.removeLayer(pathRef.current);
        pathRef.current = null;
      }
      hasAutoFittedRef.current = false;
      lastTargetIdRef.current = null;
      mapRef.current.panTo([userLocation.latitude, userLocation.longitude]);
    }
  }, [userLocation, targetPOI]);

  const distance = targetPOI ? calculateDistance(userLocation, targetPOI.location) : 0;
  const arrived = distance < 30;

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* The actual Map Leaflet container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Distance Overlay - Stays fixed on screen */}
      {!hideOverlay && (
        <div className="absolute top-4 left-4 z-[500] bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-white/40 shadow-lg text-slate-800">
          <div className="text-[10px] uppercase tracking-widest opacity-60 font-bold mb-1">Live Coordinates</div>
          <div className="font-mono text-xs flex flex-col">
            <span>LAT: {userLocation.latitude.toFixed(5)}</span>
            <span>LNG: {userLocation.longitude.toFixed(5)}</span>
          </div>
        </div>
      )}

      {/* Target Info Card - Hidden when detail panel is open to avoid overlap */}
      {targetPOI && !hideOverlay && (
        <div className="absolute bottom-20 left-4 right-4 z-[500] bg-white rounded-3xl p-5 shadow-2xl flex items-center justify-between animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
              PIN
            </div>
            <div>
              <h3 className="font-bold text-slate-900 leading-tight">{targetPOI.name}</h3>
              <div className="text-xs font-medium text-slate-500">
                {distance.toFixed(0)} meters away
              </div>
            </div>
          </div>
          {arrived && (
            <div className="px-4 py-2 rounded-2xl font-black text-xs tracking-tighter shadow-sm bg-green-500 text-white animate-bounce">
              ARRIVED
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NavigationMap;
