import React from 'react';
import { useState } from 'react';
import './LandingPage.css';

const LandingPage = ({ onChatOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`landing-container ${isMenuOpen ? 'menu-open' : ''}`}>
      <nav className="landing-nav">
        <div className="logo">
          <span className="logo-text">Bank</span>
          <span className="logo-highlight">Assist</span>
          <div className="logo-blur"></div>
        </div>
        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <a href="#features">
            <span className="nav-icon">⚡</span>Features
          </a>
          <a href="#services">
            <span className="nav-icon">🔮</span>Services
          </a>
          <a href="#about">
            <span className="nav-icon">🌟</span>About
          </a>
          <button className="nav-button">Login</button>
        </div>
        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      <main className="hero-section">
        <div className="hero-background">
          <div className="gradient-sphere"></div>
          <div className="floating-particles"></div>
        </div>
        <h1>Banking Made Simple</h1>
        <p className="hero-subtitle">
          Experience the future of banking with AI-powered assistance
          <span className="gradient-text"> • Available 24/7 </span>
          <span className="gradient-text"> • Instant Solutions</span>
        </p>
        <button className="chat-button" onClick={onChatOpen}>
          <span className="button-icon">💬</span>
          Click here to chat with Banking Assistant
          <div className="button-glow"></div>
        </button>
        <div className="stats-container">
          <div className="stat-item">
            <span className="stat-number">2M+</span>
            <span className="stat-label">Active Users</span>
            <div className="stat-glow"></div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Support Available</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">99.9%</span>
            <span className="stat-label">Service Uptime</span>
          </div>
        </div>
      </main>

      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-container">
              <span className="feature-icon">🏦</span>
              <div className="icon-glow"></div>
            </div>
            <h3>Secure Banking</h3>
            <p>State-of-the-art security for your peace of mind</p>
            <div className="card-glow"></div>
          </div>
          <div className="feature-card">
            <span className="feature-icon">📱</span>
            <h3>Mobile Banking</h3>
            <p>Bank anywhere, anytime with our mobile solutions</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🤖</span>
            <h3>24/7 Support</h3>
            <p>AI-powered assistance always at your service</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage; 