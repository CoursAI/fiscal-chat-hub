
import React from "react";
import { Bell, Search, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNotifications } from "@/contexts/NotificationContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

const Header: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-fiscal-blue-900 hidden md:block">
          Fiscal Chat Hub
        </h1>
      </div>

      <div className="flex items-center space-x-2">
        {/* Notifications dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                  Tout marquer comme lu
                </Button>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.length > 0 ? (
              <>
                {notifications.slice(0, 5).map((notification) => (
                  <DropdownMenuItem 
                    key={notification.id} 
                    className={`flex flex-col items-start p-3 ${!notification.read ? 'bg-fiscal-blue-50' : ''}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start gap-2 w-full">
                      <div className="rounded-full bg-fiscal-blue-100 p-2 flex-shrink-0">
                        {notification.type === 'message' ? (
                          <Bell className="h-4 w-4 text-fiscal-blue-600" />
                        ) : (
                          <Bell className="h-4 w-4 text-fiscal-blue-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{notification.title}</p>
                        <p className="text-gray-500 text-sm">{notification.content}</p>
                        <p className="text-gray-400 text-xs mt-1">
                          {formatDistanceToNow(notification.timestamp, { addSuffix: true, locale: fr })}
                        </p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
                {notifications.length > 5 && (
                  <DropdownMenuItem className="text-center text-fiscal-blue-600">
                    Voir toutes les notifications
                  </DropdownMenuItem>
                )}
              </>
            ) : (
              <div className="p-4 text-center text-gray-500">
                Aucune notification
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative h-8 flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={currentUser?.avatarUrl} />
                <AvatarFallback>{currentUser?.name ? getInitials(currentUser.name) : "U"}</AvatarFallback>
              </Avatar>
              <span className="font-medium hidden md:inline-block">{currentUser?.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profil</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logout}>Se déconnecter</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
