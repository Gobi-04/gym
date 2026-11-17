import React, { useState, useRef, useEffect } from 'react';
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
      image: 'src/assets/Trainer1.png',
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
      image: 'src/assets/Trainer2.png',
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
      image: 'src/assets/Trainer4.png',
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
      image: 'src/assets/Trainer3.png',
    },
  ];

  const [selectedCoachId, setSelectedCoachId] = useState(1);

  // Hover la expand: cursor card mela vandha 120ms apram expand aagum.
  // Idhu animation nadakkum pothu cards flicker aagaama thadukkum.
  const hoverTimer = useRef(null);

  const handleHover = (id) => {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setSelectedCoachId(id), 120);
  };

  const cancelHover = () => clearTimeout(hoverTimer.current);

  useEffect(() => () => clearTimeout(hoverTimer.current), []);

  // Selected card = wide (2.2fr), matha ellam = narrow (0.42fr).
  // Order 01, 02, 03, 04 appadiye irukkum, so card adhe edathula expand aagum.
  const gridColumns = coaches
    .map((coach) => (coach.id === selectedCoachId ? '2.2fr' : '0.42fr'))
    .join(' ');

  return (
    <section className="coaches-section" id="coaches">
      <div className="coaches-container">
        <div className="coaches-heading">
          <p>Coaches</p>

          <h2>
            LEARN FROM THE <span>BEST</span>
          </h2>
        </div>

        <div
          className="coaches-layout"
          style={{ gridTemplateColumns: gridColumns }}
        >
          {coaches.map((coach) =>
            coach.id === selectedCoachId ? (
              /* EXPANDED CARD */
              <div className="featured-coach" key={coach.id}>
                <div className="coach-image-wrapper">
                  <img
                    src={coach.image}
                    alt={`${coach.name} - ${coach.role}`}
                    className="coach-image"
                  />
                </div>

                <div className="coach-details">
                  <span className="coach-category">{coach.category}</span>

                  <h3>{coach.name}</h3>

                  <p className="coach-role">{coach.role}</p>

                  <p className="coach-description">{coach.description}</p>

                  <div className="coach-stats">
                    <div className="coach-stat">
                      <h4>{coach.years}</h4>
                      <p>Years</p>
                    </div>

                    <div className="coach-stat">
                      <h4>{coach.clients}</h4>
                      <p>Clients</p>
                    </div>
                  </div>

                  <div className="coach-rating">
                    <span>★</span> {coach.rating} rating
                  </div>
                </div>
              </div>
            ) : (
              /* SMALL COLUMN CARD */
              <div
                className="other-coach-card"
                key={coach.id}
                onMouseEnter={() => handleHover(coach.id)}
                onMouseLeave={cancelHover}
                onClick={() => setSelectedCoachId(coach.id)}
              >
                <h3>{coach.number}</h3>

                <p>{coach.title}</p>

                <button
                  type="button"
                  className="coach-arrow"
                  aria-label={`Show ${coach.name}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedCoachId(coach.id);
                  }}
                >
                  <span>›</span>
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}

export default Coaches;