import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, 
  Heart, 
  MapPin, 
  Calendar, 
  Check, 
  X, 
  MessageCircle, 
  Trash2,
  ChevronDown,
  UserCheck
} from 'lucide-react';
import { ACTIVE_USER } from '../data/mockData';
import '../WebStyle/notification.css';

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    type: 'matches',
    text: '<strong>Priya</strong> matched with you! You both share a love for active music vibes.',
    time: '10m ago',
    unread: true,
    user: {
      id: 'priya',
      name: 'Priya',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&h=200&q=80'
    }
  },
  {
    id: 2,
    type: 'likes',
    text: '<strong>Aanya</strong> liked your vibe status <em>"Anyone up for coffee? ☕"</em>.',
    time: '45m ago',
    unread: true,
    user: {
      id: 'aanya',
      name: 'Aanya',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80'
    }
  },
  {
    id: 3,
    type: 'invitations',
    text: '<strong>Arjun</strong> sent you a meetup invitation to check out <strong>Third Wave Coffee</strong>.',
    time: '2h ago',
    unread: false,
    user: {
      id: 'arjun',
      name: 'Arjun',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80'
    },
    inviteDetails: '📍 Third Wave Coffee • Sat, 25 May at 5:00 PM',
    inviteStatus: 'pending' // 'pending' | 'accepted' | 'declined'
  },
  {
    id: 4,
    type: 'likes',
    text: '<strong>Rohan</strong> liked your profile photo.',
    time: '1d ago',
    unread: false,
    user: {
      id: 'rohan',
      name: 'Rohan',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80'
    }
  }
];

function Notification() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'matches' | 'likes' | 'invitations'

  // Mark all notifications as read
  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  // Clear single notification card
  const handleClearSingle = (id, e) => {
    e.stopPropagation();
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Clear all notifications list
  const handleClearAll = () => {
    setNotifications([]);
  };

  // Accept Invite handler
  const handleAcceptInvite = (id) => {
    setNotifications(prev => prev.map(n => {
      if (n.id === id) {
        return { ...n, inviteStatus: 'accepted' };
      }
      return n;
    }));
  };

  // Decline Invite handler
  const handleDeclineInvite = (id) => {
    setNotifications(prev => prev.map(n => {
      if (n.id === id) {
        return { ...n, inviteStatus: 'declined' };
      }
      return n;
    }));
  };

  // Start chat redirect
  const handleStartChat = (userId) => {
    navigate('/chat', { state: { openChatWith: userId } });
  };

  // Filter list items based on activeTab
  const filteredNotifications = notifications.filter(n => {
    if (activeTab === 'all') return true;
    return n.type === activeTab;
  });

  // Badge icon selector helper
  const getBadgeIcon = (type) => {
    switch (type) {
      case 'likes':
        return <Heart size={10} fill="currentColor" />;
      case 'matches':
        return <UserCheck size={10} />;
      case 'invitations':
        return <Calendar size={10} />;
      default:
        return <Bell size={10} />;
    }
  };

  return (
    <div className="notify-container">
      {/* 1. Dashboard Header */}
      <header className="notify-header">
        <div className="location-selector" onClick={() => navigate('/nearby')}>
          <MapPin size={18} style={{ color: '#7b61ff' }} />
          <span className="location-text">{ACTIVE_USER.location}</span>
          <ChevronDown size={14} />
        </div>
        <h2 className="notify-brand-title">VibeMatch</h2>
        <img 
          src={ACTIVE_USER.avatar} 
          alt="Logged in user profile" 
          className="header-profile-avatar" 
          onClick={() => navigate('/profile')}
        />
      </header>

      {/* 2. Headline Control panel */}
      <div className="notify-controls-row">
        <h2 className="notify-title-text">Notifications</h2>
        {notifications.length > 0 && (
          <div className="notify-actions-links">
            <button className="notify-link-btn" onClick={handleMarkAllRead}>
              <Check size={14} /> Mark all read
            </button>
            <button className="notify-link-btn clear" onClick={handleClearAll}>
              <Trash2 size={14} /> Clear all
            </button>
          </div>
        )}
      </div>

      {/* 3. Category Filter Tabs */}
      <div className="notify-tabs-bar">
        {[
          { id: 'all', label: 'All' },
          { id: 'matches', label: 'Matches' },
          { id: 'likes', label: 'Likes' },
          { id: 'invitations', label: 'Meetups' }
        ].map(tab => (
          <button 
            key={tab.id}
            className={`notify-tab-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 4. Display Cards List */}
      {filteredNotifications.length > 0 ? (
        <div className="notify-list">
          {filteredNotifications.map((notif) => (
            <div 
              key={notif.id} 
              className={`notify-card ${notif.unread ? 'unread' : ''}`}
            >
              {/* User Avatar & Category Badge */}
              <div className="notify-avatar-block">
                <img src={notif.user.avatar} alt={notif.user.name} className="notify-avatar-img" />
                <span className={`notify-badge-icon ${notif.type}`}>
                  {getBadgeIcon(notif.type)}
                </span>
              </div>

              {/* Notification Description */}
              <div className="notify-info-block">
                <p 
                  className="notify-message-text"
                  dangerouslySetInnerHTML={{ __html: notif.text }}
                />
                
                {/* Invite details info */}
                {notif.type === 'invitations' && (
                  <div className="notify-context-snippet">
                    {notif.inviteDetails}
                  </div>
                )}

                {/* Actions row based on Type */}
                {notif.type === 'matches' && (
                  <div className="notify-actions-row">
                    <button 
                      className="notify-action-btn chat"
                      onClick={() => handleStartChat(notif.user.id)}
                    >
                      <MessageCircle size={14} /> Start Chat
                    </button>
                  </div>
                )}

                {notif.type === 'invitations' && notif.inviteStatus === 'pending' && (
                  <div className="notify-actions-row">
                    <button 
                      className="notify-action-btn accept"
                      onClick={() => handleAcceptInvite(notif.id)}
                    >
                      <Check size={14} /> Accept
                    </button>
                    <button 
                      className="notify-action-btn decline"
                      onClick={() => handleDeclineInvite(notif.id)}
                    >
                      <X size={14} /> Decline
                    </button>
                  </div>
                )}

                {notif.type === 'invitations' && notif.inviteStatus === 'accepted' && (
                  <span className="notify-action-success-text">
                    <Check size={15} /> Invitation Accepted
                  </span>
                )}

                {notif.type === 'invitations' && notif.inviteStatus === 'declined' && (
                  <span className="notify-action-success-text" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
                    <X size={15} /> Invitation Declined
                  </span>
                )}

                <span className="notify-time-text">{notif.time}</span>
              </div>

              {/* Dismiss / Close Badge */}
              <div className="notify-dismiss-block">
                <button 
                  className="notify-close-btn" 
                  onClick={(e) => handleClearSingle(notif.id, e)}
                  aria-label="Dismiss notification"
                >
                  <X size={14} />
                </button>
                {notif.unread && <div className="notify-unread-dot" />}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="notify-empty-state">
          <div className="notify-empty-glow"></div>
          <div className="notify-empty-icon-circle">
            <Bell size={48} style={{ color: 'rgba(123, 97, 255, 0.45)' }} />
          </div>
          <h3 className="notify-empty-headline">No notifications yet</h3>
          <p className="notify-empty-subtitle">
            {activeTab === 'all' 
              ? "We'll let you know when someone matches with you, likes your status, or plans a meetup!"
              : `You don't have any notifications under "${activeTab}" category yet.`
            }
          </p>
        </div>
      )}
    </div>
  );
}

export default Notification;