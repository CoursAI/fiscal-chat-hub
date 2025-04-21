
import React from "react";
import LoginForm from "@/components/auth/LoginForm";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Building, MessageSquare, ShieldCheck, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const Login: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-fiscal-blue-50 to-white">
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
    <div className="min-h-screen bg-gradient-to-br from-fiscal-blue-50 to-white flex">
      {/* Left side - Login form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-6 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center group">
              <div className="bg-fiscal-blue-600 rounded-full w-10 h-10 flex items-center justify-center mr-3 shadow-md">
                <span className="text-white font-bold">FC</span>
              </div>
              <span className="text-2xl font-bold text-fiscal-blue-700">Fiscal Chat Hub</span>
            </Link>
            <Button asChild variant="ghost" size="sm" className="text-fiscal-blue-600 hover:text-fiscal-blue-700">
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Link>
            </Button>
          </div>
          
          <div className="text-center mt-8">
            <h1 className="text-3xl font-bold text-fiscal-blue-900 mb-2">Bienvenue</h1>
            <p className="text-gray-600">
              Connectez-vous pour accéder à votre espace personnel
            </p>
          </div>
          
          <div className="mt-8">
            <LoginForm />
          </div>
        </div>
      </div>

      {/* Right side - Image (hidden on mobile) */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-fiscal-blue-600 to-fiscal-blue-800 overflow-hidden relative">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="h-full flex items-center justify-center p-12 relative z-10">
          <div className="max-w-lg">
            <h2 className="text-4xl font-bold text-white mb-6">
              Une communication professionnelle et sécurisée
            </h2>
            <p className="text-fiscal-blue-100 text-lg mb-10">
              Bienvenue dans votre espace d'échange personnel avec votre cabinet d'expertise comptable.
              Communiquez de manière sécurisée et centralisée.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start bg-white/10 rounded-xl p-5 transform transition-transform hover:scale-105 hover:bg-white/15">
                <MessageSquare className="w-8 h-8 text-white mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-white font-medium text-lg">Communication simplifiée</h3>
                  <p className="text-fiscal-blue-200 mt-1">Échangez directement avec votre expert-comptable en un clic</p>
                </div>
              </div>
              
              <div className="flex items-start bg-white/10 rounded-xl p-5 transform transition-transform hover:scale-105 hover:bg-white/15">
                <Building className="w-8 h-8 text-white mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-white font-medium text-lg">Adapté aux entreprises</h3>
                  <p className="text-fiscal-blue-200 mt-1">Une solution pensée pour les besoins des professionnels</p>
                </div>
              </div>
              
              <div className="flex items-start bg-white/10 rounded-xl p-5 transform transition-transform hover:scale-105 hover:bg-white/15">
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
