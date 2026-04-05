
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { usePOIs } from './usePOIs';
import { POI, GeoLocation, Language } from './types';
import { calculateDistance } from './services/locationService';
import { playNarration, playNarrationWithFeedback } from './services/geminiService';

import NavigationMap from './components/NavigationMap';
import Assistant from './components/Assistant';

const PROXIMITY_THRESHOLD = 10; // 10 meters

const App: React.FC = () => {
  const { pois: CAMPUS_POIS, loading, error, usingDatabase } = usePOIs();
  // Defaulting to accurate CEG campus location for simulation mode
  const [userLocation, setUserLocation] = useState<GeoLocation>({ latitude: 13.010838164834343, longitude: 80.2353850113136 }); 
  const [targetPOI, setTargetPOI] = useState<POI | null>(null);
  const [isArrived, setIsArrived] = useState(false);
  const [showPOIInfo, setShowPOIInfo] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState<Language>(Language.ENGLISH);
  const [isSimulation, setIsSimulation] = useState(true);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const watchId = useRef<number | null>(null);

  // Filter POIs based on search query
  const filteredPOIs = CAMPUS_POIS.filter(poi => 
    poi.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    poi.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    poi.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Show only 3 suggested POIs when search is empty, all when typing
  const displayPOIs = searchQuery.trim() === '' ? filteredPOIs.slice(0, 3) : filteredPOIs;



  // Debug: Log the data to see what's happening
  console.log('CAMPUS_POIS:', CAMPUS_POIS);
  console.log('searchQuery:', searchQuery);
  console.log('filteredPOIs:', filteredPOIs);

  // Sync arrival state with location
  useEffect(() => {
    if (!targetPOI) return;
    
    const dist = calculateDistance(userLocation, targetPOI.location);
    if (dist <= PROXIMITY_THRESHOLD && !isArrived) {
      setIsArrived(true);
      setShowPOIInfo(true);
      // Auto-trigger narration on arrival
      playNarration(targetPOI.description, activeLanguage);
    } else if (dist > PROXIMITY_THRESHOLD && isArrived) {
      setIsArrived(false);
      setShowPOIInfo(false);
    }
  }, [userLocation, targetPOI, isArrived, activeLanguage]);

  // Real GPS tracking
  useEffect(() => {
    if (!isSimulation && navigator.geolocation) {
      setGpsLoading(true);
      
      // Get current position immediately
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          });
          setGpsLoading(false);
          console.log('GPS position acquired:', pos.coords.latitude, pos.coords.longitude);
        },
        (err) => {
          console.error('GPS Error Details:', {
            code: err.code,
            message: err.message,
            isHTTPS: window.location.protocol === 'https:',
            userAgent: navigator.userAgent
          });
          setGpsLoading(false);
          
          let errorMessage = 'GPS Error: ';
          switch(err.code) {
            case 1:
              errorMessage += 'Permission denied. Please allow location access in browser settings.';
              break;
            case 2:
              errorMessage += 'Position unavailable. Check if GPS is enabled.';
              break;
            case 3:
              errorMessage += 'Request timeout. GPS is taking too long to respond.';
              break;
            default:
              errorMessage += 'Unknown error occurred.';
          }
          
          if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
            errorMessage += ' Note: GPS requires HTTPS or localhost.';
          }
          
          alert(errorMessage);
          setIsSimulation(true);
        },
        { enableHighAccuracy: true, timeout: 30000, maximumAge: 300000 }
      );
      
      // Watch position for continuous updates
      watchId.current = navigator.geolocation.watchPosition(
        (pos) => {
          setUserLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          });
          console.log('GPS position updated:', pos.coords.latitude, pos.coords.longitude);
        },
        (err) => {
          console.error('GPS Watch Error:', err);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
      );
    } else if (isSimulation) {
      // Reset to default simulation location when switching back
      setUserLocation({ latitude: 13.010838164834343, longitude: 80.2353850113136 });
      setGpsLoading(false);
    }
    
    return () => {
      if (watchId.current !== null) {
        navigator.geolocation.clearWatch(watchId.current);
        watchId.current = null;
      }
    };
  }, [isSimulation]);



  const toggleSimulation = () => {
    if (!isSimulation) {
      // Switching to simulation mode
      setIsSimulation(true);
      if (watchId.current !== null) {
        navigator.geolocation.clearWatch(watchId.current);
        watchId.current = null;
      }
    } else {
      // Switching to GPS mode - check if geolocation is available
      if (!navigator.geolocation) {
        alert('Geolocation is not supported by this browser.');
        return;
      }
      
      if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
        alert('GPS requires HTTPS connection or localhost. Current connection is not secure.');
        return;
      }
      
      setIsSimulation(false);
    }
  };

  const handleManualMove = (direction: 'N' | 'S' | 'E' | 'W') => {
    const step = 0.0001; // Approx 11 meters
    setUserLocation(prev => ({
      latitude: direction === 'N' ? prev.latitude + step : (direction === 'S' ? prev.latitude - step : prev.latitude),
      longitude: direction === 'E' ? prev.longitude + step : (direction === 'W' ? prev.longitude - step : prev.longitude),
    }));
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden text-slate-900 bg-slate-50">
      {/* Loading State */}
      {loading && (
        <div className="absolute inset-0 bg-white z-[1000] flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-600 font-semibold">Loading Campus Data...</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b p-4 flex items-center justify-between z-20">
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-red-600 to-indigo-600 bg-clip-text text-transparent">
            CEG CampusPulse
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">CEG Assistant</p>
        </div>
          <div className="flex gap-2">
            <div className="text-xs bg-slate-100 rounded px-2 py-1">
              {window.location.protocol === 'https:' || window.location.hostname === 'localhost' ? '🔒' : '⚠️'}
            </div>
          <select 
            value={activeLanguage}
            onChange={(e) => setActiveLanguage(e.target.value as Language)}
            className="text-xs bg-slate-100 border-none rounded-lg p-2 font-semibold"
          >
            {Object.values(Language).map(lang => <option key={lang} value={lang}>{lang}</option>)}
          </select>
          <button 
            onClick={toggleSimulation}
            className={`text-xs px-3 py-1 rounded-lg font-bold flex items-center gap-1 ${
              isSimulation ? 'bg-orange-100 text-orange-600' : gpsLoading ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'
            }`}
          >
            {gpsLoading ? (
              <>
                <div className="w-3 h-3 border border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
                GETTING GPS
              </>
            ) : (
              isSimulation ? 'SIMULATION' : 'GPS LIVE'
            )}
          </button>
        </div>
      </header>

      {/* Search / Target Selector */}
      {!targetPOI && (
        <div className="bg-gradient-to-b from-white to-slate-50 shadow-lg z-10 max-h-[60vh] flex flex-col">
          <div className="p-4 border-b border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-slate-700">Select Destination</h2>
              <div className="flex items-center gap-2 text-xs">
                <span className={`w-2 h-2 rounded-full ${usingDatabase ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                <span className="text-slate-500">{usingDatabase ? 'Database' : 'Local'}</span>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="🔍 Search buildings, departments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {displayPOIs.length > 0 ? (
              displayPOIs.map(poi => (
                <button 
                  key={poi.id}
                  onClick={() => { setTargetPOI(poi); setIsArrived(false); setSearchQuery(''); }}
                  className="w-full flex items-center gap-3 p-4 rounded-2xl bg-white border-2 border-slate-100 hover:border-indigo-400 hover:shadow-lg transition-all text-left group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md flex items-center justify-center text-white font-bold text-xs group-hover:scale-110 transition-transform">
                    {poi.category === 'Academic' ? '🏫' : poi.category === 'Administrative' ? '🏢' : '🏛️'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm text-slate-900 truncate">{poi.name}</div>
                    <div className="text-xs text-slate-500 truncate">{poi.description}</div>
                  </div>
                  <div className="text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </div>
                </button>
              ))
            ) : (
              <div className="text-center py-12 text-slate-400">
                <div className="text-5xl mb-3">🔍</div>
                <p className="text-sm font-semibold text-slate-600">No destinations found</p>
                <p className="text-xs mt-1">Try "IST", "Auditorium", or "Knowledge Park"</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Map View */}
      <main className="flex-1 relative">
        <NavigationMap 
          userLocation={userLocation} 
          targetPOI={targetPOI} 
          hideOverlay={showPOIInfo || showAssistant}
        />
        
        {/* Simulation Controls */}
        {isSimulation && (
          <div className="absolute top-4 right-4 flex flex-col gap-2 z-[600]">
            <div className="grid grid-cols-3 gap-1 p-2 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
              <div />
              <button onClick={() => handleManualMove('N')} className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center">▲</button>
              <div />
              <button onClick={() => handleManualMove('W')} className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center">◀</button>
              <button onClick={() => handleManualMove('S')} className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center">▼</button>
              <button onClick={() => handleManualMove('E')} className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center">▶</button>
            </div>
          </div>
        )}

        {/* Arrival Notification / POI Info */}
        {targetPOI && isArrived && showPOIInfo && !showAssistant && (
          <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-50 z-[700] flex flex-col overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-slate-200 p-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                  ✓ Arrived
                </span>
              </div>
              <button 
                onClick={() => setShowPOIInfo(false)} 
                className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors"
              >
                <span className="text-xl">✕</span>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 space-y-6">
              {/* Title */}
              <div>
                <h1 className="text-3xl font-black text-slate-900 leading-tight">{targetPOI.name}</h1>
                <p className="text-slate-600 mt-2 text-sm">{targetPOI.description}</p>
              </div>

              {/* Image */}
              <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-slate-100">
                <img 
                  src={targetPOI.imageUrl} 
                  alt={targetPOI.name} 
                  className="w-full h-56 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
              </div>

              {/* Details */}
              <div className="space-y-5">
                <section className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                  <h3 className="text-indigo-600 font-bold text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span>📍</span> About This Location
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-700">{targetPOI.longDescription}</p>
                </section>

                {targetPOI.facilities && targetPOI.facilities.length > 0 && (
                  <section className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                    <h3 className="text-indigo-600 font-bold text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                      <span>🏢</span> Available Facilities
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {targetPOI.facilities.map(f => (
                        <span key={f} className="bg-indigo-50 text-indigo-700 px-3 py-2 rounded-xl text-xs font-semibold border border-indigo-100">
                          {f}
                        </span>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="sticky bottom-0 bg-white border-t border-slate-200 p-6 space-y-3">
              <button 
                onClick={() => playNarrationWithFeedback(targetPOI.longDescription, activeLanguage)}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-200 active:scale-95 transition-transform flex items-center justify-center gap-2"
              >
                <span className="text-xl">🔊</span>
                <span>Listen in {activeLanguage}</span>
              </button>
              <button 
                onClick={() => setShowAssistant(true)}
                className="w-full bg-white border-2 border-indigo-600 text-indigo-600 font-bold py-4 rounded-2xl active:scale-95 transition-transform flex items-center justify-center gap-2"
              >
                <span className="text-xl">💬</span>
                <span>Ask Campus Assistant</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Navigation Footer */}
      {targetPOI && (
        <footer className="bg-white border-t p-4 shadow-lg z-10">
          <div className="flex justify-around items-center">
            <button 
              onClick={() => { setTargetPOI(null); setIsArrived(false); setShowPOIInfo(false); }} 
              className="flex flex-col items-center gap-1 p-2 hover:bg-slate-50 rounded-xl transition-colors"
            >
              <span className="text-2xl">🏠</span>
              <span className="text-[10px] font-bold uppercase text-slate-600">Home</span>
            </button>
            <button 
              onClick={() => setShowPOIInfo(true)} 
              className="flex flex-col items-center gap-1 p-2 hover:bg-slate-50 rounded-xl transition-colors"
            >
              <span className="text-2xl">ℹ️</span>
              <span className="text-[10px] font-bold uppercase text-slate-600">Info</span>
            </button>
            <button 
              disabled={!isArrived} 
              onClick={() => setShowAssistant(true)}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${
                !isArrived ? 'opacity-30 cursor-not-allowed' : 'hover:bg-slate-50'
              }`}
            >
              <span className="text-2xl">💬</span>
              <span className="text-[10px] font-bold uppercase text-slate-600">Chat</span>
            </button>
          </div>
        </footer>
      )}

      {/* Chatbot Modal */}
      {showAssistant && targetPOI && (
        <div className="fixed inset-0 z-[800]">
          <Assistant 
            currentPOI={targetPOI} 
            onClose={() => setShowAssistant(false)}
            language={activeLanguage}
          />
        </div>
      )}
    </div>
  );
};

export default App;
