export interface User {
  id: string;
  clerkId: string;
  email: string;
  name: string | null;
  bio: string | null;
  location: string | null;
  skills: string[];
  linkedinUrl: string | null;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Idea {
  id: string;
  title: string;
  description: string;
  category: string;
  stage: string;
  equity: string | null;
  skills: string[];
  location: string | null;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  author?: User;
}

export interface Interest {
  id: string;
  userId: string;
  ideaId: string;
  user?: User;
  idea?: Idea;
}

export interface Connection {
  id: string;
  userId: string;
  connectedUserId: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export type IdeaStage = 'idea' | 'mvp' | 'beta' | 'launched';
export type IdeaCategory = 'technology' | 'healthcare' | 'fintech' | 'education' | 'ecommerce' | 'sustainability' | 'social' | 'other';