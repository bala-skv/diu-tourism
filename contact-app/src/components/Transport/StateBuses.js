import { useState, useEffect } from "react";
import "./LocalBuses.css";

const Feedback = () => {
  const [busData, setBusData] = useState([]);

  useEffect(() => {
    // Simulating fetching bus details from backend
    fetch("http://localhost:5000/api/buses") // Update this URL with actual API endpoint
      .then((response) => response.json())
      .then((data) => setBusData(data))
      .catch((error) => console.error("Error fetching bus details:", error));
  }, []);

  return (
    <div className="details-container">
      <h2>Bus Details</h2>
      {busData.length > 0 ? (
        <table className="details-table">
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Time</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {busData.map((bus, index) => (
              <tr key={index}>
                <td>{bus.from}</td>
                <td>{bus.to}</td>
                <td>{bus.time}</td>
                <td>{bus.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No bus details available.</p>
      )}
    </div>
  );
};

export default Feedback;
