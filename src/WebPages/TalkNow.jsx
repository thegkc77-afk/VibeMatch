import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, MapPin, MessageSquare, ChevronDown, Sparkles, Heart } from 'lucide-react';
import '../WebStyle/TalkNow.css';

// Pool of matched users matching the ones in Nearby.jsx
const POTENTIAL_MATCHES = [
  {
    id: 'aanya',
    name: 'Aanya',
    age: 25,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
    distance: '1.2 km away',
    mood: 'Same Mood'
  },
  {
    id: 'priya',
    name: 'Priya',
    age: 24,
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&h=200&q=80',
    distance: '1.5 km away', // Aligns with the screenshot example
    mood: 'Same Mood'
  },
  {
    id: 'neha',
    name: 'Neha',
    age: 24,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&h=200&q=80',
    distance: '2.1 km away',
    mood: 'Same Mood'
  }
];

function TalkNow() {
  const navigate = useNavigate();
  const [matchStatus, setMatchStatus] = useState('idle'); // 'idle' | 'matching' | 'found'
  const [matchedUser, setMatchedUser] = useState(null);

  // Active User profile avatar matching dashboard
  const activeUser = {
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
    location: 'New York, NY'
  };

  useEffect(() => {
    let timer;
    if (matchStatus === 'matching') {
      // Simulate active search loading matching screenshot
      timer = setTimeout(() => {
        // Pick a random user from POTENTIAL_MATCHES
        const randomIndex = Math.floor(Math.random() * POTENTIAL_MATCHES.length);
        setMatchedUser(POTENTIAL_MATCHES[randomIndex]);
        setMatchStatus('found');
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [matchStatus]);

  const startMatching = () => {
    setMatchStatus('matching');
  };

  const handleStartChat = () => {
    if (matchedUser) {
      // Redirect to nearby screen and pass matched user ID in location state
      navigate('/nearby', { state: { openChatWith: matchedUser.id } });
    }
  };

  return (
    <div className="talknow-container">
      {/* Shared Dashboard Header */}
      <header className="talknow-header">
        <div className="talknow-location">
          <MapPin size={18} style={{ color: '#7b61ff' }} />
          <span className="talknow-location-text">{activeUser.location}</span>
          <ChevronDown size={14} style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
        </div>
        <img 
          src={activeUser.avatar} 
          alt="Logged in user profile" 
          className="talknow-header-avatar"
          onClick={() => navigate('/profile')}
        />
      </header>

      {/* Main Content Area */}
      <div className="talknow-content">
        
        {/* Render Confetti on State 3 (Found) */}
        {matchStatus === 'found' && (
          <div className="talknow-confetti-layer">
            {[...Array(10)].map((_, i) => (
              <div key={i} className={`talknow-confetti-particle confetti-p-${i + 1}`} />
            ))}
          </div>
        )}

        {/* STATE 1: IDLE / LANDING */}
        {matchStatus === 'idle' && (
          <div className="talknow-idle-view">
            <div className="talknow-zap-container">
              <div className="talknow-zap-glow"></div>
              <Zap size={80} className="talknow-zap-icon" fill="#7b61ff" />
              
              {/* Twinkly sparkles around the lightning bolt */}
              <Sparkles size={16} className="talknow-sparkle talknow-sparkle-1" />
              <Sparkles size={20} className="talknow-sparkle talknow-sparkle-2" />
              <Sparkles size={14} className="talknow-sparkle talknow-sparkle-3" />
              <Sparkles size={18} className="talknow-sparkle talknow-sparkle-4" />
            </div>

            <h2 className="talknow-idle-headline">
              Find someone to talk <span className="talknow-gradient-text">right now</span>
            </h2>

            <button className="talknow-btn" onClick={startMatching}>
              <Zap size={18} fill="currentColor" /> Talk Now
            </button>
          </div>
        )}

        {/* STATE 2: MATCHING SPINNER */}
        {matchStatus === 'matching' && (
          <div className="talknow-matching-view">
            <h2 className="talknow-matching-headline">Matching you...</h2>

            <div className="talknow-spinner-container">
              <div className="talknow-spinner-ring">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="talknow-spinner-dot" />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STATE 3: MATCH FOUND */}
        {matchStatus === 'found' && matchedUser && (
          <div className="talknow-found-view">
            <div className="talknow-found-header">
              <span style={{ fontSize: '32px' }}>🎉</span>
              <h2 className="talknow-found-headline">
                Match <span className="talknow-gradient-text">Found!</span>
              </h2>
            </div>

            <div className="talknow-avatar-container">
              <div className="talknow-avatar-glow"></div>
              <div className="talknow-avatar-ring">
                <img src={matchedUser.avatar} alt={matchedUser.name} className="talknow-avatar-img" />
              </div>
              <div className="talknow-heart-badge">
                <Heart size={22} fill="#ec4899" />
              </div>
            </div>

            <div className="talknow-details-list">
              <div className="talknow-detail-row">
                <MapPin size={18} className="talknow-pin-icon" />
                <span>{matchedUser.distance}</span>
              </div>
              <div className="talknow-detail-row">
                <span style={{ fontSize: '18px' }}>😊</span>
                <span>Same <span className="talknow-mood-label">Mood</span></span>
              </div>
            </div>

            <button className="talknow-btn" onClick={handleStartChat}>
              <MessageSquare size={18} /> Start Chat
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default TalkNow;