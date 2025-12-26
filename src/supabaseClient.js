const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY; // Ensure this matches Vercel exactly!

export const supabase = createClient(supabaseUrl, supabaseAnonKey);