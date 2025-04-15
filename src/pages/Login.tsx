
import React from "react";
import LoginForm from "@/components/auth/LoginForm";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Login: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fiscal-blue-600"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/messages" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left side - Login form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-6">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-fiscal-blue-700">Fiscal Chat Hub</h1>
            <p className="mt-2 text-gray-600">
              Connectez-vous pour accéder à votre espace personnel
            </p>
          </div>
          <LoginForm />
        </div>
      </div>

      {/* Right side - Image (hidden on mobile) */}
      <div className="hidden md:block md:w-1/2 bg-fiscal-blue-600">
        <div className="h-full flex items-center justify-center p-10">
          <div className="max-w-lg">
            <h2 className="text-4xl font-bold text-white mb-6">
              Une communication professionnelle et sécurisée
            </h2>
            <p className="text-fiscal-blue-100 text-lg mb-8">
              Bienvenue dans votre espace d'échange personnel avec votre cabinet d'expertise comptable.
              Communiquez de manière sécurisée et centralisée.
            </p>
            <div className="bg-white/10 rounded-lg p-6">
              <p className="text-white font-medium mb-1">
                "Cet outil a révolutionné notre façon de travailler avec nos clients. Plus besoin d'emails multiples et de pièces jointes perdues."
              </p>
              <p className="text-fiscal-blue-200 text-sm">— Directeur du cabinet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
