
import React, { useState } from 'react';
import '../styles/Coaches.css';

function Coaches() {
  const coaches = [
    {
      id: 1,
      number: '01',
      title: 'Strength Coach',
      name: 'Rahul Kumar',
      category: 'STRENGTH',
      role: 'Strength Training Coach',
      description:
        'Builds muscle and power programs for beginners and lifters pushing past plateaus. Technique first, then load.',
      years: '8',
      clients: '1.2K',
      rating: '4.9',
      image: '/assets/coach-rahul.png',
    },
    {
      id: 2,
      number: '02',
      title: 'Muscle Building Coach',
      name: 'Aarav Sharma',
      category: 'MUSCLE',
      role: 'Hypertrophy Coach',
      description:
        'Builds lean mass with focused progressive overload and rep-based strength blocks for visible muscle growth.',
      years: '6',
      clients: '980',
      rating: '4.8',
      image: '/assets/coach-rahul.png',
    },
    {
      id: 3,
      number: '03',
      title: 'Functional Fitness Coach',
      name: 'Nisha Patel',
      category: 'FUNCTIONAL',
      role: 'Mobility & Conditioning Coach',
      description:
        'Focuses on endurance, agility, and full-body movement quality to improve daily strength and athletic performance.',
      years: '7',
      clients: '1.4K',
      rating: '4.9',
      image: '/assets/coach-rahul.png',
    },
    {
      id: 4,
      number: '04',
      title: 'Fitness and Nutrition',
      name: 'David Wilson',
      category: 'NUTRITION',
      role: 'Performance Nutrition Coach',
      description:
        'Creates tailored nutrition plans that align with your training goals, recovery, and long-term body composition.',
      years: '9',
      clients: '2.1K',
      rating: '5.0',
      image: '/assets/coach-rahul.png',
    },
  ];

  const [selectedCoachId, setSelectedCoachId] = useState(1);
  const selectedCoach = coaches.find((coach) => coach.id === selectedCoachId) || coaches[0];
  const sideCoaches = coaches.filter((coach) => coach.id !== selectedCoachId);

  return (
    <section className="coaches-section" id="coaches">

      <div className="coaches-container">

        <div className="coaches-heading">
          <p>Coaches</p>

          <h2>
            LEARN FROM THE <span>BEST</span>
          </h2>
        </div>

        <div className="coaches-layout">

          <div className="featured-coach">

            <div className="coach-image-wrapper">
              <img
                src={selectedCoach.image}
                alt={`${selectedCoach.name} - ${selectedCoach.role}`}
                className="coach-image"
              />
            </div>

            <div className="coach-details">

              <span className="coach-category">
                {selectedCoach.category}
              </span>

              <h3>{selectedCoach.name}</h3>

              <p className="coach-role">
                {selectedCoach.role}
              </p>

              <p className="coach-description">
                {selectedCoach.description}
              </p>

              <div className="coach-stats">

                <div className="coach-stat">
                  <h4>{selectedCoach.years}</h4>
                  <p>Years</p>
                </div>

                <div className="coach-stat">
                  <h4>{selectedCoach.clients}</h4>
                  <p>Clients</p>
                </div>

              </div>

              <div className="coach-rating">
                <span>★</span> {selectedCoach.rating} rating
              </div>

            </div>

          </div>

          {sideCoaches.map((coach) => (
            <div
              className={`other-coach-card ${selectedCoachId === coach.id ? 'active' : ''}`}
              key={coach.number}
            >

              <h3>{coach.number}</h3>

              <p>{coach.title}</p>

              <button
                className="coach-arrow"
                aria-label={`Explore ${coach.title}`}
                onClick={() => {
                  setSelectedCoachId(coach.id);
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
