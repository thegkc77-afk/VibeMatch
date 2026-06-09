import '../Style/hero.css'
import { LuZap, LuMapPin, LuMessageCircle, LuTarget } from "react-icons/lu";
import pokieImg from '../assets/pokie.png';


function Hero() {
  return (
    <section className="hero">

      {/* LEFT CONTENT */}
      <div className="hero-left">
        <h1>
          Meet Nearby <br />
          People Who <br />
          <span>Match Your Vibe</span>
        </h1>

        <p>
          Discover real connections based on mood, intent, and real-time<br />
          interaction — not endless swiping.
        </p>

        <div className="hero-buttons">
          <button className="start-btn">Get Started</button>
          <button className="explore-btn">Explore Nearby</button>
        </div>

        {/* React icon with features */}

        <div className="features">
          <div className="feature-item">
            <LuZap className="hero-feature-icon pink" />
            <span>Real-Time Matching</span>
          </div>

          <div className="feature-item">
            <LuMapPin className="hero-feature-icon purple" />
            <span>Nearby Discovery</span>
          </div>

          <div className="feature-item">
            <LuMessageCircle className="hero-feature-icon pink" />
            <span>Talk Instantly</span>
          </div>

          <div className="feature-item">
            <LuTarget className="hero-feature-icon purple" />
            <span>Mood Based</span>
          </div>
        </div>
      </div>

      {/* RIGHT CARD */}
      <div className="hero-right">
        <div className="card-outer-wrapper">
          {/* Floating Heart Badge */}
          <div className="floating-badge badge-heart">
            <svg viewBox="0 0 24 24" width="46" height="46" fill="url(#3d-heart-grad)" style={{ filter: 'drop-shadow(0 8px 16px rgba(168, 85, 247, 0.45))' }}>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              <defs>
                <radialGradient id="3d-heart-grad" cx="30%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#f472b6" />
                  <stop offset="40%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#701a75" />
                </radialGradient>
              </defs>
            </svg>
          </div>
          
          {/* Floating Lightning Badge (Pokie Bow) */}
          <div className="floating-badge badge-lightning">
            <img 
              src={pokieImg} 
              alt="Pokie Bow" 
              className="pokie-badge-img"
              style={{ 
                width: '46px', 
                height: '46px', 
                objectFit: 'contain',
                filter: 'drop-shadow(0 8px 16px rgba(244, 114, 182, 0.5))' 
              }} 
            />
          </div>

          {/* Floating Message Badge */}
          <div className="floating-badge badge-message">
            <svg viewBox="0 0 24 24" width="38" height="38" fill="url(#3d-message-grad)" style={{ filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.35))' }}>
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
              <defs>
                <radialGradient id="3d-message-grad" cx="30%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="50%" stopColor="#e2e8f0" />
                  <stop offset="100%" stopColor="#cbd5e1" />
                </radialGradient>
              </defs>
            </svg>
          </div>

          <div className="card-inner">
            {/* User Row 1 */}
            <div className="profile-row">
              <div className="profile-row-left">
                <div className="profile-avatar"></div>
                <div className="profile-info-skeleton">
                  <div className="skeleton-line skeleton-long"></div>
                  <div className="skeleton-line skeleton-short"></div>
                </div>
              </div>
              <div className="profile-status-dot"></div>
            </div>

            {/* User Row 2 */}
            <div className="profile-row">
              <div className="profile-row-left">
                <div className="profile-avatar"></div>
                <div className="profile-info-skeleton">
                  <div className="skeleton-line skeleton-long"></div>
                  <div className="skeleton-line skeleton-short"></div>
                </div>
              </div>
              <div className="profile-status-dot"></div>
            </div>

            {/* User Row 3 */}
            <div className="profile-row">
              <div className="profile-row-left">
                <div className="profile-avatar"></div>
                <div className="profile-info-skeleton">
                  <div className="skeleton-line skeleton-long"></div>
                  <div className="skeleton-line skeleton-short"></div>
                </div>
              </div>
              <div className="profile-status-dot"></div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

export default Hero;