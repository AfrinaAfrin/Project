import React from 'react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* About Section */}
        <div className="footer-section about">
          <h3>About Us</h3>
          <p>
            Welcome to the Library Management System! Our mission is to make reading more accessible and enjoyable for everyone. Explore our extensive catalog, stay informed with updates, and manage your library seamlessly.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#catalog">Catalog</a></li>
            <li><a href="#membership">Membership</a></li>
            <li><a href="#events">Events</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>

        {/* Latest News Section */}
        <div className="footer-section news">
          <h3>Latest News</h3>
          <ul>
            <li>📖 New books added this week: "AI Revolution", "React for Beginners".</li>
            <li>📅 Join us for a live author Q&A session on March 15th.</li>
            <li>🎉 Membership discounts available for students!</li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="footer-section social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="contact-info">
          <p>📍 Address: 123 Library Lane, Booktown, USA</p>
          <p>📞 Phone: +1 234-567-890</p>
          <p>✉️ Email: contact@librarysystem.com</p>
        </div>
        <button className="btn-top" onClick={scrollToTop}>Back to Top</button>
        <p>&copy; 2024 Library Management System. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
