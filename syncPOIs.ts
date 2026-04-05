import { config } from 'dotenv';
import { supabase } from './services/supabaseNode';
import { CAMPUS_POIS } from './data/campusPOIs';

// Load environment variables from .env.local
config({ path: '.env.local' });

const insertMultiplePOIs = async (pois: typeof CAMPUS_POIS) => {
  const dbPOIs = pois.map(poi => ({
    id: poi.id,
    name: poi.name,
    category: poi.category,
    short_description: poi.description,
    long_description: poi.longDescription,
    specific_details: poi.academicDetails,
    latitude: poi.location.latitude,
    longitude: poi.location.longitude,
    primary_image_url: poi.imageUrl,
    language_support: poi.languageSupport
  }));

  const { error } = await supabase
    .from('locations')
    .upsert(dbPOIs);

  if (error) throw error;
  console.log('Successfully inserted', pois.length, 'POIs to database');
};

const syncPOIsToDatabase = async () => {
  try {
    console.log('🔄 Syncing POIs to Supabase database...');
    console.log(`📍 Total POIs to sync: ${CAMPUS_POIS.length}`);
    
    await insertMultiplePOIs(CAMPUS_POIS);
    
    console.log('✅ Successfully synced all POIs to database!');
    console.log('📊 POIs synced:', CAMPUS_POIS.map(p => p.name).join(', '));
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to sync POIs:', error);
    process.exit(1);
  }
};

syncPOIsToDatabase();
