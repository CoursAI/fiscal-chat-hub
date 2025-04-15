
import React from "react";
import { NavLink } from "react-router-dom";
import { 
  MessageSquare,
  Users,
  UploadCloud,
  FileText,
  Settings,
  LogOut
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Sidebar: React.FC = () => {
  const { currentUser, logout } = useAuth();
  
  const isAdmin = currentUser?.role === "admin";
  
  const navItems = [
    {
      label: "Messages",
      icon: <MessageSquare className="h-6 w-6" />,
      to: "/messages",
      adminOnly: false,
    },
    {
      label: "Clients",
      icon: <Users className="h-6 w-6" />,
      to: "/clients",
      adminOnly: true,
    },
    {
      label: "Documents",
      icon: <FileText className="h-6 w-6" />,
      to: "/documents",
      adminOnly: false,
    },
    {
      label: "Paramètres",
      icon: <Settings className="h-6 w-6" />,
      to: "/settings",
      adminOnly: false,
    },
  ];

  return (
    <aside className="bg-white border-r border-gray-200 w-16 md:w-64 flex-shrink-0 overflow-y-auto">
      {/* Logo */}
      <div className="h-16 flex items-center justify-center md:justify-start p-4 border-b border-gray-200">
        <span className="text-fiscal-blue-700 font-bold text-xl hidden md:block">Fiscal Chat</span>
        <div className="bg-fiscal-blue-600 rounded-full w-8 h-8 flex items-center justify-center md:hidden">
          <span className="text-white font-bold">FC</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-2 md:p-4">
        <ul className="space-y-2">
          {navItems
            .filter(item => !item.adminOnly || isAdmin)
            .map((item) => (
              <TooltipProvider key={item.to}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <li>
                      <NavLink
                        to={item.to}
                        className={({ isActive }) =>
                          `flex items-center p-2 md:p-3 rounded-lg transition-colors ${
                            isActive
                              ? "bg-fiscal-blue-50 text-fiscal-blue-700"
                              : "text-gray-600 hover:bg-gray-100"
                          }`
                        }
                      >
                        <div className="flex items-center justify-center md:justify-start w-full">
                          {item.icon}
                          <span className="ml-3 hidden md:block">{item.label}</span>
                        </div>
                      </NavLink>
                    </li>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="md:hidden">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
        </ul>
      </nav>

      {/* User Section (Mobile Only) */}
      <div className="absolute bottom-0 left-0 w-16 p-2 border-t border-gray-200 md:hidden">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                onClick={logout}
                className="w-full flex items-center justify-center p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <LogOut className="h-6 w-6" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              Se déconnecter
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </aside>
  );
};

export default Sidebar;
