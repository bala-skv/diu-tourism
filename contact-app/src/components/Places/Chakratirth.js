import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Feedback from './Feedback';
import './Nagoa.css';

const images = [
  '/assets/Nagoa.jpg',
  '/assets/n1.png',
  '/assets/n2.png',
  '/assets/n3.png',
  '/assets/n4.png',
  '/assets/n5.png',
  '/assets/chakratirth.jpg',
  '/assets/ghoghla.png'
];

const Nagoa = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const location = useLocation(); // Get current path

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="places-page-wrapper">
      <Navbar />
      <div className="slideshow-images">
        <div className="slideshow-container">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
              alt={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      <div className="places-links">
          <ul>
          <li>
            <Link to="/places/nagoa" className={location.pathname === "/places/chakratirth" ? "active-link" : ""}>
              Beaches
            </Link>
          </li>
          <li>
            <Link to="/places/DiuFort" className={location.pathname === "/places/DiuFort" ? "active-link" : ""}>
              Forts
            </Link>
          </li>
          <li>
            <Link to="/places/temples" className={location.pathname === "/places/temples" ? "active-link" : ""}>
              Temples
            </Link>
          </li>
          </ul>
      </div>

      <div className="places-links">
        <ul>
          <li>
            <Link to="/places/nagoa" className={location.pathname === "/places/nagoa" ? "active-link" : ""}>
              Nagoa Beach
            </Link>
          </li>
          <li>
            <Link to="/places/ghoghla" className={location.pathname === "/places/ghoghla" ? "active-link" : ""}>
              Ghoghla Beach
            </Link>
          </li>
          <li>
            <Link to="/places/chakratirth" className={location.pathname === "/places/chakratirth" ? "active-link" : ""}>
              Chakratirth
            </Link>
          </li>
          <li>
            <Link to="/places/jallandhar" className={location.pathname === "/places/jallandhar" ? "active-link" : ""}>
              Jallandhar
            </Link>
          </li>
          <li>
            <Link to="/places/gomtimata" className={location.pathname === "/places/gomtimata" ? "active-link" : ""}>
              Gomtimata
            </Link>
          </li>
        </ul>
      </div>

      <div className="places-details">
Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit nisi, provident mollitia, unde adipisci illo et amet beatae quam consequuntur a nostrum delectus doloribus ea ratione. Dicta eum veritatis perspiciatis iste, earum suscipit hic non provident et quam sint dolorum enim delectus nihil omnis tempore placeat repellat sed impedit ut quas. Accusantium sequi dicta nostrum expedita asperiores est quibusdam ipsa inventore aut nesciunt sunt amet labore adipisci voluptatum consectetur, iste, consequatur sint ullam? Consequuntur sunt amet voluptatibus rerum necessitatibus illo, ducimus quis nihil quod! Eum corporis suscipit ullam fuga iste ducimus eius temporibus recusandae laboriosam voluptatum. Delectus, cum at. Suscipit reprehenderit illo at laboriosam dolor eos nihil commodi vero velit obcaecati iusto ipsum est nesciunt molestias, facere tempore nemo dolore, officia consectetur ad libero architecto sit eaque. Adipisci laudantium suscipit ea tenetur libero rerum provident cupiditate quis ipsum? Exercitationem porro ab quos distinctio accusamus! Nisi inventore est perferendis doloremque culpa voluptatum repellat tempore in officia minima fuga excepturi deleniti tenetur eveniet ad ipsa, eaque, amet debitis ut ipsum, cupiditate natus unde vitae optio. Atque consequatur facilis magnam, aliquid ea molestias, ratione neque earum dicta molestiae laudantium perferendis quam deserunt necessitatibus maxime, error iusto sequi ullam nemo consequuntur exercitationem inventore eligendi.
      </div>
        <Feedback/>
      <Footer />
    </div>
  );
};

export default Nagoa;
