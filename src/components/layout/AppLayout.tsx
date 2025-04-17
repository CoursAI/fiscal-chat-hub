
import React, { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Navigate, useNavigate } from "react-router-dom";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  // Effet pour s'assurer que l'utilisateur est redirigé s'il se déconnecte
  useEffect(() => {
    console.log("AppLayout - Authentication state:", isAuthenticated, "Loading:", isLoading);
    if (!isLoading && !isAuthenticated) {
      console.log("AppLayout - Not authenticated, redirecting to /login");
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fiscal-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log("AppLayout - Not authenticated, rendering Navigate component");
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
