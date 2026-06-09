import React from 'react';
import '../Style/logo.css';

function Logo({ size = 32, showText = true, animated = true, className = '' }) {
  // SVG viewport dimensions are 100x100.
  // We scale the SVG using the size prop.
  return (
    <div className={`vibematch-logo-container ${className}`}>
      <div 
        className="vibematch-logo-mark"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <svg 
          viewBox="0 0 100 100" 
          width="100%" 
          height="100%" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Main logo gradient: Purple to Pink */}
            <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" className="logo-grad-start" />
              <stop offset="100%" className="logo-grad-end" />
            </linearGradient>
            
            {/* Glow gradient */}
            <linearGradient id="logo-glow" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" className="logo-glow-start" />
              <stop offset="100%" className="logo-glow-end" />
            </linearGradient>
            
            {/* Drop shadow filter */}
            <filter id="logo-shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Group container with float animation */}
          <g className={animated ? 'vibematch-logo-pin' : ''}>
            {/* Redesigned Outer Heart-Pin Border */}
            <path 
              d="M50,90 C30,72 12,50 12,32 C12,16 28,8 50,26 C72,8 88,16 88,32 C88,50 70,72 50,90 Z" 
              stroke="url(#logo-grad)" 
              strokeWidth="6.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              filter="url(#logo-shadow)"
            />

            {/* Inner Pulsing Heart Core */}
            <path 
              className={animated ? 'vibematch-logo-heart' : ''} 
              d="M50,60 C43,53 35,43 35,34 C35,27 40,22 50,30 C60,22 65,27 65,34 C65,43 57,53 50,60 Z" 
              fill="url(#logo-grad)" 
            />

            {/* Sound Wave / Vibe Equalizer Bars (Left) */}
            <rect 
              className={animated ? 'vibematch-logo-wave wave-1' : ''} 
              x="25" 
              y="28" 
              width="4.5" 
              height="16" 
              rx="2.25" 
              fill="url(#logo-grad)" 
              opacity="0.8" 
            />
            <rect 
              className={animated ? 'vibematch-logo-wave wave-2' : ''} 
              x="17" 
              y="32" 
              width="4.5" 
              height="8" 
              rx="2.25" 
              fill="url(#logo-grad)" 
              opacity="0.5" 
            />

            {/* Sound Wave / Vibe Equalizer Bars (Right) */}
            <rect 
              className={animated ? 'vibematch-logo-wave wave-1' : ''} 
              x="70.5" 
              y="28" 
              width="4.5" 
              height="16" 
              rx="2.25" 
              fill="url(#logo-grad)" 
              opacity="0.8" 
            />
            <rect 
              className={animated ? 'vibematch-logo-wave wave-2' : ''} 
              x="78.5" 
              y="32" 
              width="4.5" 
              height="8" 
              rx="2.25" 
              fill="url(#logo-grad)" 
              opacity="0.5" 
            />
          </g>
        </svg>
      </div>

      {showText && (
        <span 
          className="vibematch-logo-text"
          style={{ fontSize: `${size * 0.72}px` }}
        >
          <span className="logo-text-vibe">Vibe</span>
          <span className="logo-text-match">Match</span>
        </span>
      )}
    </div>
  );
}

export default Logo;
