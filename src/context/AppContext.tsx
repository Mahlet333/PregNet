import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  User, Question, Item, GroupActivity, Poll, VoiceJournal, 
  FinancialRequest, ChatMessage 
} from '../types';
import { 
  users, questions, items, groupActivities, polls, 
  voiceJournals, financialRequests, chatMessages, currentUser as defaultUser 
} from '../data/mockData';

interface AppContextType {
  currentUser: User;
  allUsers: User[];
  questions: Question[];
  items: Item[];
  groupActivities: GroupActivity[];
  polls: Poll[];
  voiceJournals: VoiceJournal[];
  financialRequests: FinancialRequest[];
  chatMessages: ChatMessage[];
  addQuestion: (question: Omit<Question, 'id' | 'createdAt' | 'upvotes' | 'answers'>) => void;
  addAnswer: (questionId: string, answer: string) => void;
  upvoteQuestion: (questionId: string) => void;
  upvoteAnswer: (questionId: string, answerId: string) => void;
  requestItem: (itemId: string) => void;
  lendItem: (itemId: string, userId: string) => void;
  returnItem: (itemId: string) => void;
  joinActivity: (activityId: string) => void;
  voteInPoll: (pollId: string, optionId: string) => void;
  addVoiceJournal: (sentiment: 'positive' | 'neutral' | 'negative') => void;
  submitFinancialRequest: (amount: number, reason: string, urgency: 'low' | 'medium' | 'high') => void;
  sendChatMessage: (text: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(defaultUser);
  const [allUsers, setAllUsers] = useState<User[]>(users);
  const [allQuestions, setAllQuestions] = useState<Question[]>(questions);
  const [allItems, setAllItems] = useState<Item[]>(items);
  const [allActivities, setAllActivities] = useState<GroupActivity[]>(groupActivities);
  const [allPolls, setAllPolls] = useState<Poll[]>(polls);
  const [allJournals, setAllJournals] = useState<VoiceJournal[]>(voiceJournals);
  const [allRequests, setAllRequests] = useState<FinancialRequest[]>(financialRequests);
  const [allChatMessages, setAllChatMessages] = useState<ChatMessage[]>(chatMessages);

  // Add a new question
  const addQuestion = (question: Omit<Question, 'id' | 'createdAt' | 'upvotes' | 'answers'>) => {
    const newQuestion: Question = {
      ...question,
      id: `q${allQuestions.length + 1}`,
      createdAt: new Date().toISOString(),
      upvotes: 0,
      answers: []
    };
    setAllQuestions([newQuestion, ...allQuestions]);
  };

  // Add an answer to a question
  const addAnswer = (questionId: string, text: string) => {
    const updatedQuestions = allQuestions.map(q => {
      if (q.id === questionId) {
        const newAnswer = {
          id: `a${q.answers.length + 1}`,
          questionId,
          userId: currentUser.id,
          text,
          createdAt: new Date().toISOString(),
          upvotes: 0
        };
        return { ...q, answers: [...q.answers, newAnswer] };
      }
      return q;
    });
    setAllQuestions(updatedQuestions);
    
    // Increase crowns for answering
    updateUserCrowns(currentUser.id, 2);
  };

  // Upvote a question
  const upvoteQuestion = (questionId: string) => {
    const updatedQuestions = allQuestions.map(q => 
      q.id === questionId ? { ...q, upvotes: q.upvotes + 1 } : q
    );
    setAllQuestions(updatedQuestions);
    
    // Find the question to increase crowns for its author
    const question = allQuestions.find(q => q.id === questionId);
    if (question) {
      updateUserCrowns(question.userId, 1);
    }
  };

  // Upvote an answer
  const upvoteAnswer = (questionId: string, answerId: string) => {
    const updatedQuestions = allQuestions.map(q => {
      if (q.id === questionId) {
        const updatedAnswers = q.answers.map(a => 
          a.id === answerId ? { ...a, upvotes: a.upvotes + 1 } : a
        );
        return { ...q, answers: updatedAnswers };
      }
      return q;
    });
    setAllQuestions(updatedQuestions);
    
    // Find the answer to increase crowns for its author
    const question = allQuestions.find(q => q.id === questionId);
    const answer = question?.answers.find(a => a.id === answerId);
    if (answer) {
      updateUserCrowns(answer.userId, 2);
    }
  };

  // Request to borrow an item
  const requestItem = (itemId: string) => {
    const updatedItems = allItems.map(item => 
      item.id === itemId ? { ...item, status: 'pending', borrowerId: currentUser.id } : item
    );
    setAllItems(updatedItems);
  };

  // Lend an item to a user
  const lendItem = (itemId: string, userId: string) => {
    const updatedItems = allItems.map(item => 
      item.id === itemId ? { 
        ...item, 
        status: 'borrowed', 
        borrowerId: userId,
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 30 days from now
      } : item
    );
    setAllItems(updatedItems);
    
    // Increase crowns for lending
    updateUserCrowns(currentUser.id, 5);
  };

  // Return a borrowed item
  const returnItem = (itemId: string) => {
    const updatedItems = allItems.map(item => 
      item.id === itemId ? { ...item, status: 'available', borrowerId: undefined, dueDate: undefined } : item
    );
    setAllItems(updatedItems);
    
    // Increase crowns for returning on time
    updateUserCrowns(currentUser.id, 3);
  };

  // Join a group activity
  const joinActivity = (activityId: string) => {
    const updatedActivities = allActivities.map(activity => {
      if (activity.id === activityId && !activity.participants.includes(currentUser.id)) {
        return { ...activity, participants: [...activity.participants, currentUser.id] };
      }
      return activity;
    });
    setAllActivities(updatedActivities);
  };

  // Vote in a poll
  const voteInPoll = (pollId: string, optionId: string) => {
    const updatedPolls = allPolls.map(poll => {
      if (poll.id === pollId) {
        const updatedOptions = poll.options.map(option => 
          option.id === optionId ? { ...option, votes: option.votes + 1 } : option
        );
        return { ...poll, options: updatedOptions };
      }
      return poll;
    });
    setAllPolls(updatedPolls);
  };

  // Add a voice journal entry
  const addVoiceJournal = (sentiment: 'positive' | 'neutral' | 'negative') => {
    const recommendations = {
      positive: [
        'Continue your positive mindset',
        'Share your experiences with others who may need encouragement'
      ],
      neutral: [
        'Consider joining a support group for more connection',
        'Schedule regular self-care activities'
      ],
      negative: [
        'Connect with a mentor for support',
        'Try the breathing exercises in the mental health section',
        'Consider scheduling time with a healthcare provider'
      ]
    };
    
    const analysis = {
      positive: 'Your voice indicates positive emotions and a sense of well-being.',
      neutral: 'Your voice sounds steady, though there are some signs of mild stress.',
      negative: 'Your voice indicates some stress and anxiety that might benefit from support.'
    };
    
    const newJournal: VoiceJournal = {
      id: `journal${allJournals.length + 1}`,
      userId: currentUser.id,
      date: new Date().toISOString().split('T')[0],
      sentiment,
      analysis: analysis[sentiment],
      recommendations: recommendations[sentiment]
    };
    
    setAllJournals([newJournal, ...allJournals]);
  };

  // Submit a financial support request
  const submitFinancialRequest = (amount: number, reason: string, urgency: 'low' | 'medium' | 'high') => {
    const newRequest: FinancialRequest = {
      id: `request${allRequests.length + 1}`,
      userId: currentUser.id,
      amount,
      reason,
      urgency,
      status: 'pending'
    };
    
    setAllRequests([...allRequests, newRequest]);
  };

  // Send a chat message and get a response
  const sendChatMessage = (text: string) => {
    const userMessage: ChatMessage = {
      id: `msg${allChatMessages.length + 1}`,
      sender: 'user',
      text,
      timestamp: new Date().toISOString()
    };
    
    setAllChatMessages([...allChatMessages, userMessage]);
    
    // Simulate a bot response
    setTimeout(() => {
      const botResponses = [
        "Our network visualization uses graph theory to show connections between users. Each node represents a user, and edges represent support relationships. The size of nodes indicates centrality and influence in the network.",
        "The auction system for high-demand items uses a second-price sealed-bid mechanism, which encourages honest bidding. This is based on game theory principles that show this approach results in optimal resource allocation.",
        "Crowns serve as the 'currency' in our reputation system. They're awarded for helpful actions and can be used for priority in matching algorithms. This creates positive incentives for community participation.",
        "Our financial support matching algorithm uses principles from welfare economics to ensure fair and efficient allocation of limited resources based on need, urgency, and potential impact.",
        "The voting system for group activities uses a ranked-choice mechanism to prevent vote splitting and ensure that the selected option has majority support, even when there are multiple alternatives."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: ChatMessage = {
        id: `msg${allChatMessages.length + 2}`,
        sender: 'bot',
        text: randomResponse,
        timestamp: new Date().toISOString()
      };
      
      setAllChatMessages(prev => [...prev, botMessage]);
    }, 500);
  };

  // Helper to update a user's crowns
  const updateUserCrowns = (userId: string, amount: number) => {
    const updatedUsers = allUsers.map(user => {
      if (user.id === userId) {
        const newCrowns = user.crowns + amount;
        // Update badges based on crowns
        let updatedBadges = [...user.badges];
        if (newCrowns >= 100 && !user.badges.some(b => b.name === 'Top Helper')) {
          updatedBadges.push({
            id: `badge${new Date().getTime()}`,
            name: 'Top Helper',
            icon: 'star',
            description: 'Earned 100+ crowns helping the community'
          });
        }
        return { ...user, crowns: newCrowns, badges: updatedBadges };
      }
      return user;
    });
    
    setAllUsers(updatedUsers);
    
    // Update current user if it's the same user
    if (currentUser.id === userId) {
      const updatedUser = updatedUsers.find(u => u.id === userId);
      if (updatedUser) {
        setCurrentUser(updatedUser);
      }
    }
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      allUsers,
      questions: allQuestions,
      items: allItems,
      groupActivities: allActivities,
      polls: allPolls,
      voiceJournals: allJournals,
      financialRequests: allRequests,
      chatMessages: allChatMessages,
      addQuestion,
      addAnswer,
      upvoteQuestion,
      upvoteAnswer,
      requestItem,
      lendItem,
      returnItem,
      joinActivity,
      voteInPoll,
      addVoiceJournal,
      submitFinancialRequest,
      sendChatMessage
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};