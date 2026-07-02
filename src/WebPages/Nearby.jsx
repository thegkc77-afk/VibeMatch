import { useState, useRef, useEffect } from 'react';
import { useLocation, useOutletContext } from 'react-router-dom';
import { getStoredUsers, saveStoredUsers } from '../data/mockData';
import { 
  MapPin, 
  Search, 
  Bell, 
  Plus, 
  Heart, 
  MessageCircle, 
  Send, 
  Calendar, 
  Clock, 
  ArrowLeft, 
  MoreVertical, 
  Phone, 
  Check, 
  Sliders, 
  X, 
  ChevronDown, 
  Zap,
  MessageSquare,
  Menu
} from 'lucide-react';
import '../WebStyle/nearby.css';

function Nearby() {
  const { toggleSidebar } = useOutletContext();
  const location = useLocation();
  // Navigation Screens: 'discover' | 'feed_map' | 'user_card' | 'chat' | 'plan_meet'
  const [currentScreen, setCurrentScreen] = useState('discover');
  
  // Screen 2 Sub-toggle: 'feed' | 'map'
  const [feedOrMap, setFeedOrMap] = useState('feed');
  
  // Selected User for detail card, chat, and planning meet
  const [selectedUser, setSelectedUser] = useState(null);

  // Active User Profile Modal & Active Vibe
  const [isActiveProfileOpen, setIsActiveProfileOpen] = useState(false);
  const [isPostingVibe, setIsPostingVibe] = useState(false);
  const [activeUserVibe, setActiveUserVibe] = useState('Techno Nights');
  const [newVibeText, setNewVibeText] = useState('');

  // Plan Meet Invitation states
  const [selectedPlace, setSelectedPlace] = useState('Third Wave Coffee');
  const [meetDate, setMeetDate] = useState('Sat, 25 May');
  const [meetTime, setMeetTime] = useState('5:00 PM');
  const [meetNote, setMeetNote] = useState('Looking forward to it! ☕');
  const [isInviteSuccess, setIsInviteSuccess] = useState(false);

  // Chat custom text input
  const [customMsg, setCustomMsg] = useState('');
  const chatBottomRef = useRef(null);

  // Load profiles from persistent data store
  const [users, setUsers] = useState(getStoredUsers());

  // Save users state changes to localStorage
  useEffect(() => {
    saveStoredUsers(users);
  }, [users]);

  // Logged-in Active User details
  const activeUser = {
    name: 'Alex Rivera',
    username: '@rivera_vibe',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
    location: 'Koramangala, Bangalore'
  };

  // Scroll chat to bottom on load/update
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedUser?.messages, currentScreen]);

  // Handle route state from 'Talk Now' feature matching redirect
  useEffect(() => {
    if (location.state && location.state.openChatWith) {
      const userId = location.state.openChatWith;
      const matched = users.find(u => u.id === userId);
      if (matched) {
        // Defer state updates to avoid synchronous cascading renders inside useEffect
        setTimeout(() => {
          setSelectedUser(matched);
          setCurrentScreen('chat');
        }, 0);
        // Clear history state to avoid re-triggering chat window on refresh
        window.history.replaceState({}, document.title);
      }
    }
  }, [location, users]);

  // Likes toggle function
  const toggleLike = (userId, e) => {
    e.stopPropagation();
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        return {
          ...u,
          likes: u.hasLiked ? u.likes - 1 : u.likes + 1,
          hasLiked: !u.hasLiked
        };
      }
      return u;
    }));
    if (selectedUser && selectedUser.id === userId) {
      setSelectedUser(prev => ({
        ...prev,
        likes: prev.hasLiked ? prev.likes - 1 : prev.likes + 1,
        hasLiked: !prev.hasLiked
      }));
    }
  };

  // Handle open specific user detail card
  const viewUserCard = (user) => {
    setSelectedUser(user);
    setCurrentScreen('user_card');
  };

  // Handle open chat with a user
  const openChat = (user, e) => {
    if (e) e.stopPropagation();
    setSelectedUser(user);
    setCurrentScreen('chat');
  };

  // Handle send message
  const handleSendMessage = (textToSend = customMsg) => {
    if (!textToSend.trim() || !selectedUser) return;

    const newMsg = {
      id: Date.now(),
      sender: 'me',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...selectedUser.messages, newMsg];

    // Update database
    setUsers(prev => prev.map(u => {
      if (u.id === selectedUser.id) {
        return { ...u, messages: updatedMessages };
      }
      return u;
    }));

    // Update current active selected user state
    setSelectedUser(prev => ({ ...prev, messages: updatedMessages }));
    setCustomMsg('');
  };

  // Icebreaker click handler
  const handleIcebreakerClick = (text) => {
    handleSendMessage(text);
  };

  // Send Plan Meet Invite
  const handleSendInvite = () => {
    if (!selectedUser) return;

    const inviteText = `📅 Plan Meet Invitation Sent!\n📍 Place: ${selectedPlace}\n🕒 Date & Time: ${meetDate} at ${meetTime}\n📝 Note: "${meetNote}"`;
    
    const newMsg = {
      id: Date.now(),
      sender: 'me',
      text: inviteText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isInvite: true,
      inviteDetails: {
        place: selectedPlace,
        date: meetDate,
        time: meetTime,
        note: meetNote
      }
    };

    const updatedMessages = [...selectedUser.messages, newMsg];

    setUsers(prev => prev.map(u => {
      if (u.id === selectedUser.id) {
        return { ...u, messages: updatedMessages };
      }
      return u;
    }));

    setSelectedUser(prev => ({ ...prev, messages: updatedMessages }));
    setIsInviteSuccess(true);
  };

  // Add custom user vibe
  const handleAddVibe = () => {
    if (newVibeText.trim()) {
      setActiveUserVibe(newVibeText.trim());
      setNewVibeText('');
      setIsPostingVibe(false);
    }
  };

  return (
    <div className="nearby-container">
      
      {/* 1. Global Header (Shared by Discover & Feed/Map Screens) */}
      {(currentScreen === 'discover' || currentScreen === 'feed_map') && (
        <header className="nearby-header">
          <button className="dashboard-hamburger-btn" onClick={toggleSidebar} aria-label="Toggle Sidebar">
            <Menu size={24} />
          </button>
          <div className="location-selector">
            <MapPin size={20} className="text-purple-400" style={{ color: '#7b61ff' }} />
            <span className="location-text">{activeUser.location}</span>
            <ChevronDown size={16} />
          </div>
          <div className="header-actions">
            {currentScreen === 'discover' ? (
              <>
                <button className="icon-btn" aria-label="Search">
                  <Search size={20} />
                </button>
                <button className="icon-btn" aria-label="Notifications">
                  <Bell size={20} />
                  <span className="notification-badge">3</span>
                </button>
              </>
            ) : (
              <button className="icon-btn" aria-label="Filters">
                <Sliders size={20} />
              </button>
            )}
            <img 
              src={activeUser.avatar} 
              alt="Logged in user profile" 
              className="header-profile-avatar" 
              onClick={() => setIsActiveProfileOpen(true)}
            />
          </div>
        </header>
      )}

      {/* RENDER SCREEN 1: Nearby Tab */}
      {currentScreen === 'discover' && (
        <>
          {/* Active Vibes Nearby Carousel */}
          <section className="active-vibes-section">
            <h2 className="section-title">Active vibes nearby</h2>
            <div className="vibes-carousel">
              {/* Active User Vibe Action Card */}
              <div className="vibe-avatar-wrapper" onClick={() => setIsPostingVibe(true)}>
                <div className="vibe-avatar-circle add-vibe">
                  <div className="vibe-add-icon">
                    <Plus size={24} />
                  </div>
                </div>
                <span className="vibe-label add">Post your vibe</span>
              </div>

              {/* Other Active User Vibes */}
              {users.map(u => (
                <div key={u.id} className="vibe-avatar-wrapper" onClick={() => viewUserCard(u)}>
                  <div className="vibe-avatar-circle">
                    <img src={u.avatar} alt={u.name} />
                    <span className="vibe-avatar-badge"></span>
                  </div>
                  <span className="vibe-label">{u.distance.replace(' away', '')}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Sub Navbar Tabs */}
          <div className="filter-tabs-row">
            <div className="filter-tabs">
              <button className="filter-tab active">Nearby</button>
              <button className="filter-tab" onClick={() => setCurrentScreen('feed_map')}>Following</button>
              <button className="filter-tab" onClick={() => setCurrentScreen('feed_map')}>
                <Zap size={14} fill="#ffffff" />
                Talk Now
              </button>
            </div>
            <span className="see-all-link" onClick={() => { setCurrentScreen('feed_map'); setFeedOrMap('feed'); }}>See all</span>
          </div>

          {/* People Nearby Cards list */}
          <section className="people-nearby-list">
            <h2 className="section-title">People nearby</h2>
            
            {users.slice(0, 2).map((person) => (
              <div key={person.id} className="people-card" onClick={() => viewUserCard(person)}>
                <div className="people-card-avatar-side">
                  <img src={person.avatar} alt={person.name} className="people-card-img" />
                </div>
                <div className="people-card-details-side">
                  <div className="people-card-header">
                    <div className="people-name-row">
                      <span className="people-name">
                        {person.name}, {person.age}
                        <span className="status-indicator"></span>
                      </span>
                      <span className="people-distance">📍 {person.distance}</span>
                    </div>
                    <button className="more-options-btn" aria-label="More" onClick={(e) => e.stopPropagation()}>
                      <MoreVertical size={18} />
                    </button>
                  </div>

                  <div className="people-vibe-tags">
                    {person.vibes.map((v, i) => (
                      <span key={i} className="vibe-tag">{v}</span>
                    ))}
                  </div>

                  <p className="people-quote-text">"{person.bio}"</p>

                  <div className="people-card-footer">
                    <div className="people-stats">
                      <button 
                        className={`stat-item ${person.hasLiked ? 'liked' : ''}`}
                        onClick={(e) => toggleLike(person.id, e)}
                      >
                        <Heart size={16} fill={person.hasLiked ? "#ec4899" : "none"} />
                        <span>{person.likes}</span>
                      </button>
                      <button className="stat-item" onClick={(e) => openChat(person, e)}>
                        <MessageCircle size={16} />
                        <span>{person.commentsCount}</span>
                      </button>
                    </div>
                    <div className="card-actions">
                      <button className="btn-chat" onClick={(e) => openChat(person, e)}>
                        <Zap size={14} fill="currentColor" /> Chat
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </>
      )}

      {/* RENDER SCREEN 2: Feed / Map View */}
      {currentScreen === 'feed_map' && (
        <>
          <div className="feed-map-header">
            <button className="back-circle-btn" onClick={() => setCurrentScreen('discover')} aria-label="Back">
              <ArrowLeft size={18} />
            </button>

            <div className="toggle-switch-container">
              <button 
                className={`toggle-btn ${feedOrMap === 'feed' ? 'active' : ''}`}
                onClick={() => setFeedOrMap('feed')}
              >
                Feed
              </button>
              <button 
                className={`toggle-btn ${feedOrMap === 'map' ? 'active' : ''}`}
                onClick={() => setFeedOrMap('map')}
              >
                Map
              </button>
            </div>
            <div style={{ width: '40px' }} /> {/* Spacing */}
          </div>

          {feedOrMap === 'feed' ? (
            /* Feed List of Users */
            <section className="people-nearby-list">
              {users.map((person) => (
                <div key={person.id} className="people-card" onClick={() => viewUserCard(person)}>
                  <div className="people-card-avatar-side">
                    <img src={person.avatar} alt={person.name} className="people-card-img" />
                  </div>
                  <div className="people-card-details-side">
                    <div className="people-card-header">
                      <div className="people-name-row">
                        <span className="people-name">
                          {person.name}, {person.age}
                          <span className="status-indicator"></span>
                        </span>
                        <span className="people-distance">📍 {person.distance}</span>
                      </div>
                      <button className="more-options-btn" aria-label="More" onClick={(e) => e.stopPropagation()}>
                        <MoreVertical size={18} />
                      </button>
                    </div>

                    <div className="people-vibe-tags">
                      {person.vibes.map((v, i) => (
                        <span key={i} className="vibe-tag">{v}</span>
                      ))}
                    </div>

                    <p className="people-quote-text">"{person.bio}"</p>

                    <div className="people-card-footer">
                      <div className="people-stats">
                        <button 
                          className={`stat-item ${person.hasLiked ? 'liked' : ''}`}
                          onClick={(e) => toggleLike(person.id, e)}
                        >
                          <Heart size={16} fill={person.hasLiked ? "#ec4899" : "none"} />
                          <span>{person.likes}</span>
                        </button>
                        <button className="stat-item" onClick={(e) => openChat(person, e)}>
                          <MessageCircle size={16} />
                          <span>{person.commentsCount}</span>
                        </button>
                      </div>
                      <div className="card-actions">
                        <button className="btn-chat" onClick={(e) => openChat(person, e)}>
                          <Zap size={14} fill="currentColor" /> Chat
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          ) : (
            /* Radar Map View */
            <div className="radar-map-view">
              <div className="radar-grid">
                <div className="radar-ring"></div>
                <div className="radar-ring"></div>
                <div className="radar-ring"></div>
                <div className="radar-ring"></div>
                <div className="radar-crosshair-h"></div>
                <div className="radar-crosshair-v"></div>
                <div className="radar-sweep"></div>
              </div>

              {/* Active User center pin */}
              <div className="radar-pin" style={{ top: 'calc(50% - 32px)', left: 'calc(50% - 24px)' }} onClick={() => setIsActiveProfileOpen(true)}>
                <div className="radar-avatar-ring" style={{ borderColor: '#7b61ff' }}>
                  <img src={activeUser.avatar} alt="You" />
                </div>
                <span className="radar-pin-label">You</span>
              </div>

              {/* Map Pins for Nearby Users */}
              <div className="radar-pin" style={{ top: '22%', left: '32%' }} onClick={() => viewUserCard(users[0])}>
                <div className="radar-avatar-ring glow-pink">
                  <img src={users[0].avatar} alt={users[0].name} />
                </div>
                <div className="radar-avatar-pulse"></div>
                <span className="radar-pin-label">{users[0].name} (1.2km)</span>
              </div>

              <div className="radar-pin" style={{ top: '28%', left: '68%' }} onClick={() => viewUserCard(users[1])}>
                <div className="radar-avatar-ring">
                  <img src={users[1].avatar} alt={users[1].name} />
                </div>
                <div className="radar-avatar-pulse"></div>
                <span className="radar-pin-label">{users[1].name} (1.5km)</span>
              </div>

              <div className="radar-pin" style={{ top: '70%', left: '25%' }} onClick={() => viewUserCard(users[2])}>
                <div className="radar-avatar-ring">
                  <img src={users[2].avatar} alt={users[2].name} />
                </div>
                <div className="radar-avatar-pulse"></div>
                <span className="radar-pin-label">{users[2].name} (2.1km)</span>
              </div>

              <div className="radar-pin" style={{ top: '65%', left: '60%' }} onClick={() => viewUserCard(users[3])}>
                <div className="radar-avatar-ring glow-pink">
                  <img src={users[3].avatar} alt={users[3].name} />
                </div>
                <div className="radar-avatar-pulse"></div>
                <span className="radar-pin-label">{users[3].name} (2.8km)</span>
              </div>
            </div>
          )}
        </>
      )}

      {/* RENDER SCREEN 3: User Card Detail View */}
      {currentScreen === 'user_card' && selectedUser && (
        <div className="user-detail-card">
          <div className="detail-hero-section">
            <div className="detail-header-row">
              <button className="back-circle-btn" onClick={() => setCurrentScreen('discover')} aria-label="Back">
                <ArrowLeft size={18} />
              </button>
              <button className="back-circle-btn" aria-label="More Options">
                <MoreVertical size={18} />
              </button>
            </div>
            
            <img src={selectedUser.detailImage} alt={selectedUser.name} className="detail-cover-image" />
            <div className="detail-image-overlay"></div>
          </div>

          <div className="detail-content-area">
            <div className="detail-name-section">
              <span className="detail-name">
                {selectedUser.name}, {selectedUser.age}
                <span className="status-indicator"></span>
              </span>
              <span className="detail-location-distance">
                <MapPin size={16} /> {selectedUser.distance}
              </span>
            </div>

            <div className="detail-vibe-tags">
              {selectedUser.vibes.map((v, i) => (
                <span key={i} className="vibe-tag">{v}</span>
              ))}
            </div>

            <div className="detail-quote-box">
              <h3 className="detail-quote-heading">Vibe Status</h3>
              <p className="detail-quote">"{selectedUser.bio}"</p>
            </div>

            <div className="detail-engagement-row">
              <button 
                className={`detail-engagement-item stat-item ${selectedUser.hasLiked ? 'liked' : ''}`}
                onClick={(e) => toggleLike(selectedUser.id, e)}
                style={{ background: 'none', border: 'none' }}
              >
                <Heart size={18} fill={selectedUser.hasLiked ? "#ec4899" : "none"} />
                <span>{selectedUser.likes} Likes</span>
              </button>

              <div className="detail-engagement-item">
                <MessageSquare size={18} />
                <span>{selectedUser.commentsCount} Comments</span>
              </div>
            </div>

            <div className="detail-action-footer">
              <button className="btn-detail-chat" onClick={(e) => openChat(selectedUser, e)}>
                <MessageCircle size={18} /> Chat
              </button>
              <button className="btn-detail-comment">
                Comment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RENDER SCREEN 4: Chat Screen */}
      {currentScreen === 'chat' && selectedUser && (
        <div className="chat-window">
          {/* Chat Header */}
          <div className="chat-header">
            <button className="back-circle-btn" onClick={() => setCurrentScreen('user_card')} aria-label="Back">
              <ArrowLeft size={18} />
            </button>
            
            <div className="chat-user-profile">
              <div className="chat-avatar-container">
                <img src={selectedUser.avatar} alt={selectedUser.name} />
                <span className="vibe-avatar-badge"></span>
              </div>
              <div className="chat-header-info">
                <span className="chat-header-name">{selectedUser.name}</span>
                <span className="chat-header-status">
                  <span className="chat-header-status-dot"></span>
                  {selectedUser.distance} • Online
                </span>
              </div>
            </div>

            <div className="chat-actions">
              <button className="icon-btn" aria-label="Call">
                <Phone size={18} />
              </button>
              <button className="icon-btn" aria-label="More Details">
                <MoreVertical size={18} />
              </button>
            </div>
          </div>

          {/* Icebreakers Box */}
          <div className="icebreakers-box">
            <span className="icebreaker-title">
              💡 Icebreakers
            </span>
            <div className="icebreaker-pills">
              <button className="icebreaker-pill" onClick={() => handleIcebreakerClick("Which cafe? ☕")}>Which cafe? ☕</button>
              <button className="icebreaker-pill" onClick={() => handleIcebreakerClick("I'm nearby 😊")}>I'm nearby 😊</button>
              <button className="icebreaker-pill" onClick={() => handleIcebreakerClick("Let's go! 🚀")}>Let's go! 🚀</button>
            </div>
          </div>

          {/* Chat message bubbles list */}
          <div className="chat-messages-container">
            <div className="chat-date-divider">Today</div>

            {selectedUser.messages.length === 0 ? (
              <div style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.3)', fontSize: '13px', marginTop: '40px' }}>
                Say hello to start the conversation!
              </div>
            ) : (
              selectedUser.messages.map((msg) => {
                if (msg.isInvite) {
                  return (
                    <div key={msg.id} className="system-invite-card">
                      <div className="system-invite-header">
                        <Calendar size={16} />
                        <span>Meeting Invitation Sent</span>
                      </div>
                      <div className="system-invite-details">
                        <span><strong>Place:</strong> {msg.inviteDetails.place}</span>
                        <span><strong>Time:</strong> {msg.inviteDetails.date} at {msg.inviteDetails.time}</span>
                        {msg.inviteDetails.note && (
                          <span><strong>Note:</strong> {msg.inviteDetails.note}</span>
                        )}
                      </div>
                    </div>
                  );
                }

                const isMe = msg.sender === 'me';
                return (
                  <div key={msg.id} className={`chat-bubble-wrapper ${isMe ? 'outgoing' : 'incoming'}`}>
                    {!isMe && (
                      <img src={selectedUser.avatar} alt={selectedUser.name} className="bubble-avatar" />
                    )}
                    <div className="bubble-content-block">
                      <div className="chat-bubble">
                        {msg.text}
                      </div>
                      <span className="chat-time">{msg.time}</span>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Bottom Banner Plan Meet Button */}
          <div className="chat-footer-banner">
            <button className="plan-meet-banner-btn" onClick={() => setCurrentScreen('plan_meet')}>
              <Calendar size={15} /> Plan Meet
            </button>
          </div>

          {/* Message Text Composer */}
          <div className="chat-input-bar">
            <input 
              type="text" 
              placeholder="Type a message..." 
              className="chat-text-input"
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
            />
            <button className="btn-send-message" aria-label="Send" onClick={() => handleSendMessage()}>
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* RENDER SCREEN 5: Plan Meet View */}
      {currentScreen === 'plan_meet' && selectedUser && (
        <div className="plan-meet-window">
          
          {/* Header */}
          <div className="plan-meet-header">
            <button className="back-circle-btn" onClick={() => setCurrentScreen('chat')} aria-label="Back">
              <ArrowLeft size={18} />
            </button>
            <h2 className="plan-meet-title">Plan Meet</h2>
            <div style={{ width: '40px' }} /> {/* Balance space */}
          </div>

          {/* Mini User Card */}
          <div className="mini-profile-row">
            <img src={selectedUser.avatar} alt={selectedUser.name} className="mini-profile-avatar" />
            <div className="mini-profile-info">
              <span className="mini-profile-name">{selectedUser.name}, {selectedUser.age}</span>
              <span className="mini-profile-meta">
                <span className="chat-header-status-dot"></span>
                {selectedUser.distance} • Online
              </span>
            </div>
          </div>

          {/* Choose Place Section */}
          <div>
            <h3 className="meet-section-heading">Choose a place</h3>
            <div className="place-picker">
              <div 
                className={`place-item ${selectedPlace === 'Third Wave Coffee' ? 'selected' : ''}`}
                onClick={() => setSelectedPlace('Third Wave Coffee')}
              >
                <div className="place-details">
                  <span className="place-name">Third Wave Coffee</span>
                  <span className="place-dist">0.9 km away</span>
                </div>
                <div className="place-check-circle">
                  {selectedPlace === 'Third Wave Coffee' && <Check size={12} />}
                </div>
              </div>

              <div 
                className={`place-item ${selectedPlace === 'Blue Tokai Coffee Roasters' ? 'selected' : ''}`}
                onClick={() => setSelectedPlace('Blue Tokai Coffee Roasters')}
              >
                <div className="place-details">
                  <span className="place-name">Blue Tokai Coffee Roasters</span>
                  <span className="place-dist">1.3 km away</span>
                </div>
                <div className="place-check-circle">
                  {selectedPlace === 'Blue Tokai Coffee Roasters' && <Check size={12} />}
                </div>
              </div>

              <div 
                className={`place-item ${selectedPlace === 'Toit Brewpub' ? 'selected' : ''}`}
                onClick={() => setSelectedPlace('Toit Brewpub')}
              >
                <div className="place-details">
                  <span className="place-name">Toit Brewpub</span>
                  <span className="place-dist">1.6 km away</span>
                </div>
                <div className="place-check-circle">
                  {selectedPlace === 'Toit Brewpub' && <Check size={12} />}
                </div>
              </div>
            </div>
          </div>

          {/* Date & Time Selectors */}
          <div>
            <h3 className="meet-section-heading">Select date & time</h3>
            <div className="date-time-row">
              <div className="picker-input-wrapper">
                <Calendar size={16} className="text-purple-400" style={{ color: '#b9a7ff' }} />
                <select value={meetDate} onChange={(e) => setMeetDate(e.target.value)}>
                  <option value="Sat, 25 May">Sat, 25 May</option>
                  <option value="Sun, 26 May">Sun, 26 May</option>
                  <option value="Mon, 27 May">Mon, 27 May</option>
                </select>
              </div>

              <div className="picker-input-wrapper">
                <Clock size={16} className="text-purple-400" style={{ color: '#b9a7ff' }} />
                <select value={meetTime} onChange={(e) => setMeetTime(e.target.value)}>
                  <option value="5:00 PM">5:00 PM</option>
                  <option value="6:00 PM">6:00 PM</option>
                  <option value="7:30 PM">7:30 PM</option>
                  <option value="8:00 PM">8:00 PM</option>
                </select>
              </div>
            </div>
          </div>

          {/* Custom Note */}
          <div>
            <h3 className="meet-section-heading">Add a note (optional)</h3>
            <textarea 
              className="meet-note-input"
              value={meetNote}
              onChange={(e) => setMeetNote(e.target.value)}
              placeholder="Looking forward to it! ☕"
            />
          </div>

          {/* Confirmation Info Box */}
          <div className="meet-confirmation-card">
            <h3 className="meet-section-heading" style={{ margin: 0 }}>Confirmation</h3>
            
            <div className="confirmation-line" style={{ marginTop: '6px' }}>
              <span className="confirmation-label">Place</span>
              <span className="confirmation-val">{selectedPlace}</span>
            </div>

            <div className="confirmation-line">
              <span className="confirmation-label">Date & Time</span>
              <span className="confirmation-val">{meetDate} at {meetTime}</span>
            </div>

            <span className="confirmation-notice">
              You'll both get a reminder before the meet.
            </span>
          </div>

          {/* Footer Submit */}
          <button className="btn-send-invite" onClick={handleSendInvite}>
            Send Invite
          </button>
        </div>
      )}

      {/* ================= MODALS ================= */}

      {/* Profile Modal for Logged In Active User */}
      {isActiveProfileOpen && (
        <div className="modal-overlay" onClick={() => setIsActiveProfileOpen(false)}>
          <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setIsActiveProfileOpen(false)}>
              <X size={20} />
            </button>
            <h3 className="modal-title">Your Profile</h3>
            
            <div className="modal-avatar-picker-section">
              <img src={activeUser.avatar} alt={activeUser.name} className="modal-avatar-preview" />
              <div className="modal-avatar-info">
                <h4>{activeUser.name}</h4>
                <p>{activeUser.username}</p>
                <p>📍 {activeUser.location}</p>
              </div>
            </div>

            <div>
              <h3 className="meet-section-heading">Current Active Vibe</h3>
              <div style={{ background: 'rgba(123, 97, 255, 0.1)', border: '1px solid rgba(123, 97, 255, 0.3)', padding: '12px', borderRadius: '12px', color: '#b9a7ff', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Zap size={16} fill="currentColor" /> {activeUserVibe}
              </div>
            </div>

            <button className="btn-modal-save" onClick={() => { setIsActiveProfileOpen(false); setIsPostingVibe(true); }}>
              Change Vibe Status
            </button>
          </div>
        </div>
      )}

      {/* Active User Vibe Posting Modal */}
      {isPostingVibe && (
        <div className="modal-overlay" onClick={() => setIsPostingVibe(false)}>
          <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setIsPostingVibe(false)}>
              <X size={20} />
            </button>
            <h3 className="modal-title">Post Your Vibe</h3>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', margin: '0 0 8px 0' }}>
              Set a temporary vibe that people nearby can see.
            </p>

            <input 
              type="text"
              placeholder="e.g. Techno Nights, Coffee Chat, Book Club..."
              className="chat-text-input"
              value={newVibeText}
              onChange={(e) => setNewVibeText(e.target.value)}
              style={{ width: '100%', boxSizing: 'border-box' }}
              onKeyDown={(e) => { if (e.key === 'Enter') handleAddVibe(); }}
            />

            <div>
              <h4 className="meet-section-heading">Or choose a preset:</h4>
              <div className="modal-vibe-preset-grid">
                <button className="modal-preset-btn" onClick={() => setNewVibeText('Techno Nights')}>🎸 Techno Nights</button>
                <button className="modal-preset-btn" onClick={() => setNewVibeText('Coffee & Code')}>☕ Coffee & Code</button>
                <button className="modal-preset-btn" onClick={() => setNewVibeText('Rooftop Jazz')}>🎷 Rooftop Jazz</button>
                <button className="modal-preset-btn" onClick={() => setNewVibeText('Neon Food Walk')}>🍜 Neon Night Bites</button>
              </div>
            </div>

            <button className="btn-modal-save" onClick={handleAddVibe}>
              Publish Vibe
            </button>
          </div>
        </div>
      )}

      {/* Invitation Sent Success Modal */}
      {isInviteSuccess && (
        <div className="modal-overlay" onClick={() => { setIsInviteSuccess(false); setCurrentScreen('chat'); }}>
          <div className="modal-content-card" style={{ alignItems: 'center', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', border: '2px solid rgba(34, 197, 94, 0.3)', marginBottom: '8px' }}>
              <Check size={32} />
            </div>
            
            <h3 className="modal-title">Invitation Sent!</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', lineHeight: 1.4, margin: '8px 0 16px 0' }}>
              Your meeting invitation with <strong>{selectedUser?.name}</strong> at <strong>{selectedPlace}</strong> has been successfully delivered.
            </p>

            <button className="btn-modal-save" style={{ background: '#22c55e', boxShadow: '0 4px 12px rgba(34, 197, 94, 0.25)' }} onClick={() => { setIsInviteSuccess(false); setCurrentScreen('chat'); }}>
              Go to Chat
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default Nearby;