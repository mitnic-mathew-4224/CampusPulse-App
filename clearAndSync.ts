import { config } from 'dotenv';
import { supabase } from './services/supabase';
import { insertMultiplePOIs } from './services/realDatabaseService';
import { CAMPUS_POIS } from './data/campusPOIs';

// Load environment variables from .env.local
config({ path: '.env.local' });

const clearAndSyncPOIs = async () => {
  try {
    console.log('🗑️  Clearing old POIs from database...');
    
    // Delete all existing POIs
    const { error: deleteError } = await supabase
      .from('locations')
      .delete()
      .neq('id', 'dummy-value-that-never-exists'); // This deletes all rows
    
    if (deleteError) {
      console.error('Error clearing database:', deleteError);
      throw deleteError;
    }
    
    console.log('✅ Database cleared successfully!');
    console.log('');
    console.log('🔄 Syncing fresh POIs to database...');
    console.log(`📍 Total POIs to sync: ${CAMPUS_POIS.length}`);
    
    await insertMultiplePOIs(CAMPUS_POIS);
    
    console.log('✅ Successfully synced all POIs to database!');
    console.log('📊 POIs synced:', CAMPUS_POIS.map(p => p.name).join(', '));
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to clear and sync POIs:', error);
    process.exit(1);
  }
};

clearAndSyncPOIs();
