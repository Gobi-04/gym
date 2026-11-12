
import React from 'react';
import {
  UsersRound,
  Camera,
  CirclePlay,
  MessageCircle,
  MapPin,
  Clock,
  Phone,
  Mail
} from 'lucide-react';

import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer-section">

      <div className="footer-container">

        <div className="footer-content">

          {/* Brand Column */}

          <div className="footer-brand">

            <a href="#home" className="footer-logo">
              <span>FIT</span>
              <strong>GUIDE</strong>
            </a>

            <p className="footer-description">
              Personal Gym Guidance Platform. Built to eliminate
              workout dependency, giving members structured weekly
              training schedules, crystal-clear exercise demonstrations,
              and calibrated nutrition plans.
            </p>

            <h4>
              STRONGER EVERY DAY. TRAIN SMARTER. LIVE BETTER.
            </h4>

            <div className="social-links">

              <a href="#facebook" aria-label="Facebook">
                <UsersRound />
              </a>

              <a href="#instagram" aria-label="Instagram">
                <Camera />
              </a>

              <a href="#whatsapp" aria-label="WhatsApp">
                <MessageCircle />
              </a>

              <a href="#youtube" aria-label="YouTube">
                <CirclePlay />
              </a>

            </div>

          </div>

          {/* Explore Column */}

          <div className="footer-explore">

            <h3>EXPLORE</h3>

            <a href="#home">HOME</a>
            <a href="#about">ABOUT</a>
            <a href="#membership">MEMBERSHIP</a>
            <a href="#contact">CONTACT</a>

          </div>

          {/* Location Column */}

          <div className="footer-location">

            <h3>GYM LOCATION & HOURS</h3>

            <div className="footer-info">
              <MapPin />
              <p>
                TVK Nagar,Gandhipuram
                <br />
                Chennai - 600 040
              </p>
            </div>

            <div className="footer-info">
              <Clock />
              <p>
                Monday - Saturday
                <span>5:00 AM – 09:00 PM</span>
                <br />
                Sunday
                <span>5:00 AM – 12:00 PM</span>
              </p>
            </div>

            <div className="footer-info">
              <Phone />
              <p>9704569872</p>
            </div>

            <div className="footer-info">
              <Mail />
              <p>fitguide987@gmail.com</p>
            </div>

          </div>

        </div>

        {/* Bottom Footer */}

        <div className="footer-bottom">

          <p>
            © 2026 Evolutions Fitness Club. All rights reserved.
          </p>

          <div className="footer-legal">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Use</a>
          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;
