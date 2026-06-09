import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  MapPin, 
  ChevronDown, 
  Edit2, 
  Save, 
  Settings, 
  LogOut, 
  Camera, 
  Check, 
  Eye, 
  EyeOff, 
  Sliders 
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

  // Sync back local state changes when profile loads (e.g. from localStorage updates)
  useEffect(() => {
    setNameInput(profile.name);
    setLocationInput(profile.location);
    setBioInput(profile.bio);
    setSelectedVibe(profile.activeVibe);
    setDistance(profile.distanceRange);
    setAgeMin(profile.ageMin);
    setAgeMax(profile.ageMax);
    setInvisible(profile.invisibleMode);
    setOnlineStatus(profile.showOnlineStatus);
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

    // Also update headers/sidebar globally if there is any shared context (e.g., active user state)
    // Send a storage event for active windows to pick up
    window.dispatchEvent(new Event('storage'));

    setTimeout(() => {
      setSaveSuccess(false);
    }, 1500);
  };

  const handleLogout = () => {
    // Navigate back to home landing page
    navigate('/');
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

      {/* 2. Main Profile Settings Card */}
      <div className={`profilepage-card ${saveSuccess ? 'save-success' : ''}`}>
        
        {/* Cover Section */}
        <div className="profile-cover-section">
          <div className="profile-cover-glow"></div>
          <span className="profile-cover-badge">Premium Profile</span>
        </div>

        {/* Identity & Avatar Section */}
        <div className="profile-identity-section">
          <div className="profile-picture-wrapper">
            <img src={profile.avatar} alt={profile.name} className="profile-large-img" />
            <div className="profile-camera-overlay" aria-label="Upload Photo">
              <Camera size={16} />
            </div>
          </div>
          <h2 className="profile-name-title">{profile.name}</h2>
          <span className="profile-handle-sub">{profile.username}</span>
        </div>

        {/* Profile Statistics Counter Row */}
        <div className="profile-stats-row">
          <div className="profile-stat-box">
            <span className="profile-stat-number">14</span>
            <span className="profile-stat-label">Matches</span>
          </div>
          <div className="profile-stat-box">
            <span className="profile-stat-number">128</span>
            <span className="profile-stat-label">Likes</span>
          </div>
          <div className="profile-stat-box">
            <span className="profile-stat-number">9</span>
            <span className="profile-stat-label">Vibes Shared</span>
          </div>
        </div>

        {/* Interactive Editors fields details */}
        <div className="profile-details-body">
          
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

      </div>

      {/* Logout Settings footer */}
      <div className="profile-actions-bottom">
        <button className="profile-logout-btn" onClick={handleLogout}>
          <LogOut size={16} /> Log Out Account
        </button>
      </div>

    </div>
  );
}

export default Profile;