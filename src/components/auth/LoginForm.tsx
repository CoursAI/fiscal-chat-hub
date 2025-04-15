
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login(email, password);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <div className="space-y-2">
        <Label htmlFor="email">Adresse email</Label>
        <Input
          id="email"
          type="email"
          placeholder="votre@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Mot de passe</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="pt-2">
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
              <span>Connexion...</span>
            </div>
          ) : (
            "Se connecter"
          )}
        </Button>
      </div>

      <div className="text-center text-sm">
        <p>
          Pas encore de compte ?{" "}
          <Link to="/register" className="text-fiscal-blue-600 hover:underline">
            S'inscrire
          </Link>
        </p>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <p className="text-gray-600 text-xs mb-2">Pour la démo :</p>
          <p className="text-fiscal-blue-600 text-xs">Admin : admin@fiscalchat.com / admin</p>
          <p className="text-fiscal-blue-600 text-xs">Client : jean@example.com / client</p>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
