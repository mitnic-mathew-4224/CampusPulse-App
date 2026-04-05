import { useState, useEffect } from 'react';
import { POI } from './types';
import { getAllPOIs } from './services/realDatabaseService';
import { CAMPUS_POIS } from './data/campusPOIs';

export const usePOIs = () => {
  const [pois, setPOIs] = useState<POI[]>(CAMPUS_POIS); // Start with hardcoded fallback
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingDatabase, setUsingDatabase] = useState(false);

  useEffect(() => {
    const fetchFromDatabase = async () => {
      try {
        setLoading(true);
        const dbPOIs = await getAllPOIs();
        
        if (dbPOIs && dbPOIs.length > 0) {
          setPOIs(dbPOIs);
          setUsingDatabase(true);
          setError(null);
          console.log('✅ Real database connected:', dbPOIs.length, 'POIs loaded');
        } else {
          console.log('⚠️ Database empty, using fallback data');
          setError('Database is empty');
        }
      } catch (err) {
        console.warn('⚠️ Database connection failed, using fallback data:', err);
        setPOIs(CAMPUS_POIS);
        setUsingDatabase(false);
        setError('Database connection failed - using local data');
      } finally {
        setLoading(false);
      }
    };

    fetchFromDatabase();
  }, []);

  return { pois, loading, error, usingDatabase };
};