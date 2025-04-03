const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "User not logged in" });
  }
  const tableName = `event_plan_${req.session.user.user_name}`;
  const sql = `SELECT * FROM ${tableName}`;
  
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});


// Save tasks (ONLY tasks, NOT date)
router.post("/save", (req, res) => {
  const { tasks } = req.body;

  console.log("Received tasks:", JSON.stringify(tasks, null, 2));

  if (!Array.isArray(tasks)) {
    return res.status(400).json({ success: false, error: "Invalid task format" });
  }

  const tableName = `event_plan_${req.session.user.user_name}`;
  const updateTaskQuery = `UPDATE ${tableName} SET column_name = ? WHERE activity = ?`;


  // Update tasks
  const updatePromises = tasks.map(task => {
    return new Promise((resolve, reject) => {
      console.log(`Updating: ${task.activity} to ${task.column_name}`);
      db.query(updateTaskQuery, [task.column_name, task.activity], (err, result) => {
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
