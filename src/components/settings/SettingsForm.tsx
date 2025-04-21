
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { UploadCloud } from "lucide-react";

const SettingsForm: React.FC = () => {
  const { currentUser } = useAuth();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Paramètres</h2>
        <p className="text-gray-500">Gérez vos informations de compte et vos préférences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile section */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Profil</CardTitle>
            <CardDescription>
              Gérez vos informations personnelles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <Avatar className="h-20 w-20">
                <AvatarImage src={currentUser?.avatarUrl} />
                <AvatarFallback className="text-lg">
                  {currentUser?.name ? getInitials(currentUser.name) : "?"}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Formats acceptés: JPG, PNG. Max 1MB</p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">
                    <UploadCloud className="h-4 w-4 mr-2" />
                    Charger une photo
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-500">
                    Supprimer
                  </Button>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input
                    id="name"
                    defaultValue={currentUser?.name}
                    placeholder="Votre nom"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Adresse email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={currentUser?.email}
                    placeholder="votre@email.com"
                    disabled
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+33 6 12 34 56 78"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Société</Label>
                  <Input
                    id="company"
                    placeholder="Nom de votre société"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Button>Enregistrer les modifications</Button>
            </div>
          </CardContent>
        </Card>

        {/* Password section */}
        <Card>
          <CardHeader>
            <CardTitle>Sécurité</CardTitle>
            <CardDescription>
              Gérez vos mots de passe et paramètres de sécurité
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Mot de passe actuel</Label>
                <Input
                  id="current-password"
                  type="password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Nouveau mot de passe</Label>
                <Input
                  id="new-password"
                  type="password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                <Input
                  id="confirm-password"
                  type="password"
                />
              </div>
            </div>
            <div className="pt-2">
              <Button>Changer le mot de passe</Button>
            </div>
          </CardContent>
        </Card>

        {/* Notification settings */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Gérez vos préférences de notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Nouveaux messages</h4>
                  <p className="text-sm text-gray-500">
                    Recevoir des notifications pour les nouveaux messages
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Nouveaux documents</h4>
                  <p className="text-sm text-gray-500">
                    Recevoir des notifications pour les nouveaux documents
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Notifications par email</h4>
                  <p className="text-sm text-gray-500">
                    Recevoir des notifications par email en plus des notifications dans l'application
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsForm;
