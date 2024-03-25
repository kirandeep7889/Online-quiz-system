import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <div className="left">
        <ul className="social-icons">
          <li><a href="#"><FontAwesomeIcon icon={faFacebook} /></a></li>
          <li><a href="#"><FontAwesomeIcon icon={faTwitter} /></a></li>
          <li><a href="#"><FontAwesomeIcon icon={faInstagram} /></a></li>
        </ul>
      </div>
      <div className="right">
        <div className="contact-info">
          <p>Email: kirandeep@gmail.com</p>
          <p>Phone: 7889313265</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
