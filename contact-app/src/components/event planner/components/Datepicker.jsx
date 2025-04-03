import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "./Datepicker.css"

const Datepicker = ({setDate}) => {
  const [selectedDate,setSelectedDate]=useState(null);
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setDate(date); // Pass selected date to parent component
  };
  

  return (
    <div class="DP">
        <h4>Select Date of visit:</h4>
        <br />
        <DatePicker 
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
        />
    </div>
  )
}
export default Datepicker