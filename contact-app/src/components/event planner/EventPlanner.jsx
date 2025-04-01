import React, { useState, useEffect } from "react";

import "./Eventplanner.css";
import TaskForm from "./components/TaskForm";
import TaskColumn from "./components/TaskColumn";
import todoIcon from "./assets/direct-hit.png";
import doingIcon from "./assets/calender.png";
import noIcon from "./assets/stop.png"
// import doneIcon from "./assets/check-mark-button.png";
import Navbar from "../Navbar/Navbar";
import Datepicker from "./components/Datepicker";

const oldTasks = localStorage.getItem("tasks");



const EventPlanner = () => {
  const [tasks, setTasks] = useState(JSON.parse(oldTasks) || []);
  const [ActiveCard,setActiveCard]=useState(null);
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDelete = (taskIndex) => {
    const newTasks = tasks.filter((task, index) => index !== taskIndex);
    setTasks(newTasks);
  };
  const onDrop = (status,position)=>{
    console.log(`${ActiveCard} is going to place into ${status} and at the position ${position}`);
    if(ActiveCard==null || ActiveCard === undefined) return;
    const taskToMove =tasks[ActiveCard];
    const updatedTasks=tasks.filter((task,index)=>index!== ActiveCard)
    updatedTasks.splice(position,0,{
      ...taskToMove,
      status:status
    })
    setTasks(updatedTasks)
  };
  const [selectedDate, setSelectedDate] = useState(null);
  const DateString = selectedDate
  ? selectedDate.toLocaleDateString("en-GB") // "DD/MM/YYYY" format
  : "None"; // Default if no date is selected

// Adding 1 day to selectedDate if it's not null
let date2 = selectedDate ? new Date(selectedDate) : null; // Clone selectedDate to avoid mutating the state
if (date2) {
  date2.setDate(date2.getDate() + 1); // Add 1 day
}
const DateString2 = date2
  ? date2.toLocaleDateString("en-GB") // "DD/MM/YYYY" format
  : "None"; // Default if no date2 is available

// Adding 2 days to selectedDate if it's not null
let date3 = selectedDate ? new Date(selectedDate) : null; // Clone selectedDate to avoid mutating the state
if (date3) {
  date3.setDate(date3.getDate() + 2); // Add 2 days
}
const DateString3 = date3
  ? date3.toLocaleDateString("en-GB") // "DD/MM/YYYY" format
  : "None"; // Default if no date3 is available
  return (
    <div className="app">
      <Navbar />
      <Datepicker setDate={setSelectedDate}/>
      <TaskForm setTasks={setTasks} />
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
    </div>
  );
};

export default EventPlanner;
