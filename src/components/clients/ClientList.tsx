
import React from "react";
import { mockClients } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { MessageSquare, MoreHorizontal, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ClientList: React.FC = () => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Clients</h2>
        <Button>Ajouter un client</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockClients.map((client) => (
          <Card key={client.id} className="overflow-hidden">
            <CardHeader className="p-5 pb-0 flex flex-row justify-between items-start">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={client.avatarUrl} />
                  <AvatarFallback>{getInitials(client.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{client.name}</CardTitle>
                  <p className="text-sm text-gray-500">{client.email}</p>
                  <div className="mt-1">
                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                      Client actif
                    </Badge>
                  </div>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Modifier</DropdownMenuItem>
                  <DropdownMenuItem>Désactiver</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="p-5">
              <div className="text-xs text-gray-500 mb-4">
                Dernière activité: {formatDistanceToNow(client.lastSeen!, { addSuffix: true, locale: fr })}
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" asChild className="flex-1">
                  <Link to={`/messages?client=${client.id}`}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild className="flex-1">
                  <Link to={`/documents?client=${client.id}`}>
                    <FileText className="h-4 w-4 mr-2" />
                    Documents
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClientList;
