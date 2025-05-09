export interface User {
  id: string;
  name: string;
  profilePic: string;
  dueDate?: string; // For pregnant users
  stage: 'First Trimester' | 'Second Trimester' | 'Third Trimester' | 'Postpartum' | 'early-postpartum' | 'ongoing-postpartum';
  interests: string[];
  karma: number;
  badges: string[] | Badge[];
  connections: string[]; // IDs of connected users
  trustScore: number;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Question {
  id: string;
  userId: string;
  text: string;
  createdAt: string;
  category: string;
  upvotes: number;
  answers: Answer[];
  isUrgent?: boolean;
}

export interface Answer {
  id: string;
  questionId: string;
  userId: string;
  text: string;
  createdAt: string;
  upvotes: number;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  ownerId: string;
  status: 'available' | 'borrowed' | 'pending';
  borrowerId?: string;
  dueDate?: string;
}

export interface GroupActivity {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  participants: string[];
  votes: number;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  createdBy: string;
  createdAt: string;
  endDate: string;
  isActive: boolean;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface VoiceJournal {
  id: string;
  userId: string;
  date: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  analysis: string;
  recommendations: string[];
}

export interface FinancialRequest {
  id: string;
  userId: string;
  amount: number;
  reason: string;
  urgency: 'low' | 'medium' | 'high';
  status: 'pending' | 'approved' | 'fulfilled';
  allocated?: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}