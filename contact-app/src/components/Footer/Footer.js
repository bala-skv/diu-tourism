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
            <li><Link to="#home">Home</Link></li>
            <li><Link to="#attractions">Attractions</Link></li>
            <li><Link to="#hotes">Hotels</Link></li>
            <li><Link to="#contact">Contact</Link></li>
            <li><Link to="#faqs">Faqs</Link></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className="footer-section">
          <h2>Transport Details</h2>
          <ul>
            <li><Link to="/transport/buses">Local Buses</Link></li>
            <li><Link to="/transport/flights">Flight Details</Link></li>
            <li><Link to="/transport/rickshaws">Auto Rickshaws</Link></li>
          </ul>

          {/* <Maps/> */}

        </div>

        {/* Weather Section */}
        <div className="footer-section">
          <h2>Weather</h2>
          <Weather />
        </div>
      </div>
{/* 
      <div className="footer-bottom">
        &copy; 2025 Diu Tourism. All rights reserved.
      </div> */}
    </footer>
  );
};

export default Footer;
