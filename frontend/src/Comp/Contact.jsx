import React from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import "./css/Contact.css";

const Contact = () => {
  return (
    <div className="contact-page">
      <h2>Keep In Touch with Us</h2>

      <div className="contact-container">
        <div className="contact-form">
          <h3>Sent A Message</h3>

          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <input type="text" placeholder="Subject" />
          <textarea placeholder="Your Message"></textarea>

          <button>Send Message</button>
        </div>


<div className="contact-info">

  <div className="info-box">
    <div className="icon"><FaEnvelope /></div>
    <div>
      <p>contact@shofy.com</p>
      <span>Email us anytime</span>
    </div>
  </div>

  <div className="info-box">
    <div className="icon"><FaPhoneAlt /></div>
    <div>
      <p>+670 413 90 762</p>
      <span>Call us 24/7</span>
    </div>
  </div>

  <div className="info-box">
    <div className="icon"><FaMapMarkerAlt /></div>
    <div>
      <p>84 sleepy hollow st, jamaica</p>
      <span>New York 1432</span>
    </div>
  </div>

  <div className="social">
    <p>Find on social media</p>
    <div className="social-icons">
      <FaFacebookF />
      <FaTwitter />
      <FaLinkedinIn />
    </div>
  </div>

</div>
      </div>

      <div className="map">
        <iframe
          title="map"
          src="https://maps.google.com/maps?q=New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="400"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;