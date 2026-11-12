
import React from 'react';
import '../styles/Coaches.css';

function Coaches() {

  const otherCoaches = [
    {
      number: '02',
      title: 'Muscle Building Coach'
    },
    {
      number: '03',
      title: 'Functional Fitness Coach'
    },
    {
      number: '04',
      title: 'Fitness and Nutrition'
    }
  ];

  return (
    <section className="coaches-section" id="coaches">

      <div className="coaches-container">

        {/* Heading */}

        <div className="coaches-heading">
          <p>Coaches</p>

          <h2>
            LEARN FROM THE <span>BEST</span>
          </h2>
        </div>

        {/* Coach Cards */}

        <div className="coaches-layout">

          {/* Featured Coach */}

          <div className="featured-coach">

            <div className="coach-image-wrapper">
              <img
                src="/assets/coach-rahul.png"
                alt="Rahul Kumar - Strength Training Coach"
                className="coach-image"
              />
            </div>

            <div className="coach-details">

              <span className="coach-category">
                STRENGTH
              </span>

              <h3>Rahul Kumar</h3>

              <p className="coach-role">
                Strength Training Coach
              </p>

              <p className="coach-description">
                Builds muscle and power programs for beginners
                and lifters pushing past plateaus. Technique
                first, then load.
              </p>

              <div className="coach-stats">

                <div className="coach-stat">
                  <h4>8</h4>
                  <p>Years</p>
                </div>

                <div className="coach-stat">
                  <h4>1.2K</h4>
                  <p>Clients</p>
                </div>

              </div>

              <div className="coach-rating">
                <span>★</span> 4.9 rating
              </div>

            </div>

          </div>

          {/* Other Coaches */}

          {otherCoaches.map((coach) => (
            <div
              className="other-coach-card"
              key={coach.number}
            >

              <h3>{coach.number}</h3>

              <p>{coach.title}</p>

              <button
                className="coach-arrow"
                aria-label={`Explore ${coach.title}`}
                onClick={() => {
                  document.getElementById('membership')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>›</span>
              </button>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default Coaches;
