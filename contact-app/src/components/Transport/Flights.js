import { useState, useEffect } from "react";
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import "./Flights.css";

const LocalBuses = () => {
  const [flightData, setFlightData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/flight") // Update with actual API endpoint
      .then((response) => response.json())
      .then((data) => setFlightData(data))
      .catch((error) => console.error("Error fetching flight details:", error));
  }, []);

  return (
    <div className="flights-page-wrapper">
      <Navbar />
      <div className="details-container">
        <h2>Flight Details</h2>
        {flightData.length > 0 ? (
          <div className="table-wrapper">
            <table className="flight-table">
              <thead>
                {/* <tr>
                  <th>Company Name</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Timing</th>
                </tr> */}
              </thead>
              <tbody>
                {flightData.map((flight, index) => (
                  <tr key={index}>
                    <tr>
                      <td rowSpan={2}><img src="/assets/plane.png" alt="" /></td>
                      <tr>
                        <td>
                          <tr>
                            <td><p>Service Provider:</p></td>
                            <td>{flight.flight_name}</td>
                          </tr>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <tr>
                            <td><p>From:</p></td>
                            <td>{flight.from_location}</td>
                            <td><p>To:</p></td>
                            <td>{flight.to_location}</td>
                            <td><p>Timing:</p></td>
                            <td>{flight.flight_time}</td>
                          </tr>
                        </td>
                      </tr>
                    </tr>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="no-data">No flight details available.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default LocalBuses;
