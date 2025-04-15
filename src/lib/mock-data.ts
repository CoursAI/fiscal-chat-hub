
import { User, Message, Conversation, Notification, Attachment } from "@/types";

// Mock admin user (you)
export const adminUser: User = {
  id: "admin1",
  name: "Cabinet Comptable",
  email: "admin@fiscalchat.com",
  role: "admin",
  avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100&auto=format&fit=crop",
  lastSeen: new Date(),
};

// Mock clients
export const mockClients: User[] = [
  {
    id: "client1",
    name: "Jean Dupont",
    email: "jean@example.com",
    role: "client",
    avatarUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop",
    lastSeen: new Date(Date.now() - 5 * 60000),
  },
  {
    id: "client2",
    name: "Marie Martin",
    email: "marie@example.com",
    role: "client",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
    lastSeen: new Date(Date.now() - 120 * 60000),
  },
  {
    id: "client3",
    name: "Pierre Bernard",
    email: "pierre@example.com",
    role: "client",
    avatarUrl: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?q=80&w=100&auto=format&fit=crop",
    lastSeen: new Date(Date.now() - 1440 * 60000),
  },
];

// Mock attachments
export const mockAttachments: Attachment[] = [
  {
    id: "attach1",
    name: "facture_mars_2023.pdf",
    url: "/attachments/facture_mars_2023.pdf",
    type: "application/pdf",
    size: 254000,
  },
  {
    id: "attach2",
    name: "declaration_tva_q1.pdf",
    url: "/attachments/declaration_tva_q1.pdf",
    type: "application/pdf",
    size: 1254000,
  },
  {
    id: "attach3",
    name: "releve_banque.jpg",
    url: "/attachments/releve_banque.jpg",
    type: "image/jpeg",
    size: 450000,
  },
];

// Mock messages
export const mockMessages: Record<string, Message[]> = {
  client1: [
    {
      id: "msg1",
      content: "Bonjour Jean, pourriez-vous me faire parvenir votre dernier relevé bancaire ?",
      senderId: adminUser.id,
      receiverId: "client1",
      timestamp: new Date(Date.now() - 48 * 60 * 60000),
      read: true,
    },
    {
      id: "msg2",
      content: "Bonjour, bien sûr. Je vous l'envoie dès que possible.",
      senderId: "client1",
      receiverId: adminUser.id,
      timestamp: new Date(Date.now() - 47 * 60 * 60000),
      read: true,
    },
    {
      id: "msg3",
      content: "Voici le relevé demandé.",
      senderId: "client1",
      receiverId: adminUser.id,
      timestamp: new Date(Date.now() - 24 * 60 * 60000),
      read: true,
      attachments: [mockAttachments[2]],
    },
    {
      id: "msg4",
      content: "Merci Jean. Je vais traiter cela et revenir vers vous si j'ai des questions.",
      senderId: adminUser.id,
      receiverId: "client1",
      timestamp: new Date(Date.now() - 23 * 60 * 60000),
      read: false,
    },
  ],
  client2: [
    {
      id: "msg5",
      content: "Bonjour Marie, n'oubliez pas que votre déclaration de TVA est à déposer avant la fin du mois.",
      senderId: adminUser.id,
      receiverId: "client2",
      timestamp: new Date(Date.now() - 72 * 60 * 60000),
      read: true,
    },
    {
      id: "msg6",
      content: "Merci pour le rappel. J'ai préparé les documents nécessaires.",
      senderId: "client2",
      receiverId: adminUser.id,
      timestamp: new Date(Date.now() - 48 * 60 * 60000),
      read: true,
    },
    {
      id: "msg7",
      content: "Voici ma déclaration TVA pour votre validation.",
      senderId: "client2",
      receiverId: adminUser.id,
      timestamp: new Date(Date.now() - 24 * 60 * 60000),
      read: true,
      attachments: [mockAttachments[1]],
    },
  ],
  client3: [
    {
      id: "msg8",
      content: "Bonjour Pierre, je vous ai préparé votre facture pour le mois de mars.",
      senderId: adminUser.id,
      receiverId: "client3",
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60000),
      read: true,
      attachments: [mockAttachments[0]],
    },
    {
      id: "msg9",
      content: "Merci beaucoup. Je vais procéder au paiement dès aujourd'hui.",
      senderId: "client3",
      receiverId: adminUser.id,
      timestamp: new Date(Date.now() - 6 * 24 * 60 * 60000),
      read: true,
    },
  ],
};

// Mock conversations
export const mockConversations: Conversation[] = [
  {
    id: "conv1",
    participants: [adminUser, mockClients[0]],
    lastMessage: mockMessages.client1[mockMessages.client1.length - 1],
    unreadCount: 1,
  },
  {
    id: "conv2",
    participants: [adminUser, mockClients[1]],
    lastMessage: mockMessages.client2[mockMessages.client2.length - 1],
    unreadCount: 0,
  },
  {
    id: "conv3",
    participants: [adminUser, mockClients[2]],
    lastMessage: mockMessages.client3[mockMessages.client3.length - 1],
    unreadCount: 0,
  },
];

// Mock notifications
export const mockNotifications: Notification[] = [
  {
    id: "notif1",
    type: "document",
    title: "Nouveau document reçu",
    content: "Jean Dupont a envoyé un relevé bancaire",
    timestamp: new Date(Date.now() - 24 * 60 * 60000),
    read: false,
    userId: adminUser.id,
  },
  {
    id: "notif2",
    type: "message",
    title: "Nouveau message",
    content: "Marie Martin a répondu à votre message",
    timestamp: new Date(Date.now() - 48 * 60 * 60000),
    read: true,
    userId: adminUser.id,
  },
  {
    id: "notif3",
    type: "document",
    title: "Nouveau document reçu",
    content: "Marie Martin a envoyé sa déclaration TVA",
    timestamp: new Date(Date.now() - 24 * 60 * 60000),
    read: false,
    userId: adminUser.id,
  },
];
