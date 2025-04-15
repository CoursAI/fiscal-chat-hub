
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import DocumentList from "@/components/documents/DocumentList";

const Documents: React.FC = () => {
  return (
    <AppLayout>
      <DocumentList />
    </AppLayout>
  );
};

export default Documents;
