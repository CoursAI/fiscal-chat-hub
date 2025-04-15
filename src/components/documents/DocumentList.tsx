
import React from "react";
import { mockAttachments } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileIcon, FileTextIcon, ImageIcon, Download, Eye, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const DocumentList: React.FC = () => {
  const getFileIcon = (type: string) => {
    if (type.includes("image")) {
      return <ImageIcon className="h-8 w-8 text-orange-500" />;
    } else if (type.includes("pdf")) {
      return <FileTextIcon className="h-8 w-8 text-red-500" />;
    } else {
      return <FileIcon className="h-8 w-8 text-fiscal-blue-500" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  const formatDate = (date: Date) => {
    return format(date, "dd MMM yyyy à HH:mm", { locale: fr });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Documents</h2>
        <Button>Télécharger un document</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Documents récents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-3 text-left font-medium text-gray-500 text-sm">Type</th>
                  <th className="pb-3 text-left font-medium text-gray-500 text-sm">Nom</th>
                  <th className="pb-3 text-left font-medium text-gray-500 text-sm">Taille</th>
                  <th className="pb-3 text-left font-medium text-gray-500 text-sm">Date d'envoi</th>
                  <th className="pb-3 text-left font-medium text-gray-500 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockAttachments.map((document) => (
                  <tr key={document.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 pl-4">
                      <div className="flex items-center">
                        {getFileIcon(document.type)}
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="font-medium text-gray-900">{document.name}</div>
                      <div className="text-sm text-gray-500">{document.type.split("/")[1]}</div>
                    </td>
                    <td className="py-3">{formatFileSize(document.size)}</td>
                    <td className="py-3">
                      {document.createdAt ? formatDate(document.createdAt) : "-"}
                    </td>
                    <td className="py-3">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon" asChild>
                          <a href={document.url} target="_blank" rel="noreferrer" title="Aperçu">
                            <Eye className="h-4 w-4" />
                          </a>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                          <a href={document.url} download title="Télécharger">
                            <Download className="h-4 w-4" />
                          </a>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Renommer</DropdownMenuItem>
                            <DropdownMenuItem>Déplacer</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-500">Supprimer</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentList;
