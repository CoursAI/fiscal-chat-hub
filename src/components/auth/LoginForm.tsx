
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { ArrowRight, Mail, Lock, LogIn, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login(email, password);
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur votre espace personnel !",
      });
    } catch (error: any) {
      console.error("Login error:", error.message);
      if (error.message === "Invalid login credentials") {
        setError("Email ou mot de passe incorrect");
      } else {
        setError(error.message || "Une erreur est survenue lors de la connexion");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-gray-700 font-medium">Adresse email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
          <Input
            id="email"
            type="email"
            placeholder="votre@email.com"
            className="pl-10 py-3 bg-white border-gray-200 focus:border-fiscal-blue-500 focus:ring-fiscal-blue-500 rounded-xl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="password" className="text-gray-700 font-medium">Mot de passe</Label>
          <a href="#" className="text-sm text-fiscal-blue-600 hover:underline font-medium">Mot de passe oublié ?</a>
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
          <Input
            id="password"
            type="password"
            className="pl-10 py-3 bg-white border-gray-200 focus:border-fiscal-blue-500 focus:ring-fiscal-blue-500 rounded-xl"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="rounded-xl">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="ml-2">{error}</AlertDescription>
        </Alert>
      )}

      <div>
        <Button
          type="submit"
          className="w-full py-6"
          variant="gradient"
          size="lg"
          rounded="full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
              <span>Connexion...</span>
            </div>
          ) : (
            <>
              <span>Se connecter</span>
              <LogIn className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </div>

      <div className="text-center text-sm">
        <p className="text-gray-600">
          Pas encore de compte ?{" "}
          <Link to="/register" className="text-fiscal-blue-600 hover:underline font-medium group">
            S'inscrire <ArrowRight className="inline h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </p>
        
        <div className="mt-8 p-5 bg-gray-50 border border-gray-100 rounded-xl shadow-sm">
          <p className="text-gray-600 font-medium mb-3">Comptes de démonstration :</p>
          <div className="grid gap-2 text-xs">
            <div className="px-3 py-2 bg-white border border-gray-200 rounded-md">
              <p className="text-fiscal-blue-600 font-bold">Admin</p>
              <p className="text-gray-500">admin@fiscalchat.com / password123</p>
            </div>
            <div className="px-3 py-2 bg-white border border-gray-200 rounded-md">
              <p className="text-fiscal-blue-600 font-bold">Client</p>
              <p className="text-gray-500">client@example.com / password123</p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
