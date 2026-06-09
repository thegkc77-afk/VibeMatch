// mockData.js

export const DEFAULT_USERS = [
  {
    id: 'aanya',
    name: 'Aanya',
    age: 25,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
    detailImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&h=800&q=80',
    distance: '1.2 km away',
    location: 'Koramangala, Bangalore',
    online: true,
    vibes: ['😊 Fun', '💬 Chat'],
    bio: 'Anyone up for coffee? ☕',
    likes: 12,
    commentsCount: 8,
    hasLiked: false,
    messages: [
      { id: 1, sender: 'them', text: "Hey! How's your day going?", time: '5:21 PM' },
      { id: 2, sender: 'me', text: 'Pretty good! Just exploring new cafes in the city ☕', time: '5:22 PM' },
      { id: 3, sender: 'them', text: "Nice! Any hidden gems you'd recommend? 😊", time: '5:23 PM' },
      { id: 4, sender: 'me', text: "There's this cozy little place in West Village, amazing vibe!", time: '5:24 PM' },
      { id: 5, sender: 'them', text: 'Sounds perfect! I love cozy places and good conversations.', time: '5:25 PM' },
      { id: 6, sender: 'me', text: 'We should check it out sometime!', time: '5:26 PM' }
    ]
  },
  {
    id: 'rohan',
    name: 'Rohan',
    age: 26,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
    detailImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&h=800&q=80',
    distance: '1.5 km away',
    location: 'Indiranagar, Bangalore',
    online: true,
    vibes: ['🥱 Bored', '💬 Chat'],
    bio: "Bored on a Sunday. Let's talk!",
    likes: 7,
    commentsCount: 3,
    hasLiked: false,
    messages: []
  },
  {
    id: 'neha',
    name: 'Neha',
    age: 24,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&h=200&q=80',
    detailImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&h=800&q=80',
    distance: '2.1 km away',
    location: 'HSR Layout, Bangalore',
    online: true,
    vibes: ['😊 Fun', '💖 Dating'],
    bio: 'Looking for meaningful conversations.',
    likes: 9,
    commentsCount: 3,
    hasLiked: false,
    messages: []
  },
  {
    id: 'arjun',
    name: 'Arjun',
    age: 25,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80',
    detailImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&h=800&q=80',
    distance: '2.8 km away',
    location: 'Koramangala, Bangalore',
    online: true,
    vibes: ['🌌 Deep', '💼 Networking'],
    bio: "Let's talk about ideas that matter.",
    likes: 11,
    commentsCount: 4,
    hasLiked: false,
    messages: []
  },
  {
    id: 'priya',
    name: 'Priya',
    age: 24,
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&h=200&q=80',
    detailImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&h=800&q=80',
    distance: '1.6 km away',
    location: 'Jayanagar, Bangalore',
    online: true,
    vibes: ['😊 Fun', '💬 Chat'],
    bio: 'Exploring the city & good vibes ✨',
    likes: 10,
    commentsCount: 2,
    hasLiked: false,
    messages: []
  },
  {
    id: 'vikram',
    name: 'Vikram',
    age: 27,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&h=200&q=80',
    detailImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&h=800&q=80',
    distance: '2.0 km away',
    location: 'Malleswaram, Bangalore',
    online: true,
    vibes: ['🎨 Creative', '⚡ Active'],
    bio: 'Always looking for new inspiration.',
    likes: 14,
    commentsCount: 5,
    hasLiked: false,
    messages: []
  }
];

export const ACTIVE_USER = {
  name: 'Alex Rivera',
  username: '@rivera_vibe',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
  location: 'Koramangala, Bangalore'
};

export const getStoredUsers = () => {
  const stored = localStorage.getItem('vibeMatch_users');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Error parsing stored users', e);
    }
  }
  // Initialize storage
  localStorage.setItem('vibeMatch_users', JSON.stringify(DEFAULT_USERS));
  return DEFAULT_USERS;
};

export const saveStoredUsers = (users) => {
  localStorage.setItem('vibeMatch_users', JSON.stringify(users));
};
