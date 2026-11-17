
import React, { useState } from 'react';
import { api } from '../services/api';
import {
  UserRound,
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  Clock
} from 'lucide-react';

import '../styles/Contact.css';

function Contact() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    setSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.submitContact(formData);
    } catch (err) {
      console.warn('Backend not reachable, inquiry logged locally:', err.message);
    }

    setSubmitted(true);

    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  return (
    <section className="contact-section" id="contact">

      <div className="contact-overlay">

        <div className="contact-container">

          {/* Heading */}

          <div className="contact-heading">
            <p>Contact</p>

            <h2>
              Our team is ready to assist you on your fitness journey.
            </h2>
          </div>

          <div className="contact-content">

            {/* Contact Form */}

            <form
              className="contact-form"
              onSubmit={handleSubmit}
            >

              <div className="form-group">

                <label>
                  <UserRound size={15} />
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="form-group">

                <label>
                  <Mail size={15} />
                  Email ID
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="form-group">

                <label>
                  <Phone size={15} />
                  Contact
                </label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="form-group">

                <label>
                  <MessageSquare size={15} />
                  Message
                </label>

                <textarea
                  name="message"
                  placeholder="Write your message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />

              </div>

              <button type="submit" className="contact-submit">
                SUBMIT
              </button>

              {submitted && (
                <p className="success-message">
                  Your form is validated successfully.
                  Backend submission is not connected yet.
                </p>
              )}

            </form>

            {/* Contact Information */}

            <div className="contact-info">

              <div className="contact-info-item">
                <Phone />
                <p>9704569872</p>
              </div>

              <div className="contact-info-item">
                <Mail />
                <p>fitguide987@gmail.com</p>
              </div>

              <div className="contact-info-item">
                <MapPin />
                <p>
                  TVK Nagar,Gandhipuram
                  <br />
                  Chennai - 600 040
                </p>
              </div>

              <div className="contact-info-item hours-item">
                <Clock />

                <div className="opening-hours">

                  <div>
                    <span>Monday - Saturday</span>
                    <span>5:00 AM – 09:00 PM</span>
                  </div>

                  <div>
                    <span>Sunday</span>
                    <span>5:00 AM – 12:00 PM</span>
                  </div>

                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Contact;
