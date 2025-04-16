
import React from "react";
import RegisterForm from "@/components/auth/RegisterForm";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { FileText, Users, Clock } from "lucide-react";

const Register: React.FC = () => {
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
      {/* Left side - Register form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-6 py-12">
        <Link to="/" className="flex items-center mb-8">
          <div className="bg-fiscal-blue-600 rounded-full w-10 h-10 flex items-center justify-center mr-3">
            <span className="text-white font-bold">FC</span>
          </div>
          <span className="text-2xl font-bold text-fiscal-blue-700">Fiscal Chat Hub</span>
        </Link>
        
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Créer un compte</h1>
            <p className="text-gray-600">
              Inscrivez-vous pour rejoindre notre plateforme
            </p>
          </div>
          <RegisterForm />
        </div>
      </div>

      {/* Right side - Image (hidden on mobile) */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-fiscal-blue-700 to-fiscal-blue-900">
        <div className="h-full flex items-center justify-center p-12">
          <div className="max-w-lg">
            <h2 className="text-4xl font-bold text-white mb-6">
              Rejoignez notre plateforme de communication dédiée
            </h2>
            <p className="text-fiscal-blue-100 text-lg mb-10">
              Un espace d'échange personnel avec votre cabinet d'expertise comptable.
              Partagez vos documents et communiquez de manière simple et sécurisée.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start bg-white/10 rounded-lg p-5">
                <FileText className="w-8 h-8 text-white mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-white font-medium text-lg">Partage de documents</h3>
                  <p className="text-fiscal-blue-200 mt-1">Envoyez et recevez vos documents comptables en toute sécurité</p>
                </div>
              </div>
              
              <div className="flex items-start bg-white/10 rounded-lg p-5">
                <Users className="w-8 h-8 text-white mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-white font-medium text-lg">Collaboration efficace</h3>
                  <p className="text-fiscal-blue-200 mt-1">Travaillez main dans la main avec votre expert-comptable</p>
                </div>
              </div>
              
              <div className="flex items-start bg-white/10 rounded-lg p-5">
                <Clock className="w-8 h-8 text-white mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-white font-medium text-lg">Accès 24h/24 et 7j/7</h3>
                  <p className="text-fiscal-blue-200 mt-1">Consultez vos informations à tout moment depuis n'importe où</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
