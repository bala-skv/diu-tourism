const express = require("express");
const router = express.Router();
const db = require("../db");

router.get('/', (req, res) => {
  db.query('SELECT * FROM event_plan_test', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.post("/save", (req, res) => {
  const { tasks } = req.body;
  
  console.log("Received tasks:", JSON.stringify(tasks, null, 2));
  
  if (!Array.isArray(tasks)) {
    return res.status(400).json({ success: false, error: "Invalid task format" });
  }
  
  const updateQuery = "UPDATE event_plan_test SET column_name = ? WHERE activity = ?";
  
  // Process each task sequentially
  const updatePromises = tasks.map(task => {
    return new Promise((resolve, reject) => {
      console.log(`Updating: ${task.activity} to ${task.column_name}`);
      db.query(updateQuery, [task.column_name, task.activity], (err, result) => {
        if (err) {
          console.error("Error updating task:", err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  });
  
  Promise.all(updatePromises)
    .then(() => {
      res.json({ success: true, message: "Tasks updated successfully" });
    })
    .catch(error => {
      console.error("Database update error:", error);
      res.status(500).json({ success: false, error: error.message });
    });
});

module.exports = router;