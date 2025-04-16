
import React from "react";
import LoginForm from "@/components/auth/LoginForm";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Building, MessageSquare, ShieldCheck } from "lucide-react";

const Login: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fiscal-blue-600 mb-4"></div>
          <p className="text-fiscal-blue-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/messages" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left side - Login form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-6 py-12">
        <Link to="/" className="flex items-center mb-8">
          <div className="bg-fiscal-blue-600 rounded-full w-10 h-10 flex items-center justify-center mr-3">
            <span className="text-white font-bold">FC</span>
          </div>
          <span className="text-2xl font-bold text-fiscal-blue-700">Fiscal Chat Hub</span>
        </Link>
        
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Bienvenue</h1>
            <p className="text-gray-600">
              Connectez-vous pour accéder à votre espace personnel
            </p>
          </div>
          <LoginForm />
        </div>
      </div>

      {/* Right side - Image (hidden on mobile) */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-fiscal-blue-600 to-fiscal-blue-800">
        <div className="h-full flex items-center justify-center p-12">
          <div className="max-w-lg">
            <h2 className="text-4xl font-bold text-white mb-6">
              Une communication professionnelle et sécurisée
            </h2>
            <p className="text-fiscal-blue-100 text-lg mb-10">
              Bienvenue dans votre espace d'échange personnel avec votre cabinet d'expertise comptable.
              Communiquez de manière sécurisée et centralisée.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start bg-white/10 rounded-lg p-5">
                <MessageSquare className="w-8 h-8 text-white mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-white font-medium text-lg">Communication simplifiée</h3>
                  <p className="text-fiscal-blue-200 mt-1">Échangez directement avec votre expert-comptable en un clic</p>
                </div>
              </div>
              
              <div className="flex items-start bg-white/10 rounded-lg p-5">
                <Building className="w-8 h-8 text-white mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-white font-medium text-lg">Adapté aux entreprises</h3>
                  <p className="text-fiscal-blue-200 mt-1">Une solution pensée pour les besoins des professionnels</p>
                </div>
              </div>
              
              <div className="flex items-start bg-white/10 rounded-lg p-5">
                <ShieldCheck className="w-8 h-8 text-white mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-white font-medium text-lg">Sécurité garantie</h3>
                  <p className="text-fiscal-blue-200 mt-1">Vos données sont protégées selon les normes les plus strictes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
