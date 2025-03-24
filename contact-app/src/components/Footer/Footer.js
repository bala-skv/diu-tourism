import Weather from './Weather';
import { Link } from "react-router-dom"; // Import Link
import Maps from '../Places/Maps';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-section">
          <h2>About Diu</h2>
          <p>
            Discover the rich history, beautiful beaches, and vibrant culture of Diu.
            Plan your perfect getaway with us.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h2>Quick Links</h2>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#attractions">Attractions</a></li>
            <li><a href="#hotels">Hotels</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className="footer-section">
          <h2>Transport Details</h2>
          <ul>
            <li><Link to="/Buses">Local Buses</Link></li>
            <li><Link to="/Flight_det">Flight Details</Link></li>
            <li><Link to="/Auto">Auto Rickshaws</Link></li>
          </ul>

          {/* <Maps/> */}

        </div>

        {/* Weather Section */}
        <div className="footer-section">
          <h2>Weather</h2>
          <Weather />
        </div>
      </div>

      <div className="footer-bottom">
        &copy; 2025 Diu Tourism. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
