import React from 'react';
import './aboutt.css';

const About = () => {
  return (
    <div className="hii about" style={{ display: 'grid', gridTemplate: '' }}>
      <div className="heading" style={{ gridArea: '1/1/2/3' }}>
        <h2>ABOUT Homely</h2>
      </div>
      <div style={{ gridArea: '2/1/3/2' }}>
        <h3>Our Mission</h3>
        <p>
          At Homely, our mission is to provide exceptional real estate management services that maximize property value,
          enhance tenant satisfaction, and ensure seamless and efficient property operations. We are committed to
          delivering tailored solutions that meet the unique needs of each client and property.
        </p>
      </div>
      <div style={{ gridArea: '2/2/3/3' }}>
        <h3 style={{ paddingLeft: '37px' }}>History</h3>
        <p>
          Founded in 2024, Homely has grown from a small local property management firm into a leading provider of
          comprehensive real estate management services. It's our new project, we have built a reputation for excellence,
          reliability, and professionalism in the industry.
        </p>
      </div>
      <div style={{ gridArea: '3/1/4/3' }}>
        <h3>Our Values</h3>
        <ul>
          <li>
            <b>Customer Focus:</b>
            <p>
              Our clients' satisfaction is our top priority. We strive to exceed expectations through dedicated service
              and personalized attention.
            </p>
          </li>
          <li>
            <b>Integrity:</b>
            <p>We operate with the highest ethical standards, ensuring transparency and honesty in all our dealings.</p>
          </li>
          <li>
            <b>Innovation:</b>
            <p>
              We embrace modern technology and innovative practices to enhance our services <br />and improve property
              management efficiency.
            </p>
          </li>
          <li>
            <b>Sustainability:</b>
            <p>
              We are committed to sustainable practices that promote <br />environmental responsibility and long-term property
              value.
            </p>
          </li>
          <br /><br /><br /><br /><br /><br /><br />
        </ul>
      </div>
    </div>
  );
};

export default About;

