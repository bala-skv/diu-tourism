import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
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

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
  };

  return (
    <div className="nagoa-page">
      <Navbar />
      <div className="slideshow-container">
        <button className="prev" onClick={prevSlide}>&#10094;</button>
        <div className="slideshow-wrapper" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {images.map((image, index) => (
            <img key={index} src={image} className="slide" alt={`Slide ${index + 1}`} />
          ))}
        </div>
        <button className="next" onClick={nextSlide}>&#10095;</button>
      </div>
      <h1>Nagoa Beach</h1>
      
      <div className="main">
        <div className="details">
          <p>Among the 5 beaches, Nagoa is the most beautiful and more popular...</p>
        </div>
        <div className="links">
          <ul>
            <li><Link to="/Places/Nagoa">Nagoa Beach</Link></li>
            <li><Link to="/Places/Ghoghla">Ghoghla Beach</Link></li>
            <li><Link to="/Places/Chakratirth">Chakratirth</Link></li>
            <li><Link to="/Places/Jallandhar">Jallandhar</Link></li>
            <li><Link to="/Places/Gomtimata">Gomtimata</Link></li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Nagoa;
