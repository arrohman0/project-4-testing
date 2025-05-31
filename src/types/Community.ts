export interface Community {
  _id: string;
  name: string;
  description: string;
  category: string;
  image?: string;
  owner: string;
  members: string[];
  isPrivate: boolean;
  passcode?: string;
  posts: Post[];
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  _id: string;
  author: string;
  content: string;
  media?: string[];
  likes: string[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  _id: string;
  author: string;
  content: string;
  likes: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Poll {
  _id: string;
  question: string;
  options: PollOption[];
  expiresAt?: string;
  author: string;
  createdAt: string;
}

export interface PollOption {
  _id: string;
  text: string;
  votes: string[]; // Array of user IDs
}