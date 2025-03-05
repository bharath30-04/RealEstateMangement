import React from 'react';
import "./footer.css";

const footer = () => {
  return (
    <div className='footer'>
        
        <div className="container">
            <div className="contact-info">
                <p>Contact us at: bharath@realestatepro.com</p>
                <p>Phone: 8978379001</p>
            </div>
            <div className="social-media">
                <a href="#">Facebook</a>
                <a href="#">Twitter</a>
                <a href="#">Instagram</a>
            </div>
            <div className="footer-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
            </div>
            <div className="newsletter">
                <h3>Subscribe to Our Newsletter</h3>
                <input type="email" placeholder="Your email address" />
                <button>Subscribe</button>
            </div>
        </div>
    </div>
  )
}

export default footer;
