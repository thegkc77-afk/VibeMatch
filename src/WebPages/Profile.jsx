import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  ChevronDown, 
  Save, 
  Settings, 
  LogOut, 
  Camera, 
  Check,
  Grid,
  Users,
  UserCheck,
  UserMinus,
  Heart,
  MessageCircle,
  MessageSquare,
  X
} from 'lucide-react';
import '../WebStyle/Profile.css';

const DEFAULT_PROFILE = {
  name: 'Alex Rivera',
  username: '@rivera_vibe',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
  location: 'New York, NY',
  bio: 'Exploring the city & good vibes ✨',
  activeVibe: '😊 Fun',
  distanceRange: 25,
  ageMin: 22,
  ageMax: 30,
  invisibleMode: false,
  showOnlineStatus: true,
};

// Mock data representing the user's shared posts
const MOCK_POSTS = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&h=400&q=80',
    caption: 'Late night coding sessions & iced coffees at Koramangala ☕💻 VibeMatch is coming along nicely!',
    likes: 34,
    comments: [
      { id: 1, author: 'Aanya', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=50&h=50&q=80', text: 'Looks cozy! Love that spot.' },
      { id: 2, author: 'Rohan', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=50&h=50&q=80', text: 'Hit me up next time you work from there!' }
    ]
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=400&h=400&q=80',
    caption: 'Live acoustic gigs on rooftops. Bangalore winters are simply unmatched 🌌✨',
    likes: 56,
    comments: [
      { id: 1, author: 'Neha', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=50&h=50&q=80', text: 'Which place is this? The view is amazing!' },
      { id: 2, author: 'Alex Rivera', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=50&h=50&q=80', text: 'It is the Skydeck lounge! Really nice crowd.' }
    ]
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&h=400&q=80',
    caption: 'Rooftop Sunday brunch. Pancake towers and fresh strawberry compote 🥞🍓',
    likes: 42,
    comments: [
      { id: 1, author: 'Priya', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=50&h=50&q=80', text: 'Save a bite for me next time! 🤤' }
    ]
  }
];

// Mock data for mutual follows (Shared Vibes)
const MOCK_SHARED_VIBES = [
  {
    id: 'aanya',
    name: 'Aanya',
    username: '@aanya_vibe',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80',
    vibe: '😊 Fun',
    online: true
  },
  {
    id: 'neha',
    name: 'Neha',
    username: '@neha_vibe',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&h=100&q=80',
    vibe: '💖 Dating',
    online: true
  },
  {
    id: 'priya',
    name: 'Priya',
    username: '@priya_vibe',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=100&h=100&q=80',
    vibe: '😊 Fun',
    online: false
  }
];

// Mock data for users followed (Following)
const MOCK_FOLLOWING = [
  {
    id: 'rohan',
    name: 'Rohan',
    username: '@rohan_vibe',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80',
    vibe: '💬 Chat',
    online: true
  },
  {
    id: 'arjun',
    name: 'Arjun',
    username: '@arjun_deep',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80',
    vibe: '🌌 Deep',
    online: true
  },
  {
    id: 'vikram',
    name: 'Vikram',
    username: '@vikram_active',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100&q=80',
    vibe: '⚡ Active',
    online: false
  }
];

function Profile({ isSidebar, closeSidebar }) {
  const navigate = useNavigate();
  
  // Load profile state from localStorage or use default
  const [profile, setProfile] = useState(() => {
    const stored = localStorage.getItem('vibeMatch_activeUser');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Error parsing profile data', e);
      }
    }
    localStorage.setItem('vibeMatch_activeUser', JSON.stringify(DEFAULT_PROFILE));
    return DEFAULT_PROFILE;
  });

  // Track page states
  const [nameInput, setNameInput] = useState(profile.name);
  const [locationInput, setLocationInput] = useState(profile.location);
  const [bioInput, setBioInput] = useState(profile.bio);
  const [selectedVibe, setSelectedVibe] = useState(profile.activeVibe);
  
  const [distance, setDistance] = useState(profile.distanceRange);
  const [ageMin, setAgeMin] = useState(profile.ageMin);
  const [ageMax, setAgeMax] = useState(profile.ageMax);
  const [invisible, setInvisible] = useState(profile.invisibleMode);
  const [onlineStatus, setOnlineStatus] = useState(profile.showOnlineStatus);

  const [saveSuccess, setSaveSuccess] = useState(false);

  // Instagram-style Profile states
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [sharedVibes, setSharedVibes] = useState(MOCK_SHARED_VIBES);
  const [following, setFollowing] = useState(MOCK_FOLLOWING);
  const [activeTab, setActiveTab] = useState('posts'); // 'posts', 'shared_vibes', 'following'
  const [selectedPost, setSelectedPost] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  // Sync back local state changes when profile loads
  useEffect(() => {
    setAvatarError(false);
    setTimeout(() => {
      setNameInput(profile.name);
      setLocationInput(profile.location);
      setBioInput(profile.bio);
      setSelectedVibe(profile.activeVibe);
      setDistance(profile.distanceRange);
      setAgeMin(profile.ageMin);
      setAgeMax(profile.ageMax);
      setInvisible(profile.invisibleMode);
      setOnlineStatus(profile.showOnlineStatus);
    }, 0);
  }, [profile]);

  // Handle Save profile changes
  const handleSave = () => {
    const updatedProfile = {
      ...profile,
      name: nameInput,
      location: locationInput,
      bio: bioInput,
      activeVibe: selectedVibe,
      distanceRange: Number(distance),
      ageMin: Number(ageMin),
      ageMax: Number(ageMax),
      invisibleMode: invisible,
      showOnlineStatus: onlineStatus
    };

    localStorage.setItem('vibeMatch_activeUser', JSON.stringify(updatedProfile));
    setProfile(updatedProfile);
    setSaveSuccess(true);

    window.dispatchEvent(new Event('storage'));

    setTimeout(() => {
      setSaveSuccess(false);
      setIsEditing(false); // Auto-collapse editing drawer on save
    }, 1500);
  };

  const handleLogout = () => {
    navigate('/');
  };

  // Connection Interactions
  const handleUnfollow = (userId, userName) => {
    setFollowing(prev => prev.filter(u => u.id !== userId));
    setToastMessage(`Unfollowed ${userName}`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleMessage = (userId) => {
    navigate(`/chat?user=${userId}`);
  };

  // --- RENDER 1: MINI PROFILE FOOTER (SIDEBAR CONTEXT) ---
  if (isSidebar) {
    return (
      <div 
        className="sidebar-profile" 
        onClick={() => { navigate('/profile'); if (closeSidebar) closeSidebar(); }}
      >
        <div className="profile-card-left">
          <div className="profile-avatar-container">
            <img
              className="profile-avatar-img"
              src={profile.avatar}
              alt={profile.name}
            />
            {profile.showOnlineStatus && <span className="profile-online-badge"></span>}
          </div>
          <div className="profile-text-info">
            <h4>{profile.name}</h4>
            <p>{profile.username}</p>
          </div>
        </div>
        <Settings size={18} style={{ color: 'rgba(255, 255, 255, 0.4)' }} />
      </div>
    );
  }

  // --- RENDER 2: FULL SETTINGS DASHBOARD PAGE ---
  return (
    <div className="profilepage-container">
      {/* 1. Dashboard Header */}
      <header className="profilepage-header">
        <div className="location-selector" onClick={() => navigate('/nearby')}>
          <MapPin size={18} style={{ color: '#7b61ff' }} />
          <span className="location-text">{profile.location}</span>
          <ChevronDown size={14} />
        </div>
        <h2 className="profilepage-brand-title">VibeMatch</h2>
        <div style={{ width: '40px' }} /> {/* Spacing */}
      </header>

      {/* 2. Instagram-Style Profile Header */}
      <div className={`profile-instagram-header ${saveSuccess ? 'save-success' : ''}`}>
        
        {/* Left Column: Avatar & Camera Upload */}
        <div className="profile-avatar-column">
          <div className="profile-large-avatar-container">
            {!avatarError && profile.avatar ? (
              <img 
                src={profile.avatar} 
                alt={profile.name} 
                className="profile-large-img" 
                onError={() => setAvatarError(true)}
              />
            ) : (
              <div className="profile-large-avatar-fallback">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="avatar-fallback-icon">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
            )}
            <div className="profile-camera-overlay" aria-label="Upload Photo">
              <Camera size={16} />
            </div>
          </div>
        </div>

        {/* Right Column: Details, Stats, Bio */}
        <div className="profile-info-column">
          <div className="profile-info-username-row">
            <h2 className="profile-instagram-username">{profile.username}</h2>
            <button 
              className="profile-instagram-edit-btn"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Settings size={14} style={{ animation: isEditing ? 'spin 4s linear infinite' : 'none' }} /> 
              {isEditing ? 'Hide Settings' : 'Edit Settings'}
            </button>
          </div>

          <div className="profile-instagram-stats">
            <div 
              className="profile-instagram-stat-item" 
              onClick={() => { setActiveTab('posts'); setIsEditing(false); }} 
              style={{ cursor: 'pointer' }}
            >
              <span className="profile-instagram-stat-count">{posts.length}</span>
              posts
            </div>
            <div 
              className="profile-instagram-stat-item" 
              onClick={() => { setActiveTab('shared_vibes'); setIsEditing(false); }} 
              style={{ cursor: 'pointer' }}
            >
              <span className="profile-instagram-stat-count">{sharedVibes.length}</span>
              shared vibes
            </div>
            <div 
              className="profile-instagram-stat-item" 
              onClick={() => { setActiveTab('following'); setIsEditing(false); }} 
              style={{ cursor: 'pointer' }}
            >
              <span className="profile-instagram-stat-count">{following.length}</span>
              following
            </div>
          </div>

          <div className="profile-instagram-bio">
            <span className="profile-instagram-name">{profile.name}</span>
            {profile.bio && <p className="profile-instagram-bio-text">{profile.bio}</p>}
            <div className="profile-instagram-location">
              <MapPin size={12} />
              <span>{profile.location}</span>
            </div>
          </div>
        </div>

      </div>

        {/* Interactive Settings Editor (Collapsible) */}
        {isEditing && (
          <div className="profile-details-body settings-editor-panel">
            
            {/* Display Name */}
            <div className="form-group">
              <label className="form-label">Display Name</label>
              <input 
                type="text" 
                className="profile-input-field"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
              />
            </div>

            {/* Location details */}
            <div className="form-group">
              <label className="form-label">Location</label>
              <input 
                type="text" 
                className="profile-input-field"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
              />
            </div>

            {/* Bio Textarea */}
            <div className="form-group">
              <label className="form-label">Bio Description</label>
              <textarea 
                className="profile-input-field textarea"
                value={bioInput}
                onChange={(e) => setBioInput(e.target.value)}
              />
            </div>

            {/* Vibe selection grid */}
            <div className="form-group">
              <label className="form-label">Active Vibe Status</label>
              <div className="profile-vibe-selector-grid">
                {['😊 Fun', '🥱 Bored', '💬 Chat', '🌌 Deep', '💼 Networking', '🎨 Creative', '⚡ Active'].map(vibe => {
                  const isSelected = selectedVibe === vibe;
                  return (
                    <div 
                      key={vibe} 
                      className={`profile-vibe-tag ${isSelected ? 'selected' : ''}`}
                      onClick={() => setSelectedVibe(vibe)}
                    >
                      <span>{vibe}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sliders preference widget: Distance */}
            <div className="form-group">
              <div className="form-label-row">
                <label className="form-label">Maximum Distance Range</label>
                <span className="form-label-value">{distance} km</span>
              </div>
              <div className="range-slider-widget">
                <input 
                  type="range" 
                  min="5" 
                  max="100" 
                  value={distance} 
                  onChange={(e) => setDistance(e.target.value)} 
                  className="range-slider-control" 
                />
              </div>
            </div>

            {/* Sliders preference widget: Age Range */}
            <div className="form-group">
              <div className="form-label-row">
                <label className="form-label">Age Preference</label>
                <span className="form-label-value">{ageMin} - {ageMax} yrs</span>
              </div>
              <div className="form-group-row">
                <div className="flex-1" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="form-label" style={{ fontSize: '10px' }}>Min</span>
                  <input 
                    type="range" 
                    min="18" 
                    max="50" 
                    value={ageMin} 
                    onChange={(e) => setAgeMin(Math.min(e.target.value, ageMax))} 
                    className="range-slider-control" 
                  />
                </div>
                <div className="flex-1" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="form-label" style={{ fontSize: '10px' }}>Max</span>
                  <input 
                    type="range" 
                    min="18" 
                    max="50" 
                    value={ageMax} 
                    onChange={(e) => setAgeMax(Math.max(e.target.value, ageMin))} 
                    className="range-slider-control" 
                  />
                </div>
              </div>
            </div>

            {/* iOS Toggles switches */}
            <div className="profile-setting-toggle-row">
              <div className="setting-toggle-details">
                <span className="setting-toggle-title">Invisible Mode</span>
                <span className="setting-toggle-subtitle">Hide my profile from nearby radar listings</span>
              </div>
              <label className="switch-control-widget">
                <input 
                  type="checkbox" 
                  checked={invisible} 
                  onChange={(e) => setInvisible(e.target.checked)} 
                />
                <span className="switch-slider-element"></span>
              </label>
            </div>

            <div className="profile-setting-toggle-row">
              <div className="setting-toggle-details">
                <span className="setting-toggle-title">Show Online Status</span>
                <span className="setting-toggle-subtitle">Allow others to see if you are currently online</span>
              </div>
              <label className="switch-control-widget">
                <input 
                  type="checkbox" 
                  checked={onlineStatus} 
                  onChange={(e) => setOnlineStatus(e.target.checked)} 
                />
                <span className="switch-slider-element"></span>
              </label>
            </div>

            {/* Save Profile Submit CTA */}
            <button className="profile-save-btn" onClick={handleSave}>
              {saveSuccess ? (
                <>
                  <Check size={18} /> Profile Saved!
                </>
              ) : (
                <>
                  <Save size={18} /> Save Settings
                </>
              )}
            </button>

          </div>
        )}

      {/* Tab Headers Navigation (Collapses editor on click) */}
      {!isEditing && (
        <>
          <div className="profile-tabs-header">
            <button 
              className={`profile-tab-btn ${activeTab === 'posts' ? 'active' : ''}`}
              onClick={() => setActiveTab('posts')}
            >
              <Grid size={16} /> Posts
            </button>
            <button 
              className={`profile-tab-btn ${activeTab === 'shared_vibes' ? 'active' : ''}`}
              onClick={() => setActiveTab('shared_vibes')}
            >
              <Users size={16} /> Shared Vibes
            </button>
            <button 
              className={`profile-tab-btn ${activeTab === 'following' ? 'active' : ''}`}
              onClick={() => setActiveTab('following')}
            >
              <UserCheck size={16} /> Following
            </button>
          </div>

          {/* Tab Contents */}
          <div className="profile-tab-content">
            {activeTab === 'posts' && (
              <div className="posts-grid">
                {posts.length > 0 ? (
                  posts.map(post => (
                    <div key={post.id} className="post-grid-item" onClick={() => setSelectedPost(post)}>
                      <img src={post.image} alt={post.caption} className="post-grid-img" />
                      <div className="post-grid-overlay">
                        <div className="overlay-stat">
                          <Heart size={16} fill="#ffffff" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="overlay-stat comments">
                          <MessageCircle size={16} fill="#ffffff" />
                          <span>{post.comments.length}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="tab-empty-state">
                    <h3>No Posts Yet</h3>
                    <p>Share your first vibe post with the community!</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'shared_vibes' && (
              <div className="connections-list">
                {sharedVibes.length > 0 ? (
                  sharedVibes.map(v => (
                    <div key={v.id} className="connection-item">
                      <div className="connection-profile-info">
                        <div className="connection-avatar-container mutual">
                          <img src={v.avatar} alt={v.name} className="connection-avatar-img" />
                          {v.online && <span className="connection-online-dot"></span>}
                        </div>
                        <div className="connection-text-details">
                          <div className="connection-name-row">
                            <span className="connection-name">{v.name}</span>
                            <span className="connection-vibe-badge">Mutual</span>
                          </div>
                          <span className="connection-username">{v.username}</span>
                        </div>
                      </div>
                      <button 
                        className="connection-message-btn"
                        onClick={() => handleMessage(v.id)}
                      >
                        <MessageSquare size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                        Message
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="tab-empty-state">
                    <h3>No Shared Vibes</h3>
                    <p>Follow users and match with them to start sharing vibes!</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'following' && (
              <div className="connections-list">
                {following.length > 0 ? (
                  following.map(f => (
                    <div key={f.id} className="connection-item">
                      <div className="connection-profile-info">
                        <div className="connection-avatar-container">
                          <img src={f.avatar} alt={f.name} className="connection-avatar-img" />
                          {f.online && <span className="connection-online-dot"></span>}
                        </div>
                        <div className="connection-text-details">
                          <div className="connection-name-row">
                            <span className="connection-name">{f.name}</span>
                            <span className="connection-vibe-badge" style={{ background: 'rgba(255, 255, 255, 0.08)', color: 'rgba(255, 255, 255, 0.6)' }}>{f.vibe}</span>
                          </div>
                          <span className="connection-username">{f.username}</span>
                        </div>
                      </div>
                      <button 
                        className="connection-unfollow-btn"
                        onClick={() => handleUnfollow(f.id, f.name)}
                      >
                        Unfollow
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="tab-empty-state">
                    <h3>Not Following Anyone</h3>
                    <p>Explore profiles to follow people and share vibes!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}

      {/* Logout Settings footer */}
      <div className="profile-actions-bottom">
        <button className="profile-logout-btn" onClick={handleLogout}>
          <LogOut size={16} /> Log Out Account
        </button>
      </div>

      {/* Post Lightbox Modal */}
      {selectedPost && (
        <div className="post-lightbox-backdrop" onClick={() => setSelectedPost(null)}>
          <div className="post-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-image-side">
              <img src={selectedPost.image} alt="Post" className="lightbox-img" />
            </div>
            <div className="lightbox-details-side">
              <div className="lightbox-header">
                <div className="lightbox-user">
                  <img src={profile.avatar} alt={profile.name} className="lightbox-avatar" />
                  <div className="lightbox-user-info">
                    <span className="name">{profile.name}</span>
                    <span className="username">{profile.username}</span>
                  </div>
                </div>
                <button className="lightbox-close-btn" onClick={() => setSelectedPost(null)}>
                  <X size={18} />
                </button>
              </div>
              <div className="lightbox-caption-section">
                <p>{selectedPost.caption}</p>
              </div>
              <div className="lightbox-comments-title">Comments</div>
              <div className="lightbox-comments-list">
                {selectedPost.comments.map(c => (
                  <div key={c.id} className="lightbox-comment-item">
                    <img src={c.avatar} alt={c.author} className="lightbox-comment-avatar" />
                    <div className="lightbox-comment-text">
                      <strong>{c.author}</strong> {c.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className="lightbox-footer">
                <span className="lightbox-likes">
                  <Heart size={16} fill="#ec4899" /> {selectedPost.likes} Likes
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Action Toast Alert */}
      {toastMessage && (
        <div className="profile-toast">
          <UserMinus size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}

export default Profile;