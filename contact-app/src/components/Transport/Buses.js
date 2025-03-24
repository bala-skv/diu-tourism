import React from 'react'
import { Link } from "react-router-dom"; // Import Link
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './Buses.css';



const Buses = () => {
  return (
    <div>
      <Navbar/>
      <div className="busDetails">
        <table>
            <th>
                <tr>
                    <td>From</td>
                    <td>To</td>
                    <td>Timing</td>
                </tr>
            </th>
            <tbody>
              <tr>
                <td>Diu</td>
                <td>Vanakbara(via Village)</td>
                <td>6:30 AM</td>
              </tr>
              <tr>
                <td>Vanakbara(via Village)</td>
                <td>Diu</td>
                <td>6:30 AM</td>
              </tr>
              <tr>
                <td>Vanakbara(via Village)</td>
                <td>Diu</td>
                <td>6:30 AM</td>
              </tr>
              <tr>
                <td>Vanakbara(via Village)</td>
                <td>Diu</td>
                <td>6:30 AM</td>
              </tr>
            </tbody>
       
        </table>
      </div>
      <Footer/>
    </div>
  )
}

export default Buses

