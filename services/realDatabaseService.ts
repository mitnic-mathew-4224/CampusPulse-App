import { supabase } from './supabase';
import { POI } from '../types';

export const getAllPOIs = async (): Promise<POI[]> => {
  try {
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .order('name');

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    // Transform database format to POI format
    const pois: POI[] = data.map(row => ({
      id: row.id,
      name: row.name,
      category: row.category,
      description: row.short_description,
      longDescription: row.long_description,
      academicDetails: row.specific_details,
      facilities: row.specific_details?.facilities || [],
      location: {
        latitude: row.latitude,
        longitude: row.longitude
      },
      imageUrl: row.primary_image_url,
      languageSupport: row.language_support || []
    }));

    return pois;
  } catch (error) {
    console.error('Error fetching POIs from database:', error);
    throw error;
  }
};

export const getPOIById = async (id: string): Promise<POI | null> => {
  try {
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Not found
      }
      throw error;
    }

    return {
      id: data.id,
      name: data.name,
      category: data.category,
      description: data.short_description,
      longDescription: data.long_description,
      academicDetails: data.specific_details,
      facilities: data.specific_details?.facilities || [],
      location: {
        latitude: data.latitude,
        longitude: data.longitude
      },
      imageUrl: data.primary_image_url,
      languageSupport: data.language_support || []
    };
  } catch (error) {
    console.error('Error fetching POI by ID:', error);
    throw error;
  }
};

export const insertPOI = async (poi: POI): Promise<void> => {
  try {
    const { error } = await supabase
      .from('locations')
      .insert({
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
      });

    if (error) throw error;
  } catch (error) {
    console.error('Error inserting POI:', error);
    throw error;
  }
};

export const insertMultiplePOIs = async (pois: POI[]): Promise<void> => {
  try {
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
  } catch (error) {
    console.error('Error inserting multiple POIs:', error);
    throw error;
  }
};