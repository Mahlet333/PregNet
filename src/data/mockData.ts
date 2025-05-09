import { User, Badge, Question, Answer, Item, GroupActivity, Poll, VoiceJournal, FinancialRequest, ChatMessage } from '../types';

// Users
export const users: User[] = [
  {
    id: 'user1',
    name: 'Sarah Johnson',
    profilePic: 'https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=',
    dueDate: '2024-12-15',
    stage: 'Second Trimester',
    interests: ['Prenatal Yoga', 'Healthy Eating', 'Natural Birth'],
    karma: 85,
    badges: ['Supportive Member', 'Resource Sharer'],
    connections: ['user2', 'user3', 'user4', 'user7', 'user8', 'user12'],
    trustScore: 4.8
  },
  {
    id: 'user2',
    name: 'Emily Rodriguez',
    profilePic: 'https://images.unsplash.com/photo-1619895862022-09114b41f16f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29tZW4lMjBwcm9maWxlJTIwcGljdHVyZXxlbnwwfHwwfHx8MA%3D%3D',
    stage: 'early-postpartum',
    interests: ['Breastfeeding', 'Sleep training', 'Work-life balance'],
    karma: 110,
    badges: [
      { id: 'badge3', name: 'Mentor', icon: 'award', description: 'Experienced mom helping others' },
      { id: 'badge4', name: 'Reliable Lender', icon: 'gift', description: 'Successfully shared items with 5+ users' }
    ],
    connections: ['user1', 'user3', 'user5', 'user6'],
    trustScore: 4.9
  },
  {
    id: 'user3',
    name: 'Jessica Kim',
    profilePic: 'https://media.istockphoto.com/id/1311084168/photo/overjoyed-pretty-asian-woman-look-at-camera-with-sincere-laughter.jpg?s=612x612&w=0&k=20&c=akS4eKR3suhoP9cuk7_7ZVZrLuMMG0IgOQvQ5JiRmAg=',
    dueDate: '2025-03-10',
    stage: 'First Trimester',
    interests: ['Twin pregnancy', 'Nursery design', 'Meal prep'],
    karma: 65,
    badges: [
      { id: 'badge5', name: 'Newcomer', icon: 'user-plus', description: 'Recently joined the community' }
    ],
    connections: ['user1', 'user2', 'user7'],
    trustScore: 4.5
  },
  {
    id: 'user4',
    name: 'Michelle Torres',
    profilePic: 'https://t4.ftcdn.net/jpg/05/69/89/19/360_F_569891944_kDbkk5J3PRy2FMKV8msXxJy2hSMFdyu7.jpg',
    stage: 'ongoing-postpartum',
    interests: ['Returning to work', 'Childcare', 'Postpartum fitness'],
    karma: 130,
    badges: [
      { id: 'badge6', name: 'Top Helper', icon: 'star', description: 'One of the most helpful members' },
      { id: 'badge7', name: 'Community Pillar', icon: 'users', description: 'Central to the community network' }
    ],
    connections: ['user1', 'user5', 'user6', 'user7'],
    trustScore: 5.0
  },
  {
    id: 'user5',
    name: 'Ashley Williams',
    profilePic: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg',
    stage: 'ongoing-postpartum',
    interests: ['Baby-led weaning', 'Toddler activities', 'Mom groups'],
    karma: 95,
    badges: [
      { id: 'badge8', name: 'Reliable Lender', icon: 'gift', description: 'Successfully shared items with 5+ users' }
    ],
    connections: ['user2', 'user4', 'user6'],
    trustScore: 4.7
  },
  {
    id: 'user6',
    name: 'Lisa Chen',
    profilePic: 'https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg',
    stage: 'early-postpartum',
    interests: ['Newborn care', 'Postpartum recovery', 'Breastfeeding'],
    karma: 75,
    badges: [
      { id: 'badge9', name: 'Active', icon: 'activity', description: 'Logs in regularly and participates in discussions' }
    ],
    connections: ['user2', 'user4', 'user5'],
    trustScore: 4.6
  },
  {
    id: 'user7',
    name: 'Nicole Taylor',
    profilePic: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
    dueDate: '2025-02-20',
    stage: 'Second Trimester',
    interests: ['Pregnancy fitness', 'Healthy eating', 'Natural birth'],
    karma: 60,
    badges: [
      { id: 'badge10', name: 'Newcomer', icon: 'user-plus', description: 'Recently joined the community' }
    ],
    connections: ['user1', 'user3', 'user4'],
    trustScore: 4.4
  },
  {
    id: 'user8',
    name: 'Maya Patel',
    profilePic: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg',
    dueDate: '2025-02-10',
    stage: 'First Trimester',
    interests: ['Meditation', 'Vegetarian Diet', 'Mindful Parenting'],
    karma: 45,
    badges: ['New Member', 'Question Asker'],
    connections: ['user1', 'user3', 'user9', 'user11'],
    trustScore: 4.2
  },
  {
    id: 'user9',
    name: 'Isabella Rodriguez',
    profilePic: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg',
    dueDate: '2024-11-20',
    stage: 'Third Trimester',
    interests: ['Hypnobirthing', 'Breastfeeding', 'Baby Wearing'],
    karma: 92,
    badges: ['Mentor', 'Community Leader', 'Resource Expert'],
    connections: ['user2', 'user5', 'user8', 'user10', 'user12'],
    trustScore: 4.9
  },
  {
    id: 'user10',
    name: 'Olivia Chen',
    profilePic: 'https://images.pexels.com/photos/1181695/pexels-photo-1181695.jpeg',
    dueDate: '2024-08-30',
    stage: 'Postpartum',
    interests: ['Sleep Training', 'Baby Development', 'Working Mom'],
    karma: 78,
    badges: ['Experienced Mom', 'Advice Giver'],
    connections: ['user4', 'user6', 'user9', 'user11'],
    trustScore: 4.7
  },
  {
    id: 'user11',
    name: 'Aisha Mohammed',
    profilePic: 'https://images.pexels.com/photos/1181688/pexels-photo-1181688.jpeg',
    dueDate: '2025-01-05',
    stage: 'Second Trimester',
    interests: ['Twin Pregnancy', 'Nutrition', 'Exercise'],
    karma: 55,
    badges: ['Twin Mom to Be', 'Active Participant'],
    connections: ['user3', 'user8', 'user10', 'user12'],
    trustScore: 4.4
  },
  {
    id: 'user12',
    name: 'Sophie Anderson',
    profilePic: 'https://images.pexels.com/photos/1181685/pexels-photo-1181685.jpeg',
    dueDate: '2024-09-15',
    stage: 'Postpartum',
    interests: ['Mental Health', 'Baby Care', 'Support Groups'],
    karma: 88,
    badges: ['Mental Health Advocate', 'Supportive Friend'],
    connections: ['user1', 'user7', 'user9', 'user11'],
    trustScore: 4.8
  }
];

// Questions and Answers
export const questions: Question[] = [
  {
    id: 'q1',
    userId: 'user3',
    text: 'What are some good exercises for the third trimester that are safe for twin pregnancy?',
    createdAt: '2024-10-15T14:30:00',
    category: 'Exercise',
    upvotes: 12,
    answers: [
      {
        id: 'a1',
        questionId: 'q1',
        userId: 'user1',
        text: 'Swimming and prenatal yoga specifically designed for twin pregnancies worked well for me. Make sure to consult with your doctor first!',
        createdAt: '2024-10-15T15:00:00',
        upvotes: 8
      },
      {
        id: 'a2',
        questionId: 'q1',
        userId: 'user4',
        text: 'Walking and gentle stretching are great. I found prenatal water aerobics to be especially helpful in my third trimester with twins.',
        createdAt: '2024-10-15T16:45:00',
        upvotes: 5
      }
    ]
  },
  {
    id: 'q2',
    userId: 'user7',
    text: 'Has anyone experienced Braxton Hicks contractions? How do you differentiate them from real labor?',
    createdAt: '2024-10-16T09:15:00',
    category: 'Pregnancy',
    upvotes: 15,
    answers: [
      {
        id: 'a3',
        questionId: 'q2',
        userId: 'user2',
        text: 'Braxton Hicks typically don\'t get stronger or more frequent over time. Real contractions follow a pattern and intensify. If you\'re unsure, always contact your healthcare provider!',
        createdAt: '2024-10-16T10:00:00',
        upvotes: 12
      }
    ]
  },
  {
    id: 'q3',
    userId: 'user6',
    text: 'I\'m struggling with breastfeeding. My baby doesn\'t seem to latch properly. Any advice?',
    createdAt: '2024-10-17T11:30:00',
    category: 'Breastfeeding',
    upvotes: 18,
    isUrgent: true,
    answers: [
      {
        id: 'a4',
        questionId: 'q3',
        userId: 'user2',
        text: 'I had the same issue! Working with a lactation consultant was a game-changer for me. In the meantime, try different positions and make sure baby\'s mouth covers a good portion of the areola, not just the nipple.',
        createdAt: '2024-10-17T12:00:00',
        upvotes: 10
      },
      {
        id: 'a5',
        questionId: 'q3',
        userId: 'user5',
        text: 'The football hold worked best for me in the beginning. Also, skin-to-skin contact before attempting to latch can help. Don\'t be too hard on yourself - it takes practice for both you and baby!',
        createdAt: '2024-10-17T13:15:00',
        upvotes: 8
      }
    ]
  }
];

// Items for lending/borrowing
export const items: Item[] = [
  {
    id: 'item1',
    name: 'Pregnancy Pillow',
    description: 'Full body support pillow for comfortable sleep during pregnancy',
    category: 'Comfort',
    image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQPb33a0EjaTP1n2b7uSoGfuddZyRWTF2-WV6n0otJBdzKXfA2nkrO7LB4FyDfaoCitc1ma2IXZcVeDTMAh0OzIRYNvQJZrYLcs7fWQS7s_3i3C6Yk5LbGqLg',
    ownerId: 'user1',
    status: 'available'
  },
  {
    id: 'item6',
    name: 'Medela Swing Maxi Double Electric Breast Pump',
    description: 'Portable double electric breast pump with USB charger, perfect for efficient and comfortable pumping sessions',
    category: 'Feeding',
    image: 'https://s3-pwa-prod.mumzworld.com/media/cGF0aD0lMkZtZWRpYSUyRmNhdGFsb2clMkZwcm9kdWN0JTJGbSUyRmMlMkZtY2d0LTEwMTA0MTYxOS1tZWRlbGEtbmV3LXN3aW5nLW1heGktZG91YmxlLWVsZWN0cmljLWJyZWFzdC1wdW1wLTE2OTIxMDY4MzgxLmpwZyZmaXQ9dW5kZWZpbmVk/Medela%20-%20Swing%20Maxi%20Double%20Electric%20Breast%20Pump%20-%20USB%20Charger.jpeg',
    ownerId: 'user2',
    status: 'available'
  },
  {
    id: 'item2',
    name: 'Baby Carrier (Ergobaby)',
    description: 'Comfortable carrier for infants and toddlers, suitable from 3 months to 3 years.',
    category: 'Carriers',
    image: 'https://images.pexels.com/photos/3661282/pexels-photo-3661282.jpeg',
    ownerId: 'user4',
    status: 'borrowed',
    borrowerId: 'user6',
    dueDate: '2024-11-30'
  },
  {
    id: 'item4',
    name: 'Baby Bouncer (BabyBjörn)',
    description: 'Gently used baby bouncer, great for soothing and entertaining babies.',
    category: 'Baby Gear',
    image: 'https://images.pexels.com/photos/5435313/pexels-photo-5435313.jpeg',
    ownerId: 'user5',
    status: 'pending',
    borrowerId: 'user3'
  },
  {
    id: 'item5',
    name: 'Maternity Clothes Bundle (Size M)',
    description: 'Collection of maternity tops, pants, and dresses, size medium.',
    category: 'Clothing',
    image: 'https://blog.nastygal.com/wp-content/uploads/2023/01/agg02514_lilac_xl-scaled.jpg',
    ownerId: 'user2',
    status: 'available'
  }
];

// Group Activities
export const groupActivities: GroupActivity[] = [
  {
    id: 'activity1',
    title: 'Prenatal Yoga in the Park',
    description: 'Join us for a gentle yoga session designed specifically for pregnant women. All levels welcome!',
    date: '2024-11-05',
    time: '10:00 AM',
    location: 'Central Park, Meadow Area',
    organizer: 'user1',
    participants: ['user1', 'user3', 'user7'],
    votes: 15
  },
  {
    id: 'activity2',
    title: 'New Mom Support Circle',
    description: 'A safe space to share experiences, challenges, and tips for navigating early motherhood.',
    date: '2024-11-10',
    time: '2:00 PM',
    location: 'Community Center, Room 3',
    organizer: 'user2',
    participants: ['user2', 'user5', 'user6'],
    votes: 12
  },
  {
    id: 'activity3',
    title: 'Baby & Me Swimming Class',
    description: 'Introductory swimming class for parents and babies (3-12 months).',
    date: '2024-11-15',
    time: '11:00 AM',
    location: 'Wellness Center Pool',
    organizer: 'user4',
    participants: ['user4', 'user5', 'user6'],
    votes: 10
  }
];

// Polls
export const polls: Poll[] = [
  {
    id: 'poll1',
    question: 'What topic would you like to discuss at our next support group meeting?',
    options: [
      { id: 'opt1', text: 'Postpartum Mental Health', votes: 8 },
      { id: 'opt2', text: 'Sleep Training Strategies', votes: 6 },
      { id: 'opt3', text: 'Returning to Work after Baby', votes: 4 },
      { id: 'opt4', text: 'Partner Relationships after Baby', votes: 5 }
    ],
    createdBy: 'user2',
    createdAt: '2024-10-10T09:00:00',
    endDate: '2024-10-25T23:59:59',
    isActive: true
  },
  {
    id: 'poll2',
    question: 'Which day works best for our prenatal fitness class?',
    options: [
      { id: 'opt5', text: 'Saturday Morning', votes: 7 },
      { id: 'opt6', text: 'Sunday Afternoon', votes: 5 },
      { id: 'opt7', text: 'Tuesday Evening', votes: 9 },
      { id: 'opt8', text: 'Thursday Evening', votes: 3 }
    ],
    createdBy: 'user1',
    createdAt: '2024-10-12T14:00:00',
    endDate: '2024-10-20T23:59:59',
    isActive: true
  }
];

// Voice Journals
export const voiceJournals: VoiceJournal[] = [
  {
    id: 'journal1',
    userId: 'user1',
    date: '2024-10-15',
    sentiment: 'positive',
    analysis: 'Your voice indicates positive emotions with signs of excitement about your pregnancy journey.',
    recommendations: [
      'Continue your positive mindset',
      'Share your experiences with others who may need encouragement'
    ]
  },
  {
    id: 'journal2',
    userId: 'user6',
    date: '2024-10-16',
    sentiment: 'negative',
    analysis: 'Your voice indicates some stress and anxiety, possibly related to sleep deprivation.',
    recommendations: [
      'Connect with other moms in the early postpartum stage',
      'Consider reaching out to a mentor for support',
      'Try the breathing exercises in the mental health section'
    ]
  },
  {
    id: 'journal3',
    userId: 'user3',
    date: '2024-10-17',
    sentiment: 'neutral',
    analysis: 'Your voice sounds steady, though there are hints of concern about your upcoming delivery.',
    recommendations: [
      'Schedule a chat with a mentor who has experience with twin births',
      'Join the upcoming birth preparation workshop',
      'Practice relaxation techniques daily'
    ]
  }
];

// Financial Support Requests
export const financialRequests: FinancialRequest[] = [
  {
    id: 'request1',
    userId: 'user3',
    amount: 150,
    reason: 'Additional prenatal vitamins and supplements for twin pregnancy',
    urgency: 'medium',
    status: 'approved',
    allocated: 150
  },
  {
    id: 'request2',
    userId: 'user6',
    amount: 200,
    reason: 'Lactation consultant appointment',
    urgency: 'high',
    status: 'approved',
    allocated: 180
  },
  {
    id: 'request3',
    userId: 'user7',
    amount: 120,
    reason: 'Transportation to prenatal appointments',
    urgency: 'medium',
    status: 'pending'
  }
];

// Chat Messages
export const chatMessages: ChatMessage[] = [
  {
    id: 'msg1',
    sender: 'user',
    text: 'How can I find support from other moms?',
    timestamp: '2024-10-17T14:30:00'
  },
  {
    id: 'msg2',
    sender: 'bot',
    text: '💜 I understand how important it is to connect with others on this journey. Our community has wonderful support circles where you can share experiences and find friendship. Would you like me to help you find a group that matches your interests or stage of pregnancy?',
    timestamp: '2024-10-17T14:30:05'
  },
  {
    id: 'msg3',
    sender: 'user',
    text: 'I\'m feeling overwhelmed about preparing for the baby...',
    timestamp: '2024-10-17T14:31:00'
  },
  {
    id: 'msg4',
    sender: 'bot',
    text: '🤗 It\'s completely normal to feel overwhelmed - you\'re not alone in this. I can help you break things down into smaller steps. Would you like to explore our resource sharing network for essential items, or connect with experienced moms who can share their wisdom? We\'re here to support you every step of the way.',
    timestamp: '2024-10-17T14:31:05'
  }
];

export const currentUser = users[0]; // Default to Sarah Johnson