import React from 'react';
import './contact.css';


const ContactUs = () => {
  return (
    <div className="contact">
      <header>
        <h1>Contact Us</h1>
      </header>
    
      <section id="contact-form">
        <h2>Get in Touch</h2>
        <form action="submit_contact_form.php" method="post">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
          
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
          
          <label htmlFor="phone">Phone Number:</label>
          <input type="tel" id="phone" name="phone" required />
          
          <label htmlFor="subject">Subject:</label>
          <select id="subject" name="subject">
            <option value="property-inquiry">Property Inquiry</option>
            <option value="maintenance-request">Maintenance Request</option>
            <option value="general-question">General Question</option>
          </select>
          
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" required></textarea>
          
          <button type="submit">Submit</button>
        </form>
      </section>
      
      <section id="contact-info">
        <h2>Contact Information</h2>
        <p><strong>Phone:</strong> 9392257633</p>
        <p><strong>Email:</strong> homely@realestate.com</p>
        <p><strong>Address:</strong> Rk Valley, Kadapa, 516330</p>
        <p><strong>Hours:</strong> Mon-Fri, 9am-5pm</p>
      </section>
      
      <section id="map">
        <h2>Our Location</h2>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3089.7626289496987!2d78.5388371!3d14.3340494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDIwJzAyLjgiTiA3OMKwMzInMTMuNiJF!5e0!3m2!1sen!2sus!4v1600010000000!5m2!1sen!2sus" 
          width="600" 
          height="450" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy">
        </iframe>
      </section>
      
      <section id="social-media">
        <h2>Follow Us</h2>
        <a href="https://www.facebook.com/yourpage"><img src="http://localhost:5000/upload/facebook.svg" alt="Facebook" style={{ height: '40px', width: '40px' }} /></a>
        <a href="https://www.twitter.com/yourpage"><img src="http://localhost:5000/upload/twitter.svg" alt="Twitter" style={{ height: '40px', width: '40px' }} /></a>
        <a href="https://www.instagram.com/_.mr.maheee._1"><img src="http://localhost:5000/upload/instagram.svg" alt="Instagram" style={{ height: '40px', width: '40px' }} /></a>
      </section>
      
      <section id="faq">
        <h2>Frequently Asked Questions</h2>
        <p><strong>Question 1:</strong> How many properties are available at 563007.</p>
        <p><strong>Question 2:</strong> Is this page legal?</p>
      </section>
      
      <footer>
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ContactUs;

