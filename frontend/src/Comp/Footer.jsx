import React from "react";
import "./css/Footer.css";
const Footer = () => {
  return (
    <div className="footer-section">
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-3 col-md-6">
            <img
              src="https://shofy-client.vercel.app/_next/static/media/logo.414c93a2.svg"
              alt="logo"
              height="35"
            />
            <h6 className="mt-4 fs-5">
              We are a team of designers and developers that create high quality
              WordPress
            </h6>
            <div className="social-icons">
              <a href="https://www.facebook.com/">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://x.com/">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://www.linkedin.com/feed/">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://vimeo.com/">
                <i className="fab fa-vimeo-v"></i>
              </a>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <h4 className="mb-3">My Account</h4>
            <ul className="mb-2 ms-1">
              <li className="mb-2">Track Orders</li>
              <li className="mb-2">Shipping</li>
              <li className="mb-2">Wishlist</li>
              <li className="mb-2">My Account</li>
              <li className="mb-2">Order History</li>
              <li className="mb-2">Returns</li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6">
            <h4 className="mb-3 ">Information</h4>
            <ul className="mb-2 ms-1">
              <li className="mb-2">Our Story</li>
              <li className="mb-2">Careers</li>
              <li className="mb-2">Privacy Policy</li>
              <li className="mb-2">Terms & Conditions</li>
              <li className="mb-2">Latest News</li>
              <li className="mb-2">Contact Us</li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6">
            <h4 className="mb-4">Talk To Us</h4>

            <p className="footer-text">Got Questions? Call us</p>

            <h5 className="contact-link">
              <a href="tel:+67041390762">+670 413 90 762</a>
            </h5>

            <p className="contact-link">
              <a href="mailto:shofy@support.com">shofy@support.com</a>
            </p>

            <p className="contact-link">
              79 Sleepy Hollow St <br />
              Jamaica, New York 1432
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="row align-items-center">
            <div className="col-md-6 mt-3">
              <p className="p-link">
                © 2026 All Rights Reserved | Template by ThemePure
              </p>
            </div>
            <div className="col-md-6 text-md-end payment-icons mt-3">
              <img
                src="https://shofy-client.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-pay.d72dda14.png&w=640&q=75"
                alt=""
              />
            </div>
            <div className="col-md-2 text-end">
              <div
                className="back-to-top"
                onClick={() =>
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  })
                }
              >
                <i className="fas fa-arrow-up"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
