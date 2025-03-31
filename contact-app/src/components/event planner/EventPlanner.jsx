import React, { useState, useEffect } from "react";

import "./Eventplanner.css";
import TaskForm from "./components/TaskForm";
import TaskColumn from "./components/TaskColumn";
import todoIcon from "./assets/direct-hit.png";
import doingIcon from "./assets/glowing-star.png";
import doneIcon from "./assets/check-mark-button.png";

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

  return (
    <div className="app">
      <TaskForm setTasks={setTasks} />
      <main className="app_main">
        <TaskColumn
          title="To do"
          icon={todoIcon}
          tasks={tasks}
          status="todo"
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
          />
        <TaskColumn
          title="DAY 1"
          icon={doingIcon}
          tasks={tasks}
          status="day1"
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        />
        <TaskColumn
          title="DAY 2"
          icon={doingIcon}
          tasks={tasks}
          status="day2"
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        />
        <TaskColumn
          title="DAY 3"
          icon={doingIcon}
          tasks={tasks}
          status="day3"
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
