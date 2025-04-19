
import React, { createContext, useState, useContext, useEffect } from "react";
import { User } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    console.log("AuthProvider - Initializing");
    
    // First check for existing session
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        
        // Get current session
        const { data: { session: existingSession } } = await supabase.auth.getSession();
        console.log("AuthProvider - Initial session check:", existingSession?.user?.email);
        setSession(existingSession);
        
        if (existingSession?.user) {
          await fetchUserProfile(existingSession.user.id);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        setIsLoading(false);
      }
    };
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log("AuthProvider - Auth state changed:", { event, user: newSession?.user?.email });
        setSession(newSession);
        
        if (newSession?.user) {
          await fetchUserProfile(newSession.user.id);
        } else {
          setCurrentUser(null);
          setIsLoading(false);
        }
      }
    );

    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const fetchUserProfile = async (userId: string) => {
    try {
      console.log("AuthProvider - Fetching profile for:", userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        throw error;
      }

      if (data) {
        console.log("AuthProvider - Profile loaded:", data);
        const authUser = await supabase.auth.getUser();
        setCurrentUser({
          id: data.id,
          name: data.full_name,
          email: authUser.data.user?.email || '',
          role: data.role as 'admin' | 'client',
          avatarUrl: undefined,
          lastSeen: data.updated_at ? new Date(data.updated_at) : undefined
        });
      } else {
        console.error("No profile found for user:", userId);
        toast({
          title: "Erreur",
          description: "Profil utilisateur introuvable",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("AuthProvider - Error fetching profile:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger votre profil",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      console.log("Attempting login for:", email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error.message);
        toast({
          title: "Erreur de connexion",
          description: error.message === "Invalid login credentials" 
            ? "Email ou mot de passe incorrect" 
            : error.message,
          variant: "destructive",
        });
        setIsLoading(false);
        throw error;
      }

      console.log("Login successful:", data?.user?.id);
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur votre espace personnel !",
      });
      
      navigate('/messages', { replace: true });
    } catch (error: any) {
      // Error handling is done above
      setIsLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      console.log("Logging out");
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setCurrentUser(null);
      setSession(null);
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt !",
      });
      
      navigate('/login', { replace: true });
    } catch (error: any) {
      console.error("Logout error:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la déconnexion.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
    isAuthenticated: !!session?.user,
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
