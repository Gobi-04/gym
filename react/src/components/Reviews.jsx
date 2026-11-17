
import React from 'react';
import '../styles/Reviews.css';

function Reviews() {

  const reviews = [
    {
      id: 1,
      name: 'Madhu',
      image: 'src/assets/Madhu.png',
      message:
        'The gym is very clean and neat. their equipment were excellent and well maintained.The trainers are very supportive and good motivator'
    },
    {
      id: 2,
      name: 'Suresh',
      image: 'src/assets/Suresh.png',
      message:
        'Excellent gym to do exercise, caring and more encouraging.'
    },
    {
      id: 3,
      name: 'Nithya',
      image: 'src/assets/Nithya.png',
      message:
        'Highly recommend for really need a person to have a body fit.'
    }
  ];

  return (
    <section className="reviews-section" id="reviews">

      <div className="reviews-container">

        <div className="reviews-heading">
          <p>Public Reviews</p>

          <h2>
            REAL <span>MEMBERS</span> REAL <span>RESULTS</span>
          </h2>
        </div>

        <div className="reviews-grid">

          {reviews.map((review) => (

            <div className="review-card" key={review.id}>

              <div className="review-user">

                <img
                  src={review.image}
                  alt={review.name}
                />

                <h3>{review.name}</h3>

              </div>

              <div className="review-stars">
                ★ ★ ★ ★ ★
              </div>

              <p className="review-message">
                {review.message}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Reviews;
