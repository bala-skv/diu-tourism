import { useState, useEffect } from "react";
import "./LocalBuses.css";
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const LocalBuses = () => {
  const [busData, setBusData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/localbus") // Update with actual API endpoint
      .then((response) => response.json())
      .then((data) => setBusData(data))
      .catch((error) => console.error("Error fetching bus details:", error));
  }, []);

  return (
    <div className="buses-page-wrapper">
      <Navbar />
      <div className="details-container">
        <h2>Local Buses Details</h2>
        {busData.length > 0 ? (
          <div className="table-wrapper">
            <table className="bus-table">
              <thead>
                <tr>
                  <th>From</th>
                  <th>To</th>
                  <th>Timing</th>
                  <th>Cost</th>
                </tr>
              </thead>
              <tbody>
                {busData.map((bus, index) => (
                  <tr key={index}>
                    <td>{bus.from_location}</td>
                    <td>{bus.to_location}</td>
                    <td>{bus.bus_time}</td>
                    <td>{bus.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="no-data">No bus details available.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default LocalBuses;
