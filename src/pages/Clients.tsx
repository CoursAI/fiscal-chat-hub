
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import ClientList from "@/components/clients/ClientList";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const Clients: React.FC = () => {
  const { currentUser } = useAuth();
  
  // Redirect to messages if not admin
  if (currentUser?.role !== "admin") {
    return <Navigate to="/messages" />;
  }

  return (
    <AppLayout>
      <ClientList />
    </AppLayout>
  );
};

export default Clients;
