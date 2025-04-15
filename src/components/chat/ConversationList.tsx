
import React from "react";
import { useChat } from "@/contexts/ChatContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Paperclip } from "lucide-react";

const ConversationList: React.FC = () => {
  const { conversations, currentConversation, selectConversation, getOtherParticipant } = useChat();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
  };

  const truncate = (text: string, length: number) => {
    if (text.length <= length) return text;
    return text.slice(0, length) + "...";
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Conversations</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {conversations.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {conversations.map((conversation) => {
              const otherParticipant = getOtherParticipant(conversation);
              const lastMessage = conversation.lastMessage;
              const hasAttachments = lastMessage?.attachments && lastMessage.attachments.length > 0;
              const isSelected = currentConversation?.id === conversation.id;

              return (
                <li key={conversation.id}>
                  <button
                    onClick={() => selectConversation(conversation.id)}
                    className={`w-full p-4 flex items-start space-x-3 hover:bg-gray-50 transition-colors ${
                      isSelected ? "bg-fiscal-blue-50" : ""
                    }`}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={otherParticipant?.avatarUrl} />
                      <AvatarFallback>{otherParticipant?.name ? getInitials(otherParticipant.name) : "?"}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex justify-between items-baseline">
                        <span className="font-medium text-gray-900">
                          {otherParticipant?.name || "Utilisateur inconnu"}
                        </span>
                        {lastMessage && (
                          <span className="text-xs text-gray-500">
                            {formatDistanceToNow(lastMessage.timestamp, { addSuffix: false, locale: fr })}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        {hasAttachments && (
                          <Paperclip className="h-3 w-3 text-gray-400 flex-shrink-0" />
                        )}
                        <p className="text-sm text-gray-600 truncate">
                          {lastMessage ? truncate(lastMessage.content, 40) : "Aucun message"}
                        </p>
                      </div>
                    </div>
                    {conversation.unreadCount > 0 && (
                      <Badge variant="destructive" className="ml-2 px-2 rounded-full">
                        {conversation.unreadCount}
                      </Badge>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="p-4 text-center text-gray-500">
            Aucune conversation disponible
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;
