
import React, { useState, useEffect, useRef } from "react";
import { useChat } from "@/contexts/ChatContext";
import { useAuth } from "@/contexts/AuthContext";
import { format, formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Paperclip, Send, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";

const ChatWindow: React.FC = () => {
  const { currentConversation, messages, sendMessage, getOtherParticipant } = useChat();
  const { currentUser } = useAuth();
  const [messageInput, setMessageInput] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const otherParticipant = currentConversation 
    ? getOtherParticipant(currentConversation) 
    : undefined;

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim() || attachments.length > 0) {
      sendMessage(messageInput, attachments);
      setMessageInput("");
      setAttachments([]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setAttachments(prev => [...prev, ...filesArray]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
  };

  const formatMessageDate = (date: Date) => {
    const today = new Date();
    const messageDate = new Date(date);
    
    if (messageDate.toDateString() === today.toDateString()) {
      return format(messageDate, "HH:mm", { locale: fr });
    } else {
      return format(messageDate, "d MMM, HH:mm", { locale: fr });
    }
  };

  if (!currentConversation) {
    return (
      <div className="h-full flex items-center justify-center bg-white rounded-lg border border-gray-200">
        <div className="text-center p-6">
          <div className="mb-4">
            <MessageIcon className="h-12 w-12 text-gray-300 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-700">Aucune conversation sélectionnée</h3>
          <p className="text-gray-500 mt-1">Veuillez sélectionner une conversation pour commencer à discuter.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Chat header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={otherParticipant?.avatarUrl} />
            <AvatarFallback>{otherParticipant?.name ? getInitials(otherParticipant.name) : "?"}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{otherParticipant?.name}</h3>
            <p className="text-xs text-gray-500">
              {otherParticipant?.lastSeen 
                ? `Dernière connexion: ${formatDistanceToNow(otherParticipant.lastSeen, { addSuffix: true, locale: fr })}`
                : "Hors ligne"}
            </p>
          </div>
        </div>
      </div>

      {/* Messages area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.length > 0 ? (
            messages.map((message) => {
              const isCurrentUser = message.senderId === currentUser?.id;
              
              return (
                <div
                  key={message.id}
                  className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] ${
                      isCurrentUser
                        ? "bg-fiscal-blue-600 text-white rounded-l-lg rounded-tr-lg"
                        : "bg-gray-100 text-gray-800 rounded-r-lg rounded-tl-lg"
                    } px-4 py-3`}
                  >
                    <p>{message.content}</p>
                    
                    {/* Attachments */}
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {message.attachments.map((attachment) => (
                          <div
                            key={attachment.id}
                            className={`flex items-center p-2 rounded ${
                              isCurrentUser ? "bg-fiscal-blue-700" : "bg-gray-200"
                            }`}
                          >
                            <Paperclip className={`h-4 w-4 ${isCurrentUser ? "text-white" : "text-gray-600"} mr-2`} />
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm truncate ${isCurrentUser ? "text-white" : "text-gray-600"}`}>
                                {attachment.name}
                              </p>
                              <p className={`text-xs ${isCurrentUser ? "text-fiscal-blue-200" : "text-gray-500"}`}>
                                {(attachment.size / 1024).toFixed(1)} KB
                              </p>
                            </div>
                            <a
                              href={attachment.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`text-xs ml-2 ${
                                isCurrentUser ? "text-fiscal-blue-200" : "text-fiscal-blue-600"
                              } hover:underline`}
                            >
                              Ouvrir
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className={`text-right mt-1 ${isCurrentUser ? "text-fiscal-blue-200" : "text-gray-500"} text-xs`}>
                      {formatMessageDate(message.timestamp)}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center p-6">
              <p className="text-gray-500">Aucun message dans cette conversation.</p>
              <p className="text-gray-500">Envoyez le premier message !</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Attachments preview */}
      {attachments.length > 0 && (
        <div className="p-3 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {attachments.map((file, index) => (
              <div 
                key={index}
                className="flex items-center bg-gray-100 rounded px-3 py-1"
              >
                <Paperclip className="h-3 w-3 text-gray-500 mr-1" />
                <span className="text-sm truncate max-w-[150px]">{file.name}</span>
                <button 
                  onClick={() => removeAttachment(index)}
                  className="ml-2 text-gray-500 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Message input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Paperclip className="h-5 w-5" />
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    multiple
                    className="hidden"
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Joindre un fichier</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Écrire un message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-fiscal-blue-500 focus:border-transparent"
          />
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button type="submit" size="icon">
                  <Send className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Envoyer</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </form>
    </div>
  );
};

// Fallback message icon
const MessageIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

export default ChatWindow;
