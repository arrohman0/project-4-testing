export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  bio?: string;
  title?: string;
  location?: string;
  education?: Education[];
  experience?: Experience[];
  skills?: string[];
  achievements?: Achievement[];
  socialLinks?: SocialLinks;
  verified: boolean;
  verificationStatus?: {
    identity: boolean;
    education: boolean;
    professional: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Education {
  _id?: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
}

export interface Experience {
  _id?: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
}

export interface Achievement {
  _id?: string;
  title: string;
  date: string;
  description?: string;
  url?: string;
}

export interface SocialLinks {
  website?: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
  youtube?: string;
  instagram?: string;
}