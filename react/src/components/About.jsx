
import React from 'react';
import '../styles/About.css';

function About() {
  const features = [
    {
      number: '01',
      title: 'A plan built for you',
      description:
        'No generic programs. Your workouts and diet adapt to your goal, schedule and fitness level.'
    },
    {
      number: '02',
      title: 'Coaches who stay with you',
      description:
        'Certified trainers check your form, adjust your plan and keep you moving forward.'
    },
    {
      number: '03',
      title: 'Progress you can see',
      description:
        'Track every workout, meal and milestone so consistency turns into results you can measure.'
    }
  ];

  return (
    <section className="about-section" id="about">

      <div className="about-container">

        {/* Section Label */}
        <h2 className="about-label">ABOUT</h2>

        {/* Main About Content */}
        <div className="about-main">

          {/* Left Image */}
          <div className="about-image-wrapper">
            <img
              src="/assets/about-dumbbell.png"
              alt="Athlete lifting a dumbbell"
              className="about-dumbbell-image"
            />
          </div>

          {/* Right Content */}
          <div className="about-details">

            <h2 className="about-heading">
              Train with purpose
              <br />
              Live with <span>power</span>
            </h2>

            <p className="about-intro">
              Most people don't fail at fitness. They fail at
              figuring out what to do next.
            </p>

            <p className="about-description">
              FitGuide gives every member a clear plan from day one.
              Certified coaches design your workouts and meals
              around your goal, your level and your week, so every
              session has a reason and every week shows progress.
            </p>

            <a href="#membership" className="about-button">
              <span>View Membership</span>
              <span className="about-button-arrow">➜</span>
            </a>

          </div>

        </div>

        {/* Three Feature Columns */}
        <div className="about-features">

          {features.map((feature) => (
            <div className="feature-card" key={feature.number}>

              <div className="feature-line">
                <span></span>
              </div>

              <h3 className="feature-number">
                {feature.number}
              </h3>

              <h4 className="feature-title">
                {feature.title}
              </h4>

              <p className="feature-description">
                {feature.description}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default About;
