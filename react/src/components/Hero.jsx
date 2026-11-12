
import React from 'react';
import '../styles/Hero.css';

function Hero() {
  return (
    <section className="hero-section" id="home">

      <div className="hero-container">

        {/* Left Content */}

        <div className="hero-content">

          <div className="hero-tag">
            <span className="tag-dot"></span>
            TRAIN SMARTER
          </div>

          <h1>
            STRONGER
            <span>EVERY DAY</span>
          </h1>

          <p className="hero-description">
            Personalized workouts, expert guidance, and
            <br />
            real results. All in one place.
          </p>

          <a href="#membership" className="hero-cta">
            <span>START YOUR JOURNEY</span>
            <span className="cta-arrow">➜</span>
          </a>

        </div>

        {/* Right Image */}

        <div className="hero-image-area">

          <div className="green-glow"></div>

          <div className="orbit orbit-one">
            <span className="orbit-dot dot-one"></span>
            <span className="orbit-dot dot-two"></span>
            <span className="orbit-dot dot-three"></span>
          </div>

          <div className="orbit orbit-two">
            <span className="orbit-dot dot-four"></span>
          </div>

          <img
            src="/assets/hero-athletes.png"
            alt="Fitness athletes"
            className="athlete-image"
          />

        </div>

      </div>

    </section>
  );
}

export default Hero;
