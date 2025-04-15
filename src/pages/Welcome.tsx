
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, FileText, Users, Lock, Settings, ChevronRight } from "lucide-react";

const Welcome: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-fiscal-blue-700 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-bold">Fiscal Chat Hub</h1>
            <div className="space-x-2">
              <Button variant="outline" className="text-white border-white hover:bg-fiscal-blue-600" asChild>
                <Link to="/login">Connexion</Link>
              </Button>
              <Button className="bg-white text-fiscal-blue-700 hover:bg-gray-100" asChild>
                <Link to="/register">Inscription</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-fiscal-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Communication sécurisée avec votre cabinet comptable
              </h2>
              <p className="text-lg md:text-xl text-fiscal-blue-100 mb-8">
                Échangez des messages et des documents de manière simple, efficace et sécurisée avec votre expert comptable.
              </p>
              <Button size="lg" className="bg-white text-fiscal-blue-700 hover:bg-gray-100" asChild>
                <Link to="/register">Commencer maintenant <ChevronRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </div>
            <div className="md:w-1/2">
              <div className="bg-fiscal-blue-500 p-8 rounded-xl shadow-lg">
                <div className="bg-white/10 rounded-lg p-6 mb-4">
                  <p className="text-white font-medium mb-2">
                    "Cet outil a révolutionné notre façon de communiquer avec nos clients. Tout est centralisé, sécurisé et traçable."
                  </p>
                  <p className="text-fiscal-blue-200">— Cabinet Comptable</p>
                </div>
                <div className="bg-white/10 rounded-lg p-6">
                  <p className="text-white font-medium mb-2">
                    "Je peux facilement partager mes documents et suivre les échanges avec mon expert-comptable, tout est accessible en un seul endroit."
                  </p>
                  <p className="text-fiscal-blue-200">— Un client satisfait</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Des fonctionnalités adaptées aux besoins comptables</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <MessageSquare className="h-10 w-10 text-fiscal-blue-600 mb-2" />
                <CardTitle>Messagerie Sécurisée</CardTitle>
                <CardDescription>Échangez des messages confidentiels avec votre comptable en toute sécurité.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Conversation dédiée et privée entre vous et votre comptable. Interface intuitive et simple d'utilisation.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <FileText className="h-10 w-10 text-fiscal-blue-600 mb-2" />
                <CardTitle>Partage de Documents</CardTitle>
                <CardDescription>Envoyez et recevez facilement tous vos documents comptables.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Factures, relevés bancaires, déclarations fiscales... Tous vos documents sont centralisés et horodatés.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Lock className="h-10 w-10 text-fiscal-blue-600 mb-2" />
                <CardTitle>Sécurité Maximale</CardTitle>
                <CardDescription>Vos données sont protégées et confidentielles.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Connexion sécurisée, chiffrement des données et accès limité à vous et votre comptable uniquement.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Prêt à simplifier vos échanges ?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Inscrivez-vous dès maintenant et profitez d'une communication fluide et sécurisée avec votre cabinet d'expertise comptable.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-fiscal-blue-600 hover:bg-fiscal-blue-700" asChild>
              <Link to="/register">S'inscrire</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-fiscal-blue-600 text-fiscal-blue-600 hover:bg-fiscal-blue-50" asChild>
              <Link to="/login">Se connecter</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Fiscal Chat Hub</h3>
              <p className="text-gray-300">
                La solution de communication professionnelle pour les cabinets comptables et leurs clients.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Liens Rapides</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-white">Accueil</Link></li>
                <li><Link to="/login" className="text-gray-300 hover:text-white">Connexion</Link></li>
                <li><Link to="/register" className="text-gray-300 hover:text-white">Inscription</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <p className="text-gray-300">contact@fiscalchathub.com</p>
              <p className="text-gray-300">+33 1 23 45 67 89</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2025 Fiscal Chat Hub. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;
