import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { 
  MapPin, 
  Search, 
  Bell, 
  Send, 
  Calendar, 
  Clock, 
  ArrowLeft, 
  MoreVertical, 
  Phone, 
  Check, 
  X,
  ChevronDown,
  MessageSquare,
  Menu
} from 'lucide-react';
import { io } from 'socket.io-client';
import { getStoredUsers, saveStoredUsers, ACTIVE_USER } from '../data/mockData';
import '../WebStyle/chat.css';

function Chat() {
  const { toggleSidebar } = useOutletContext();
  const navigate = useNavigate();
  const location = useLocation();
  const chatBottomRef = useRef(null);
  const socketRef = useRef(null);

  // Users database synced from localStorage
  const [users, setUsers] = useState(getStoredUsers());
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Navigation states
  const [customMsg, setCustomMsg] = useState('');
  const [showMeetupModal, setShowMeetupModal] = useState(false);

  // Plan Meet Invitation states
  const [selectedPlace, setSelectedPlace] = useState('Third Wave Coffee');
  const [meetDate, setMeetDate] = useState('Sat, 25 May');
  const [meetTime, setMeetTime] = useState('5:00 PM');
  const [meetNote, setMeetNote] = useState('Looking forward to it! ☕');
  const [isInviteSuccess, setIsInviteSuccess] = useState(false);

  // Save users state changes to localStorage
  useEffect(() => {
    saveStoredUsers(users);
  }, [users]);

  // Connect to Socket.io backend
  useEffect(() => {
    const socket = io('http://localhost:5000');
    socketRef.current = socket;

    socket.emit('join', 'me');

    socket.on('receiveMessage', (data) => {
      if (data.senderId !== 'me' && data.receiverId === 'me') {
        let text = data.message;
        let isInvite = false;
        let inviteDetails = null;

        try {
          const parsed = JSON.parse(data.message);
          text = parsed.text;
          isInvite = parsed.isInvite;
          inviteDetails = parsed.inviteDetails;
        } catch {
          // not JSON, fallback to plain text
        }

        const incomingMsg = {
          id: Date.now() + Math.random(),
          sender: 'them',
          text: text,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isInvite: isInvite,
          ...(inviteDetails && { inviteDetails })
        };

        setUsers((prevUsers) => {
          return prevUsers.map((u) => {
            if (u.id === data.senderId) {
              return { ...u, messages: [...u.messages, incomingMsg] };
            }
            return u;
          });
        });

        setSelectedUser((prevSelected) => {
          if (prevSelected && prevSelected.id === data.senderId) {
            return { ...prevSelected, messages: [...prevSelected.messages, incomingMsg] };
          }
          return prevSelected;
        });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Handle route state if navigated from Talk Now or Nearby card
  useEffect(() => {
    if (location.state && location.state.openChatWith) {
      const userId = location.state.openChatWith;
      const matchedUser = users.find(u => u.id === userId);
      if (matchedUser) {
        // Defer state updates to avoid synchronous cascading renders inside useEffect
        setTimeout(() => {
          setSelectedUser(matchedUser);
        }, 0);
        // Clean location state to prevent repeating on refresh
        window.history.replaceState({}, document.title);
      }
    }
  }, [location, users]);

  // Scroll chat window to bottom
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedUser?.messages]);

  // Handle Select User Thread
  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setShowMeetupModal(false);
    setIsInviteSuccess(false);
  };

  // Handle Send Message
  const handleSendMessage = (textToSend = customMsg) => {
    if (!textToSend.trim() || !selectedUser) return;

    const newMsg = {
      id: Date.now(),
      sender: 'me',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Emit to socket
    if (socketRef.current) {
      socketRef.current.emit('sendMessage', {
        senderId: 'me',
        receiverId: selectedUser.id,
        message: JSON.stringify({
          text: textToSend,
          isInvite: false
        })
      });
    }

    const updatedMessages = [...selectedUser.messages, newMsg];

    // Update global users database
    const updatedUsers = users.map(u => {
      if (u.id === selectedUser.id) {
        return { ...u, messages: updatedMessages };
      }
      return u;
    });

    setUsers(updatedUsers);
    setSelectedUser({ ...selectedUser, messages: updatedMessages });
    setCustomMsg('');
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

    // Emit to socket
    if (socketRef.current) {
      socketRef.current.emit('sendMessage', {
        senderId: 'me',
        receiverId: selectedUser.id,
        message: JSON.stringify({
          text: inviteText,
          isInvite: true,
          inviteDetails: {
            place: selectedPlace,
            date: meetDate,
            time: meetTime,
            note: meetNote
          }
        })
      });
    }

    const updatedMessages = [...selectedUser.messages, newMsg];

    const updatedUsers = users.map(u => {
      if (u.id === selectedUser.id) {
        return { ...u, messages: updatedMessages };
      }
      return u;
    });

    setUsers(updatedUsers);
    setSelectedUser({ ...selectedUser, messages: updatedMessages });
    setIsInviteSuccess(true);

    setTimeout(() => {
      setShowMeetupModal(false);
      setIsInviteSuccess(false);
    }, 1500);
  };

  // Icebreaker click handler
  const handleIcebreakerClick = (text) => {
    handleSendMessage(text);
  };

  // Helper to format last message snippet
  const getLastMessageSnippet = (user) => {
    if (user.messages.length > 0) {
      const lastMsg = user.messages[user.messages.length - 1];
      return lastMsg.isInvite ? "📅 Meeting Invitation Sent" : lastMsg.text;
    }
    return user.bio;
  };

  // Helper to get last message time
  const getLastMessageTime = (user) => {
    if (user.messages.length > 0) {
      return user.messages[user.messages.length - 1].time;
    }
    return 'Active';
  };

  // Sort threads so that those with messages are on top
  const sortedUsers = [...users].sort((a, b) => {
    if (a.messages.length > 0 && b.messages.length === 0) return -1;
    if (a.messages.length === 0 && b.messages.length > 0) return 1;
    return 0;
  });

  return (
    <div className="chatpage-container">
      {/* 1. Global Header */}
      <header className="chatpage-header">
        <button className="dashboard-hamburger-btn" onClick={toggleSidebar} aria-label="Toggle Sidebar">
          <Menu size={24} />
        </button>
        <div className="location-selector">
          <MapPin size={20} style={{ color: '#7b61ff' }} />
          <span className="location-text">{ACTIVE_USER.location}</span>
          <ChevronDown size={16} />
        </div>
        <h2 className="chatpage-brand-title">Inbox</h2>
        <div className="header-actions">
          <button className="icon-btn" aria-label="Notifications" onClick={() => navigate('/notification')}>
            <Bell size={20} />
            <span className="notification-badge">3</span>
          </button>
          <img 
            src={ACTIVE_USER.avatar} 
            alt="Logged in user profile" 
            className="header-profile-avatar" 
            onClick={() => navigate('/profile')}
          />
        </div>
      </header>

      {/* 2. Main Window Shell (Split view) */}
      <div className="chatpage-window-shell">
        
        {/* LEFT COLUMN: Threads list */}
        <div className={`chatpage-threads-sidebar ${selectedUser ? 'hidden-mobile' : ''}`}>
          <div className="chatpage-search-bar">
            <Search size={18} className="search-icon" />
            <input type="text" placeholder="Search conversations..." className="search-input" />
          </div>
          <div className="chatpage-threads-list">
            <h3 className="threads-heading">Recent Messages</h3>
            {sortedUsers.map(user => {
              const isSelected = selectedUser && selectedUser.id === user.id;
              const hasHistory = user.messages.length > 0;
              return (
                <div 
                  key={user.id} 
                  className={`thread-item ${isSelected ? 'active' : ''} ${hasHistory ? 'has-history' : ''}`}
                  onClick={() => handleSelectUser(user)}
                >
                  <div className="thread-avatar-side">
                    <img src={user.avatar} alt={user.name} />
                    {user.online && <span className="online-badge"></span>}
                  </div>
                  <div className="thread-details-side">
                    <div className="thread-name-row">
                      <span className="thread-name">{user.name}</span>
                      <span className="thread-time">{getLastMessageTime(user)}</span>
                    </div>
                    <span className="thread-snippet">{getLastMessageSnippet(user)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Active Chat details */}
        <div className={`chatpage-chat-canvas ${!selectedUser ? 'empty-canvas hidden-mobile' : ''}`}>
          {selectedUser ? (
            <div className="chatpage-active-window">
              {/* Active Header */}
              <div className="chatpage-active-header">
                <button className="back-btn-mobile" onClick={() => setSelectedUser(null)} aria-label="Back to inbox">
                  <ArrowLeft size={20} />
                </button>
                <div className="active-user-profile" onClick={() => navigate('/nearby', { state: { openChatWith: selectedUser.id } })}>
                  <div className="avatar-container">
                    <img src={selectedUser.avatar} alt={selectedUser.name} />
                    <span className="online-dot"></span>
                  </div>
                  <div className="active-header-info">
                    <span className="active-header-name">{selectedUser.name}, {selectedUser.age}</span>
                    <span className="active-header-status">{selectedUser.distance} • Online</span>
                  </div>
                </div>
                <div className="active-actions">
                  <button className="icon-btn" aria-label="Call">
                    <Phone size={18} />
                  </button>
                  <button className="icon-btn" aria-label="More options">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>

              {/* Message Display Area */}
              <div className="chatpage-messages-scroller">
                <div className="chatpage-date-divider">Vibe Connected</div>
                {selectedUser.messages.length === 0 ? (
                  <div className="chatpage-empty-history">
                    <p>Start the conversation with {selectedUser.name}! ✨</p>
                    <span className="empty-history-sub">Choose an icebreaker below or type a message.</span>
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

              {/* Icebreakers Box */}
              <div className="chatpage-icebreakers-box">
                <span className="icebreaker-title">💡 Icebreakers</span>
                <div className="icebreaker-pills">
                  <button className="icebreaker-pill" onClick={() => handleIcebreakerClick("Which cafe? ☕")}>Which cafe? ☕</button>
                  <button className="icebreaker-pill" onClick={() => handleIcebreakerClick("I'm nearby 😊")}>I'm nearby 😊</button>
                  <button className="icebreaker-pill" onClick={() => handleIcebreakerClick("Let's go! 🚀")}>Let's go! 🚀</button>
                </div>
              </div>

              {/* Bottom Banner Plan Meet Button */}
              <div className="chatpage-footer-banner">
                <button className="plan-meet-banner-btn" onClick={() => setShowMeetupModal(true)}>
                  <Calendar size={15} /> Plan Meet
                </button>
              </div>

              {/* Text composer */}
              <div className="chatpage-input-bar">
                <input 
                  type="text" 
                  placeholder="Type a message..." 
                  className="chatpage-text-input"
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
                />
                <button className="btn-send-message" aria-label="Send" onClick={() => handleSendMessage()}>
                  <Send size={18} />
                </button>
              </div>

              {/* Meetup Modal Overlay */}
              {showMeetupModal && (
                <div className="meetup-modal-backdrop">
                  <div className="meetup-modal">
                    <div className="meetup-modal-header">
                      <h3>Plan Meet</h3>
                      <button className="close-btn" onClick={() => setShowMeetupModal(false)}>
                        <X size={18} />
                      </button>
                    </div>
                    {isInviteSuccess ? (
                      <div className="meetup-modal-success">
                        <Check size={40} style={{ color: '#22c55e', marginBottom: '12px' }} />
                        <h4>Invitation Sent Successfully!</h4>
                        <p>It will be visible in the chat log.</p>
                      </div>
                    ) : (
                      <div className="meetup-modal-body">
                        {/* Choose Place */}
                        <div className="form-group">
                          <label className="label">Choose a Place</label>
                          <div className="meetup-place-picker">
                            {[
                              { name: 'Third Wave Coffee', dist: '0.9 km' },
                              { name: 'Blue Tokai Roasters', dist: '1.3 km' },
                              { name: 'Toit Brewpub', dist: '2.0 km' }
                            ].map(place => (
                              <div 
                                key={place.name} 
                                className={`place-item ${selectedPlace === place.name ? 'selected' : ''}`}
                                onClick={() => setSelectedPlace(place.name)}
                              >
                                <div className="place-text">
                                  <strong>{place.name}</strong>
                                  <span>{place.dist} away</span>
                                </div>
                                <div className="place-check">
                                  {selectedPlace === place.name && <Check size={12} />}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Date Picker */}
                        <div className="form-group-row">
                          <div className="form-group flex-1">
                            <label className="label">Date</label>
                            <div className="input-with-icon">
                              <Calendar size={16} />
                              <input 
                                type="text" 
                                value={meetDate} 
                                onChange={(e) => setMeetDate(e.target.value)} 
                                className="modal-input-field" 
                              />
                            </div>
                          </div>
                          <div className="form-group flex-1">
                            <label className="label">Time</label>
                            <div className="input-with-icon">
                              <Clock size={16} />
                              <input 
                                type="text" 
                                value={meetTime} 
                                onChange={(e) => setMeetTime(e.target.value)} 
                                className="modal-input-field" 
                              />
                            </div>
                          </div>
                        </div>

                        {/* Note */}
                        <div className="form-group">
                          <label className="label">Add a Note</label>
                          <input 
                            type="text" 
                            value={meetNote} 
                            onChange={(e) => setMeetNote(e.target.value)} 
                            className="modal-input-field text-note" 
                          />
                        </div>

                        <button className="modal-submit-btn" onClick={handleSendInvite}>
                          Send Meeting Invite
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="chatpage-empty-state">
              <div className="empty-state-glow"></div>
              <div className="empty-state-icon">
                <MessageSquare size={64} fill="none" style={{ color: 'rgba(123, 97, 255, 0.45)' }} />
              </div>
              <h3 className="empty-state-headline">Your Inbox</h3>
              <p className="empty-state-subtitle">Select an active chat from the sidebar to view your messages and send invites.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Chat;