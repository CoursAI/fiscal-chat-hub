
import React from "react";
import RegisterForm from "@/components/auth/RegisterForm";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Register: React.FC = () => {
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
      {/* Left side - Register form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-6">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-fiscal-blue-700">Fiscal Chat Hub</h1>
            <p className="mt-2 text-gray-600">
              Inscrivez-vous pour rejoindre notre plateforme
            </p>
          </div>
          <RegisterForm />
        </div>
      </div>

      {/* Right side - Image (hidden on mobile) */}
      <div className="hidden md:block md:w-1/2 bg-fiscal-blue-600">
        <div className="h-full flex items-center justify-center p-10">
          <div className="max-w-lg">
            <h2 className="text-4xl font-bold text-white mb-6">
              Rejoignez notre plateforme de communication dédiée
            </h2>
            <p className="text-fiscal-blue-100 text-lg mb-8">
              Un espace d'échange personnel avec votre cabinet d'expertise comptable.
              Partagez vos documents et communiquez de manière simple et sécurisée.
            </p>
            <div className="bg-white/10 rounded-lg p-6">
              <p className="text-white font-medium mb-1">
                "J'apprécie la simplicité de cette plateforme pour échanger avec mon expert-comptable. Tout est centralisé et facile d'accès."
              </p>
              <p className="text-fiscal-blue-200 text-sm">— Un client satisfait</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
