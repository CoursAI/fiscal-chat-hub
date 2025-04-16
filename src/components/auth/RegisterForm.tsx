
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { ArrowRight, User, Mail, Lock, Check, UserPlus } from "lucide-react";

const RegisterForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Basic validation
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    setIsSubmitting(true);

    try {
      await register(name, email, password);
      setSuccess(true);
      // Reset form
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
      {success ? (
        <div className="bg-green-50 border border-green-100 text-green-700 p-6 rounded-lg">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-green-100 rounded-full p-2">
              <Check className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <h3 className="font-bold text-lg text-green-800 mb-2 text-center">Inscription réussie !</h3>
          <p className="mb-6 text-center">
            Votre demande a été envoyée avec succès. Un administrateur examinera votre demande
            et activera votre compte prochainement.
          </p>
          <Link 
            to="/login" 
            className="block w-full py-2 px-4 bg-green-600 text-white text-center rounded-md hover:bg-green-700 transition-colors"
          >
            Retour à la page de connexion
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-700 font-medium">Nom complet</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
              <Input
                id="name"
                type="text"
                placeholder="Jean Dupont"
                className="pl-10 py-3 bg-white border-gray-200 focus:border-fiscal-blue-500 focus:ring-fiscal-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 font-medium">Adresse email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                className="pl-10 py-3 bg-white border-gray-200 focus:border-fiscal-blue-500 focus:ring-fiscal-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700 font-medium">Mot de passe</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
              <Input
                id="password"
                type="password"
                className="pl-10 py-3 bg-white border-gray-200 focus:border-fiscal-blue-500 focus:ring-fiscal-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <p className="text-xs text-gray-500">Minimum 6 caractères</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-gray-700 font-medium">Confirmer le mot de passe</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
              <Input
                id="confirm-password"
                type="password"
                className="pl-10 py-3 bg-white border-gray-200 focus:border-fiscal-blue-500 focus:ring-fiscal-blue-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <Button 
              type="submit" 
              className="w-full py-3" 
              variant="gradient"
              size="lg" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                  <span>Traitement...</span>
                </div>
              ) : (
                <>
                  <span>S'inscrire</span>
                  <UserPlus className="ml-1 h-5 w-5" />
                </>
              )}
            </Button>
          </div>

          <div className="text-center text-sm">
            <p className="text-gray-600">
              Déjà un compte ?{" "}
              <Link to="/login" className="text-fiscal-blue-600 hover:underline font-medium">
                Se connecter <ArrowRight className="inline h-3 w-3" />
              </Link>
            </p>
          </div>
        </>
      )}
    </form>
  );
};

export default RegisterForm;
