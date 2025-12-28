import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wmjuolovjtopifixvvcl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtanVvbG92anRvcGlmaXh2dmNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3NzIyMTcsImV4cCI6MjA4MjM0ODIxN30.M8b_d-WObAmdlbxdUTSJYoUsjcjQhWEk0TjOqV5mEQI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
