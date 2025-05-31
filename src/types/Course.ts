export interface Course {
  _id: string;
  title: string;
  description: string;
  instructor: string;
  category: string;
  image?: string;
  price: number;
  isPaid: boolean;
  content: ContentSection[];
  students: string[];
  rating: number;
  reviews: Review[];
  createdAt: string;
  updatedAt: string;
}

export interface ContentSection {
  _id: string;
  title: string;
  description?: string;
  lessons: Lesson[];
}

export interface Lesson {
  _id: string;
  title: string;
  description?: string;
  type: 'video' | 'text' | 'quiz' | 'assignment';
  duration: number; // in minutes
  videoUrl?: string;
  content?: string;
  isFree: boolean;
  order: number;
}

export interface Review {
  _id: string;
  user: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Subscription {
  _id: string;
  user: string;
  plan: 'monthly' | 'yearly';
  status: 'active' | 'canceled' | 'expired';
  startDate: string;
  endDate: string;
  autoRenew: boolean;
}