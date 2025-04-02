import React, { useState, useEffect } from "react";
import "./Eventplanner.css";
import TaskForm from "./components/TaskForm";
import axios from "axios";
import TaskColumn from "./components/TaskColumn";
import todoIcon from "./assets/direct-hit.png";
import doingIcon from "./assets/calender.png";
import noIcon from "./assets/stop.png"
// import doneIcon from "./assets/check-mark-button.png";
import Navbar from "../Navbar/Navbar";
import Datepicker from "./components/Datepicker";

const EventPlanner = () => {
  const [tasks, setTasks] = useState([]);
  const [ActiveCard, setActiveCard] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get("http://localhost:5000/login/session", { withCredentials: true });
        if (response.data.loggedIn) {
          setUser(response.data.user);
          alert(user.date_of_trip);
        }
      } catch (error) {
        console.error("Session check failed:", error);
      }
    };

    checkSession(); // Call function on mount
  }, []); // Empty dependency array runs effect only on mount

  
  useEffect(() => {
    axios.get("http://localhost:5000/eventplan/")
      .then(response => {
        console.log("Fetched Data:", response.data);
        
        // Transform the data to match expected format
        const formattedTasks = (response.data || []).map(item => ({
          task: item.activity,
          status: item.column_name
        }));
  
        setTasks(formattedTasks);
      })
      .catch(error => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  const saveTasksToDatabase = async () => {
    if (!selectedDate) {
      alert("Please select a date before saving.");
      return; // Stop execution if no date is selected
    }
  
    try {
      const tasksToSave = tasks.map(task => ({
        activity: task.task,
        column_name: task.status
      }));
  
      console.log("Sending to server:", JSON.stringify(tasksToSave, null, 2));
  
      const response = await axios.post("http://localhost:5000/eventplan/save", { tasks: tasksToSave });
  
      if (response.data.success) {
        console.log("Tasks saved successfully!");
        alert("Changes saved!");
      } else {
        throw new Error("Failed to update tasks");
      }
    } catch (error) {
      console.error("Error saving tasks:", error);
      alert("Failed to save changes: " + (error.response?.data?.error || error.message));
    }
  };
  
  
  const handleDelete = (taskIndex) => {
    const newTasks = tasks.filter((task, index) => index !== taskIndex);
    setTasks(newTasks);
  };
 
  const onDrop = (status, position) => {
    console.log(`${ActiveCard} is going to place into ${status} and at the position ${position}`);
    if(ActiveCard == null || ActiveCard === undefined) return;
    const taskToMove = tasks[ActiveCard];
    const updatedTasks = tasks.filter((task, index) => index !== ActiveCard)
    updatedTasks.splice(position, 0, {
      ...taskToMove,
      status: status
    })
    setTasks(updatedTasks)
  };
  
  const [selectedDate, setSelectedDate] = useState(null);
  const DateString = selectedDate
    ? selectedDate.toLocaleDateString("en-GB")
    : "None";
    
  let date2 = selectedDate ? new Date(selectedDate) : null;
  if (date2) {
    date2.setDate(date2.getDate() + 1);
  }
  const DateString2 = date2
    ? date2.toLocaleDateString("en-GB")
    : "None";
    
  let date3 = selectedDate ? new Date(selectedDate) : null;
  if (date3) {
    date3.setDate(date3.getDate() + 2);
  }
  const DateString3 = date3
    ? date3.toLocaleDateString("en-GB")
    : "None";
    
  return (
    <div className="app">
      <Navbar />
      <Datepicker setDate={setSelectedDate}/>
      {/* <TaskForm setTasks={setTasks} /> */}
      <main className="app_main">
        <TaskColumn
          title="To Do"
          icon={todoIcon}
          tasks={tasks}
          status="todo"
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
          />
        <TaskColumn
          title={DateString}
          icon={doingIcon}
          tasks={tasks}
          status="day1"
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        />
        <TaskColumn
          title={DateString2}
          icon={doingIcon}
          tasks={tasks}
          status="day2"
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        />
        <TaskColumn
          title={DateString3}
          icon={doingIcon}
          tasks={tasks}
          status="day3"
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        />
        <TaskColumn
          title="Not Doing"
          icon={noIcon}
          tasks={tasks}
          status="Not Doing"
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        />
      </main>
      <div>index-{ActiveCard}</div>
      <button onClick={saveTasksToDatabase} className="save-btn save">
           Save Changes
      </button>
    </div>
  );
};

export default EventPlanner;