import React, { createContext, useState, useContext, useEffect } from "react";
import { User } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { useNavigate, useLocation } from "react-router-dom";

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  updateProfile: (data: { name?: string }) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("AuthProvider mounted, checking session");
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.log("Auth state changed:", event, "User:", newSession?.user?.email);
        setSession(newSession);
        
        if (newSession?.user) {
          // Defer Supabase calls with setTimeout to prevent deadlocks
          setTimeout(() => {
            fetchUserProfile(newSession.user.id);
          }, 0);
        } else {
          setCurrentUser(null);
          setIsLoading(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: existingSession } }) => {
      console.log("Initial session check:", existingSession ? "logged in" : "not logged in");
      setSession(existingSession);
      
      if (existingSession?.user) {
        fetchUserProfile(existingSession.user.id);
      } else {
        setIsLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Handle redirections when authentication state changes
  useEffect(() => {
    console.log("Auth state effect - User:", currentUser?.email, "Loading:", isLoading);
    
    if (!isLoading) {
      if (currentUser) {
        // User is authenticated
        console.log("User authenticated, current path:", location.pathname);
        if (location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/') {
          console.log("Redirecting to messages page");
          navigate('/messages', { replace: true });
        }
      } else if (location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/register') {
        // User is not authenticated and trying to access a protected route
        console.log("User not authenticated, redirecting to login");
        navigate('/login', { replace: true });
      }
    }
  }, [currentUser, isLoading, location.pathname, navigate]);

  const fetchUserProfile = async (userId: string) => {
    try {
      console.log("Fetching user profile for:", userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        setIsLoading(false);
        throw error;
      }

      if (data) {
        const authUser = await supabase.auth.getUser();
        console.log("User profile loaded:", data);
        setCurrentUser({
          id: data.id,
          name: data.full_name,
          email: authUser.data.user?.email || '',
          role: data.role as 'admin' | 'client',
          avatarUrl: undefined,
          lastSeen: data.updated_at ? new Date(data.updated_at) : undefined
        });
      }
    } catch (error) {
      console.error('Error processing user profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      console.log("Attempting login for:", email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error.message);
        setIsLoading(false);
        toast({
          title: "Erreur de connexion",
          description: error.message === "Invalid login credentials" 
            ? "Email ou mot de passe incorrect" 
            : error.message,
          variant: "destructive",
        });
        throw error;
      }

      console.log("Login successful:", data?.user?.id);
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur votre espace personnel !",
      });
      
      // Manual redirection as a fallback (the useEffect should handle this)
      setTimeout(() => {
        navigate('/messages', { replace: true });
      }, 500);
    } catch (error: any) {
      // Error handling is done above
      throw error;
    }
    // Don't set isLoading to false here as the auth state change will handle this
  };

  const logout = async () => {
    try {
      console.log("Logging out");
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setCurrentUser(null);
      setSession(null);
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt !",
      });
    } catch (error: any) {
      console.error("Logout error:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la déconnexion.",
        variant: "destructive",
      });
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      console.log("Attempting registration for:", email);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (error) {
        console.error("Registration error:", error.message);
        toast({
          title: "Erreur d'inscription",
          description: error.message === "User already registered" 
            ? "Un compte avec cet email existe déjà" 
            : error.message,
          variant: "destructive",
        });
        throw error;
      }

      console.log("Registration successful:", data);
      toast({
        title: "Inscription réussie",
        description: "Votre compte a été créé avec succès.",
      });
    } catch (error: any) {
      // Error handling is done above
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: { name?: string }) => {
    if (!currentUser) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ full_name: data.name })
        .eq('id', currentUser.id);

      if (error) throw error;

      setCurrentUser(prev => prev ? { ...prev, name: data.name || prev.name } : null);
      
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont bien été enregistrées.",
      });
    } catch (error: any) {
      toast({
        title: "Erreur de mise à jour",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const updatePassword = async (newPassword: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      toast({
        title: "Mot de passe mis à jour",
        description: "Votre nouveau mot de passe a été enregistré.",
      });
    } catch (error: any) {
      toast({
        title: "Erreur de mise à jour",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const value = {
    currentUser,
    isLoading,
    isAuthenticated: !!currentUser,
    login,
    logout,
    register,
    updateProfile,
    updatePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
