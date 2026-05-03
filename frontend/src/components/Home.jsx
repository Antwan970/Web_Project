import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Home.css';

export default function Home() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="home-container">
      <section className="hero">
        <h1 className="hero-title">Ahlan beeko</h1>
        <p className="hero-subtitle">
          Connect with top tech freelancers or find your next dream project
        </p>

        {isAuthenticated ? (
          <div className="hero-buttons">
            <Link to="/jobs" className="btn btn-primary">
              Browse Jobs
            </Link>
            {user?.role === 'client' && (
              <Link to="/create-job" className="btn btn-secondary">
                Post a Job
              </Link>
            )}
          </div>
        ) : (
          <div className="hero-buttons">
            <Link to="/register" className="btn btn-primary">
              Get Started
            </Link>
            <Link to="/login" className="btn btn-secondary">
              Login
            </Link>
          </div>
        )}
      </section>

      <section className="features">
        <h2>Why Choose Tech Freelance Hub?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>📋 Easy Job Posting</h3>
            <p>Post your projects in minutes and get proposals from qualified freelancers</p>
          </div>
          <div className="feature-card">
            <h3>👨‍💻 Top Talent</h3>
            <p>Access a network of skilled tech professionals ready to work on your project</p>
          </div>
          <div className="feature-card">
            <h3>💰 Competitive Pricing</h3>
            <p>Fair rates and transparent pricing with no hidden fees</p>
          </div>
          <div className="feature-card">
            <h3>🔒 Secure Platform</h3>
            <p>Your data and payments are protected with industry-standard security</p>
          </div>
        </div>
      </section>
    </div>
  );
}
