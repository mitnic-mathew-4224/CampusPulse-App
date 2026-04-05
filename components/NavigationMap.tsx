
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
  const lastUserLocationRef = useRef<GeoLocation | null>(null);
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
        return coordinates.map((coord: number[]) => [coord[1], coord[0]]);
      }
      return [
        [start.latitude, start.longitude],
        [end.latitude, end.longitude]
      ];
    } catch (error) {
      console.error('Route fetch error:', error);
      return [
        [start.latitude, start.longitude],
        [end.latitude, end.longitude]
      ];
    } finally {
      setRouteLoading(false);
    }
  };

  // Initialize Map once
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

  // Update user marker position and refresh route every 5m of movement
  useEffect(() => {
    if (!mapRef.current || !userMarkerRef.current) return;
    userMarkerRef.current.setLatLng([userLocation.latitude, userLocation.longitude]);

    if (!targetPOI || !pathRef.current) return;

    // Check if user moved more than 5 meters since last route update
    const prev = lastUserLocationRef.current;
    if (prev) {
      const R = 6371e3;
      const dLat = (userLocation.latitude - prev.latitude) * Math.PI / 180;
      const dLon = (userLocation.longitude - prev.longitude) * Math.PI / 180;
      const a = Math.sin(dLat/2)**2 + Math.cos(prev.latitude * Math.PI/180) * Math.cos(userLocation.latitude * Math.PI/180) * Math.sin(dLon/2)**2;
      const moved = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      if (moved < 5) return;
    }

    lastUserLocationRef.current = userLocation;
    fetchRoute(userLocation, targetPOI.location).then(routeCoords => {
      if (!routeCoords || !pathRef.current) return;
      pathRef.current.setLatLngs(routeCoords);
    });
  }, [userLocation, targetPOI]);

  // Handle target POI changes - fetch route only when target changes
  useEffect(() => {
    if (!mapRef.current) return;

    if (targetPOI) {
      const targetCoords = [targetPOI.location.latitude, targetPOI.location.longitude];

      // Create or update target marker
      if (!targetMarkerRef.current) {
        targetMarkerRef.current = L.marker(targetCoords).addTo(mapRef.current);
      } else {
        targetMarkerRef.current.setLatLng(targetCoords);
      }

      // Only fetch route when target changes
      if (lastTargetIdRef.current !== targetPOI.id) {
        lastTargetIdRef.current = targetPOI.id;

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
      // Clear everything when no target
      if (targetMarkerRef.current) {
        mapRef.current.removeLayer(targetMarkerRef.current);
        targetMarkerRef.current = null;
      }
      if (pathRef.current) {
        mapRef.current.removeLayer(pathRef.current);
        pathRef.current = null;
      }
      lastTargetIdRef.current = null;
      mapRef.current.panTo([userLocation.latitude, userLocation.longitude]);
    }
  }, [targetPOI]);

  const distance = targetPOI ? calculateDistance(userLocation, targetPOI.location) : 0;
  const arrived = distance < 15;

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {!hideOverlay && (
        <div className="absolute top-4 left-4 z-[500] bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-white/40 shadow-lg text-slate-800">
          <div className="text-[10px] uppercase tracking-widest opacity-60 font-bold mb-1">Live Coordinates</div>
          <div className="font-mono text-xs flex flex-col">
            <span>LAT: {userLocation.latitude.toFixed(5)}</span>
            <span>LNG: {userLocation.longitude.toFixed(5)}</span>
          </div>
        </div>
      )}

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
