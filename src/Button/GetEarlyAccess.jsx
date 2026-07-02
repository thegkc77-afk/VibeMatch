import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import Navbar from '../Component/Navbar';
import Logo from '../Component/Logo';
import '../Style/getearlyaccess.css';

function GetEarlyAccess() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(isSignUp ? `Successfully signed up as ${name || email}!` : `Successfully logged in as ${email}!`);
    navigate('/explore');
  };

  return (
    <div className="getearlyaccess-overlay">
      {/* Backdrop */}
      {/* <div className="getearlyaccess-backdrop" onClick={handleClose} /> */}

      {/* Page Content */}
      <div className="getearlyaccess-page">
        {/* Background Effects */}
        <div className="bg-glow-container">
          <div className="bg-glow-blob bg-glow-1"></div>
          <div className="bg-glow-blob bg-glow-2"></div>
        </div>

        {/* Navbar */}
        <Navbar forceShow={true} />

        {/* Main Content Area */}
        <main className="main-content-area">
          <div className="grid-container">

            {/* LEFT SECTION - Branding (Hidden on mobile) */}
            <div className="brand-column">
              <div className="brand-title-row">
                <Logo size={48} showText={true} animated={true} />
              </div>
              <p className="tagline">Hyperlocal vibes for the next generation.</p>

              {/* Floating Cards Scene */}
              <div className="floating-cards-scene">
                {/* Floating Card 1 */}
                <div className="f-card f-card-1">
                  <div className="f-card-overlay"></div>
                  <div className="f-card-label">
                    <p>Techno Nights</p>
                  </div>
                </div>

                {/* Floating Card 2 */}
                <div className="f-card f-card-2">
                  <div className="f-card-overlay"></div>
                  <div className="f-card-label">
                    <p>Neon Night Bites</p>
                  </div>
                </div>

                {/* Mini Profile Card */}
                <div className="floating-profile-card">
                  <div className="profile-card-header">
                    <div className="profile-avatar"></div>
                    <div className="profile-info">
                      <h4>New Vibe Near You</h4>
                      <p>98% Match</p>
                    </div>
                  </div>
                  <p className="profile-quote">
                    "Looking for someone to explore the hidden rooftop jazz scene tonight."
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT SECTION - Auth Form */}
            <div className="auth-form-column">
              <div className="auth-glass-card">
                {/* Header */}
                <div className="auth-card-header">
                  <h2>{isSignUp ? 'Get Early Access' : 'Welcome Back'}</h2>
                  <p>{isSignUp ? 'Be the first to know when we launch.' : 'Find your vibe, meet your tribe.'}</p>
                </div>

                {/* Tabs */}
                <div className="auth-tabs">
                  <button
                    type="button"
                    className={`auth-tab ${!isSignUp ? 'active' : ''}`}
                    onClick={() => setIsSignUp(false)}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    className={`auth-tab ${isSignUp ? 'active' : ''}`}
                    onClick={() => setIsSignUp(true)}
                  >
                    Sign Up
                  </button>
                </div>

                {/* Form */}
                <form className="auth-inputs-stack" onSubmit={handleSubmit}>
                  {/* Name Input (Only on Sign Up) */}
                  {isSignUp && (
                    <div className="input-container">
                      <User className="input-icon" size={20} />
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="auth-field"
                        required
                      />
                    </div>
                  )}

                  {/* Email Input */}
                  <div className="input-container">
                    <Mail className="input-icon" size={20} />
                    <input
                      type="email"
                      placeholder="hello@vibematch.social"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="auth-field"
                      required
                    />
                  </div>

                  {/* Password Input */}
                  <div className="input-container">
                    <Lock className="input-icon" size={20} />
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="auth-field"
                      required
                    />
                  </div>

                  {/* Forgot Password (Only on Login) */}
                  {!isSignUp && (
                    <div className="forgot-password-row">
                      <button type="button" className="forgot-btn">
                        Forgot password?
                      </button>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button type="submit" className="submit-auth-btn">
                    {isSignUp ? 'Create Account' : 'Sigin to Vibe'}
                  </button>

                  {/* Divider */}
                  <div className="or-divider">
                    <div className="divider-line"></div>
                    <span>OR CONTINUE WITH</span>
                    <div className="divider-line"></div>
                  </div>

                  {/* Social Logins */}
                  <div className="social-login-grid">
                    <button type="button" className="social-auth-btn">
                      Google
                    </button>
                    <button type="button" className="social-auth-btn">
                      Apple
                    </button>
                  </div>

                  {/* Toggle Link */}
                  <div className="card-swap-footer">
                    <p>
                      {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                      <button
                        type="button"
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="swap-auth-link"
                      >
                        {isSignUp ? 'Signin' : 'Sign Up'}
                      </button>
                    </p>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default GetEarlyAccess;
