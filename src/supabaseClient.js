import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let supabase;

if (!supabaseUrl || !supabaseKey) {
  console.warn("Supabase URL or Key is missing. Check your .env file.");
  // Create a dummy client object to prevent immediate crashes, 
  // but auth calls will fail gracefully or log errors.
  supabase = {
    auth: {
      signUp: async () => ({ error: { message: "Supabase not configured." } }),
      signInWithPassword: async () => ({ error: { message: "Supabase not configured." } }),
      signOut: async () => ({ error: { message: "Supabase not configured." } }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
      getSession: async () => ({ data: { session: null }, error: null }),
      getUser: async () => ({ data: { user: null }, error: null }),
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: async () => ({ data: null, error: { message: "Supabase not configured." } })
        })
      })
    })
  };
} else {
  supabase = createClient(supabaseUrl, supabaseKey);
}

export { supabase };