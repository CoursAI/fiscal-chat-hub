
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import ConversationList from "@/components/chat/ConversationList";
import ChatWindow from "@/components/chat/ChatWindow";

const Messages: React.FC = () => {
  return (
    <AppLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-10rem)]">
        <div className="lg:col-span-1">
          <ConversationList />
        </div>
        <div className="lg:col-span-2">
          <ChatWindow />
        </div>
      </div>
    </AppLayout>
  );
};

export default Messages;
