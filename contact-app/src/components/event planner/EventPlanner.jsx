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
          console.log("User logged in:", response.data.user);
  
          // ✅ Convert date to local timezone correctly
          if (response.data.user.date_of_trip) {
            const localDate = new Date(response.data.user.date_of_trip ); // Force local time
            setSelectedDate(localDate);
          }
        }
      } catch (error) {
        console.error("Session check failed:", error);
      }
    };
  
    checkSession();
  }, []);
  
  

  
  useEffect(() => {
    axios.get("http://localhost:5000/eventplan/", { withCredentials: true })
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

  // 
  const saveTasksToDatabase = async () => {
  try {
    const tasksToSave = tasks.map(task => ({
      activity: task.task,
      column_name: task.status
    }));
    const adjustedDate = new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000);
    const dateToSave = adjustedDate.toISOString().split("T")[0];
    console.log("hello",dateToSave);
    console.log("Saving tasks:", JSON.stringify(tasksToSave, null, 2));
    console.log("Saving date:", dateToSave);

    // ✅ Save tasks
    const taskResponse = await axios.post("http://localhost:5000/eventplan/save", { tasks: tasksToSave }, { withCredentials: true });


    if (!taskResponse.data.success) throw new Error("Failed to update tasks");

    // ✅ Save date
    const dateResponse = await axios.post("http://localhost:5000/login/update", { date_of_trip: dateToSave }, { withCredentials: true });

    if (!dateResponse.data.success) throw new Error("Failed to update date");

    alert("Tasks and date saved successfully!"); // 🛠 Alert should now work

  } catch (error) {
    console.error("Error saving tasks or date:", error);
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

// Ensure selectedDate is correctly formatted
const DateString = selectedDate
  ? new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000).toLocaleDateString("en-GB")
  : "None";

// Function to adjust for UTC correctly
const getAdjustedDate = (baseDate, offset) => {
  if (!baseDate) return null;
  const newDate = new Date(baseDate.getTime() - baseDate.getTimezoneOffset() * 60000); // Adjust to local time
  newDate.setDate(newDate.getDate() + offset); // Now apply offset
  return newDate.toLocaleDateString("en-GB");
};

const DateString2 = getAdjustedDate(selectedDate, 1) || "None";
const DateString3 = getAdjustedDate(selectedDate, 2) || "None";

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
          title={DateString }
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