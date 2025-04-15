
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, Message, Conversation, Attachment } from "@/types";
import { mockConversations, mockMessages, adminUser, mockClients } from "@/lib/mock-data";
import { useAuth } from "./AuthContext";
import { useToast } from "@/components/ui/use-toast";

interface ChatContextType {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  messages: Message[];
  isLoading: boolean;
  selectConversation: (conversationId: string) => void;
  sendMessage: (content: string, attachments?: File[]) => Promise<void>;
  getOtherParticipant: (conversation: Conversation) => User | undefined;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useAuth();
  const { toast } = useToast();

  // Initialize conversations based on user role
  useEffect(() => {
    if (!currentUser) return;
    
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // For admin, load all conversations
      if (currentUser.role === 'admin') {
        setConversations(mockConversations);
      } 
      // For clients, find their conversation with the admin
      else {
        const clientConversation = mockConversations.find(
          conv => conv.participants.some(p => p.id === currentUser.id)
        );
        
        if (clientConversation) {
          setConversations([clientConversation]);
        }
      }
      
      setIsLoading(false);
    }, 1000);
  }, [currentUser]);

  const selectConversation = (conversationId: string) => {
    const conversation = conversations.find(c => c.id === conversationId);
    if (!conversation) return;
    
    setCurrentConversation(conversation);
    
    // Get client ID from the conversation
    const clientId = conversation.participants.find(p => p.role === 'client')?.id;
    if (!clientId) return;
    
    // Load messages for this conversation
    const conversationMessages = mockMessages[clientId] || [];
    setMessages(conversationMessages);
    
    // Mark messages as read
    if (conversation.unreadCount > 0 && currentUser?.role === 'admin') {
      // In a real app, this would update the database
      setConversations(prevConversations => 
        prevConversations.map(c => 
          c.id === conversationId ? { ...c, unreadCount: 0 } : c
        )
      );
    }
  };

  const sendMessage = async (content: string, attachments?: File[]) => {
    if (!currentUser || !currentConversation || !content.trim()) return;
    
    // In a real app, we would upload attachments to storage and get URLs
    const mockAttachmentObjects: Attachment[] = attachments 
      ? attachments.map((file, index) => ({
          id: `new-attach-${Date.now()}-${index}`,
          name: file.name,
          url: URL.createObjectURL(file), // This is temporary for demo
          type: file.type,
          size: file.size,
        }))
      : [];
    
    // Create new message
    const otherParticipant = getOtherParticipant(currentConversation);
    if (!otherParticipant) return;
    
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      content,
      senderId: currentUser.id,
      receiverId: otherParticipant.id,
      timestamp: new Date(),
      read: false,
      attachments: mockAttachmentObjects.length > 0 ? mockAttachmentObjects : undefined,
    };
    
    // Update local state immediately for UI responsiveness
    setMessages(prev => [...prev, newMessage]);
    
    // Update conversation with last message
    const updatedConversations = conversations.map(conv => {
      if (conv.id === currentConversation.id) {
        return {
          ...conv,
          lastMessage: newMessage,
          // If client is sending to admin, increment unread count
          unreadCount: currentUser.role === 'client' ? conv.unreadCount + 1 : conv.unreadCount,
        };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    setCurrentConversation({
      ...currentConversation,
      lastMessage: newMessage,
    });
    
    // In a real app, we would send this to the server
    toast({
      title: "Message envoyé",
      description: attachments?.length 
        ? `Message avec ${attachments.length} fichier(s) envoyé avec succès.`
        : "Message envoyé avec succès.",
      duration: 3000,
    });
  };

  const getOtherParticipant = (conversation: Conversation): User | undefined => {
    if (!currentUser || !conversation) return undefined;
    return conversation.participants.find(p => p.id !== currentUser.id);
  };

  const value = {
    conversations,
    currentConversation,
    messages,
    isLoading,
    selectConversation,
    sendMessage,
    getOtherParticipant,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
