
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  FileText, 
  Users, 
  TrendingUp,
  ShieldCheck, 
  Clock
} from "lucide-react";

const Welcome: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-fiscal-blue-700 to-fiscal-blue-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-10 pb-16">
        <nav className="flex items-center justify-between mb-16">
          <div className="flex items-center">
            <div className="bg-white rounded-full p-2 mr-3">
              <div className="bg-fiscal-blue-600 rounded-full w-8 h-8 flex items-center justify-center">
                <span className="text-white font-bold">FC</span>
              </div>
            </div>
            <span className="text-white font-bold text-xl">Fiscal Chat Hub</span>
          </div>
          <div className="flex gap-4">
            <Link to="/login">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                Connexion
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-white text-fiscal-blue-700 hover:bg-white/90">
                S'inscrire
              </Button>
            </Link>
          </div>
        </nav>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Communiquez simplement avec votre expert-comptable
            </h1>
            <p className="text-fiscal-blue-100 text-lg md:text-xl mb-8">
              Une plateforme dédiée pour échanger efficacement avec votre cabinet d'expertise comptable.
              Partagez vos documents, posez vos questions et suivez vos dossiers en un seul endroit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                <Button size="lg" className="bg-white text-fiscal-blue-700 hover:bg-white/90 font-bold">
                  Commencer gratuitement
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                  Connexion
                </Button>
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-full h-full rounded-xl bg-fiscal-blue-600"></div>
              <img 
                src="/placeholder.svg" 
                alt="Dashboard Preview" 
                className="rounded-xl shadow-2xl relative z-10 w-full"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Tout ce dont vous avez besoin pour une communication efficace
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<MessageSquare className="w-10 h-10 text-fiscal-blue-600" />}
              title="Messagerie sécurisée"
              description="Échangez en toute confidentialité avec votre expert-comptable via notre système de messagerie intégrée."
            />
            <FeatureCard 
              icon={<FileText className="w-10 h-10 text-fiscal-blue-600" />}
              title="Partage de documents"
              description="Envoyez facilement vos documents comptables et recevez vos livrables en un clic."
            />
            <FeatureCard 
              icon={<Users className="w-10 h-10 text-fiscal-blue-600" />}
              title="Gestion des clients"
              description="Pour les cabinets, gérez tous vos clients sur une seule et même plateforme."
            />
            <FeatureCard 
              icon={<TrendingUp className="w-10 h-10 text-fiscal-blue-600" />}
              title="Suivi en temps réel"
              description="Suivez l'avancement de vos dossiers et restez informé des échéances importantes."
            />
            <FeatureCard 
              icon={<ShieldCheck className="w-10 h-10 text-fiscal-blue-600" />}
              title="Sécurité maximale"
              description="Vos données sont protégées par un système de chiffrement avancé conforme au RGPD."
            />
            <FeatureCard 
              icon={<Clock className="w-10 h-10 text-fiscal-blue-600" />}
              title="Disponibilité 24/7"
              description="Accédez à vos informations et communiquez à tout moment, où que vous soyez."
            />
          </div>
        </div>
      </div>
      
      {/* Testimonial Section */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Ce que disent nos clients
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              quote="Grâce à Fiscal Chat Hub, je peux facilement partager mes documents et poser mes questions à mon comptable sans avoir à envoyer des dizaines d'emails."
              author="Marie D."
              role="Dirigeante de PME"
            />
            <TestimonialCard 
              quote="En tant qu'expert-comptable, cette plateforme m'a permis d'optimiser mes échanges avec mes clients et de gagner un temps précieux."
              author="Pierre M."
              role="Expert-comptable"
            />
            <TestimonialCard 
              quote="Interface intuitive et fonctionnelle. Je recommande vivement à tous les entrepreneurs qui veulent simplifier leur relation avec leur comptable."
              author="Sophie L."
              role="Entrepreneuse"
            />
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-fiscal-blue-700 py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Prêt à simplifier vos échanges comptables ?
          </h2>
          <p className="text-fiscal-blue-100 text-xl mb-8 max-w-3xl mx-auto">
            Rejoignez les milliers d'entreprises qui utilisent déjà Fiscal Chat Hub pour communiquer efficacement avec leur expert-comptable.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-white text-fiscal-blue-700 hover:bg-white/90 font-bold px-8">
              Créer un compte gratuitement
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-fiscal-blue-900 text-fiscal-blue-100 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <div className="bg-white rounded-full p-1 mr-2">
                <div className="bg-fiscal-blue-600 rounded-full w-6 h-6 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">FC</span>
                </div>
              </div>
              <span className="text-white font-bold">Fiscal Chat Hub</span>
            </div>
            <div className="text-sm">
              &copy; {new Date().getFullYear()} Fiscal Chat Hub. Tous droits réservés.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { 
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardContent className="pt-6">
        <div className="mb-5">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};

const TestimonialCard = ({ quote, author, role }: {
  quote: string;
  author: string;
  role: string;
}) => {
  return (
    <Card className="border-none shadow-lg">
      <CardContent className="pt-6">
        <div className="text-fiscal-blue-600 text-4xl font-serif mb-4">"</div>
        <p className="text-gray-700 mb-6 italic">{quote}</p>
        <div>
          <p className="font-bold text-gray-800">{author}</p>
          <p className="text-gray-500 text-sm">{role}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Welcome;
