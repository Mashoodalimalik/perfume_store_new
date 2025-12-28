"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

const AuthContext = createContext({
    user: null,
    loading: true,
    login: async () => ({}),
    signup: async () => {},
    logout: async () => {}
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check active session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
         fetchProfile(session.user);
      } else {
         setLoading(false);
      }
    };

    getSession();

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchProfile(session.user);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (authUser) => {
      try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', authUser.id)
            .single();
          
          if (data) {
              setUser({
                  id: authUser.id,
                  email: authUser.email,
                  name: data.full_name, // Mapping full_name to name for app compatibility
                  role: data.role
              });
          } else {
             // Fallback if profile missing (shouldn't happen with trigger)
             setUser({
                 id: authUser.id,
                 email: authUser.email,
                 name: authUser.email.split('@')[0], 
                 role: 'customer' 
             });
          }
      } catch (error) {
          console.error("Error fetching profile:", error);
      } finally {
          setLoading(false);
      }
  };

  const login = async (email, password) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw error;
        
        // Fetch role for immediate redirect logic
        const { data: profile } = await supabase.from('profiles').select('role').eq('id', data.user.id).single();
        
        return { success: true, role: profile?.role || 'customer' };

    } catch (error) {
        console.error("Login Error:", error.message);
        return { success: false, error: error.message };
    }
  };

  const signup = async (name, email, password) => {
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: name,
                },
            },
        });

        if (error) throw error;
        return true;
    } catch (error) {
        console.error("Signup Error:", error.message);
        return false;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
