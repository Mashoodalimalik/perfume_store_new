import { createClient } from '@supabase/supabase-js'

// This grabs the keys we put in the .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// This creates the connection
export const supabase = createClient(supabaseUrl, supabaseKey)