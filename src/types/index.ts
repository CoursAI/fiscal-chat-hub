
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'client';
  avatarUrl?: string;
  lastSeen?: Date;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  timestamp: Date;
  read: boolean;
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
}

export interface Notification {
  id: string;
  type: 'message' | 'document' | 'system';
  title: string;
  content: string;
  timestamp: Date;
  read: boolean;
  userId: string;
}
