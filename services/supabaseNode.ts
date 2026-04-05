import { createClient } from '@supabase/supabase-js';

// For Node.js scripts only - uses process.env
const supabaseUrl = process.env.SUPABASE_URL || 'https://sdjniixvkikhavikltqh.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkam5paXh2a2lraGF2aWtsdHFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxMjIzNjEsImV4cCI6MjA4NDY5ODM2MX0.P1BaLsb-5bdjNpJ93iEpwZUqica8-mGbdbTr21nUj-o';

export const supabase = createClient(supabaseUrl, supabaseKey);
