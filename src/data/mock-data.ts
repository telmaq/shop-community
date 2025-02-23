export const MOCK_USERS = {
  sarah: {
    id: 'user1',
    username: 'Sarah K.',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+K&background=random',
  },
  john: {
    id: 'user2',
    username: 'John D.',
    avatar: 'https://ui-avatars.com/api/?name=John+D&background=random',
  },
  emily: {
    id: 'user3',
    username: 'Emily R.',
    avatar: 'https://ui-avatars.com/api/?name=Emily+R&background=random',
  },
  alex: {
    id: 'user4',
    username: 'Alex M.',
    avatar: 'https://ui-avatars.com/api/?name=Alex+M&background=random',
  },
} as const

export interface Comment {
  id: string
  userId: string
  username: string
  userAvatar: string
  text: string
  timestamp: string
}

export const MOCK_COMMENTS: Record<string, Comment[]> = {
  '1': [
    {
      id: 'c1',
      userId: MOCK_USERS.alex.id,
      username: MOCK_USERS.alex.username,
      userAvatar: MOCK_USERS.alex.avatar,
      text: 'Great find! How is the sizing?',
      timestamp: '2h ago',
    },
    {
      id: 'c2',
      userId: MOCK_USERS.emily.id,
      username: MOCK_USERS.emily.username,
      userAvatar: MOCK_USERS.emily.avatar,
      text: 'Love the style! 😍',
      timestamp: '1h ago',
    },
  ],
  '2': [
    {
      id: 'c3',
      userId: MOCK_USERS.sarah.id,
      username: MOCK_USERS.sarah.username,
      userAvatar: MOCK_USERS.sarah.avatar,
      text: 'Perfect for summer!',
      timestamp: '30m ago',
    },
  ],
}

export const MOCK_STORIES = [
  {
    id: '1',
    userId: MOCK_USERS.sarah.id,
    username: MOCK_USERS.sarah.username,
    userAvatar: MOCK_USERS.sarah.avatar,
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800',
    ],
    caption: 'Love this new collection! The quality is amazing 😍',
    likes: 42,
    comments: MOCK_COMMENTS['1']?.length ?? 0,
    isLiked: false,
  },
  {
    id: '2',
    userId: MOCK_USERS.john.id,
    username: MOCK_USERS.john.username,
    userAvatar: MOCK_USERS.john.avatar,
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800',
    ],
    caption: 'Perfect fit and super comfortable 👌',
    likes: 28,
    comments: MOCK_COMMENTS['2']?.length ?? 0,
    isLiked: false,
  },
  {
    id: '3',
    userId: MOCK_USERS.emily.id,
    username: MOCK_USERS.emily.username,
    userAvatar: MOCK_USERS.emily.avatar,
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800',
    ],
    caption: 'Perfect fit and super comfortable 👌',
    likes: 28,
    comments: MOCK_COMMENTS['3']?.length ?? 0,
    isLiked: false,
  },
]
