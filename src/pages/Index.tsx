
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, ShieldCheck, Rocket } from "lucide-react";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-fiscal-blue-50 to-white">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side: Hero Content */}
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-fiscal-blue-900">
              Simplifiez votre gestion comptable
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Une plateforme moderne qui connecte les entrepreneurs avec leurs experts-comptables.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-fiscal-blue-600 h-6 w-6" />
                <span className="text-gray-700">Communication sécurisée</span>
              </div>
              <div className="flex items-center space-x-3">
                <ShieldCheck className="text-fiscal-blue-600 h-6 w-6" />
                <span className="text-gray-700">Documents centralisés</span>
              </div>
              <div className="flex items-center space-x-3">
                <Rocket className="text-fiscal-blue-600 h-6 w-6" />
                <span className="text-gray-700">Efficacité maximale</span>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button asChild size="lg" className="group">
                <Link to="/login">
                  Connexion
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/register">
                  Créer un compte
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Side: Illustration */}
          <div className="hidden md:flex justify-center">
            <div className="bg-fiscal-blue-100/50 rounded-full p-8">
              <div className="bg-fiscal-blue-200/50 rounded-full p-8">
                <img 
                  src="/placeholder.svg" 
                  alt="Fiscal Chat Hub" 
                  className="w-full max-w-md transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
