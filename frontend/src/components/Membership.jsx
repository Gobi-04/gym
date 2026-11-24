
import React from 'react';
import '../styles/Membership.css';

function Membership() {

  const plans = [
    {
      id: 1,
      name: '1 Month',
      description: 'Try FITGUIDE with no long commitment',
      price: '₹1,499',
      monthly: '₹1,499 / month',
      badge: 'Flexible start',
      benefits: [
        'Full gym floor access',
        'Workout library',
        'Locker room access',
        'Member app access'
      ],
      button: 'Join for 1 month'
    },
    {
      id: 2,
      name: '3 Months',
      description: 'A full quarter to build the habit.',
      price: '₹3,999',
      monthly: '₹1,333 / month',
      badge: 'Save 11%',
      benefits: [
        'Everything in 1 Month',
        '1 coach session included',
        '7 days membership freeze'
      ],
      button: 'Join for 3 month'
    },
    {
      id: 3,
      name: '6 Months',
      description: 'Guided training for real change',
      price: '₹6,999',
      monthly: '₹1,167 / month',
      badge: 'Save 22%',
      benefits: [
        'Everything in 3 Months',
        'Personalized workout plan',
        'Monthly coach check-in',
        '15 days membership freeze'
      ],
      button: 'Join for 6 month'
    },
    {
      id: 4,
      name: '1 Year',
      description: 'Our lowest monthly rate, fully coached.',
      price: '₹11,999',
      monthly: '₹1,000 / month',
      badge: 'Save 33%',
      benefits: [
        'Everything in 6 Months',
        'Nutrition guidance',
        'Priority class booking',
        'Free body assessment',
        '30 days membership freeze'
      ],
      button: 'Join for 1 year'
    }
  ];

  const handleJoin = (plan) => {
    alert(`You selected the ${plan.name} membership plan!`);
  };

  return (
    <section className="membership-section" id="membership">

      <div className="membership-container">

        {/* Section Heading */}

        <div className="membership-heading">

          <p>MEMBERSHIP</p>

          <h2>
            TRANSPARENT <span>PRICING</span> & <span>PLANS</span>
          </h2>

        </div>

        {/* Pricing Cards */}

        <div className="pricing-grid">

          {plans.map((plan) => (

            <div className="pricing-card" key={plan.id}>

              <div className="plan-top">

                <h3>{plan.name}</h3>

                <p className="plan-description">
                  {plan.description}
                </p>

              </div>

              <div className="plan-price">

                <h2>{plan.price}</h2>

                <p>{plan.monthly}</p>

                <span className="plan-badge">
                  {plan.badge}
                </span>

              </div>

              <div className="plan-benefits">

                {plan.benefits.map((benefit, index) => (

                  <div className="benefit-item" key={index}>

                    <span className="benefit-check">✓</span>

                    <p>{benefit}</p>

                  </div>

                ))}

              </div>

              <button
                className="plan-button"
                onClick={() => handleJoin(plan)}
              >
                {plan.button}
              </button>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Membership;
