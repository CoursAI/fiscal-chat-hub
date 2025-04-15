
import React, { createContext, useState, useContext, useEffect } from "react";
import { User } from "@/types";
import { adminUser, mockClients } from "@/lib/mock-data";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in (via localStorage in this mock version)
    const storedUser = localStorage.getItem("fiscalChatUser");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse stored user", error);
        localStorage.removeItem("fiscalChatUser");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
      
      // Mock login logic
      if (email === adminUser.email && password === "admin") {
        setCurrentUser(adminUser);
        localStorage.setItem("fiscalChatUser", JSON.stringify(adminUser));
        toast({
          title: "Connexion réussie",
          description: `Bienvenue, ${adminUser.name} !`,
        });
      } else {
        const clientUser = mockClients.find(client => client.email === email);
        if (clientUser && password === "client") {
          setCurrentUser(clientUser);
          localStorage.setItem("fiscalChatUser", JSON.stringify(clientUser));
          toast({
            title: "Connexion réussie",
            description: `Bienvenue, ${clientUser.name} !`,
          });
        } else {
          throw new Error("Email ou mot de passe incorrect");
        }
      }
    } catch (error: any) {
      toast({
        title: "Erreur de connexion",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("fiscalChatUser");
    toast({
      title: "Déconnexion réussie",
      description: "À bientôt !",
    });
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
      
      // Check if email is already in use
      const existingUser = [...mockClients, adminUser].find(user => user.email === email);
      if (existingUser) {
        throw new Error("Cet email est déjà utilisé");
      }
      
      // In a real app, we would create a new user in the database
      // For this mock version, we'll just show a success message
      toast({
        title: "Inscription réussie",
        description: "Votre compte a été créé avec succès. Un administrateur examinera votre demande.",
      });
      
    } catch (error: any) {
      toast({
        title: "Erreur d'inscription",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    currentUser,
    isLoading,
    isAuthenticated: !!currentUser,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
