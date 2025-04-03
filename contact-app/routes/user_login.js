const express = require("express");
const cors = require("cors");
const router = express.Router();
const db = require("../db");

// ✅ User Login (Session-based)
router.post("/", (req, res) => {
  const { user_name, password } = req.body;
  if (!user_name || !password) {
    return res.status(400).json({ error: "user_name and password are required" });
  }

  const sql = "SELECT user_name, user_password,date_of_trip FROM users WHERE user_name = ? AND user_password = ?";
  db.query(sql, [user_name, password], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid user_name or password" });
    }

    // ✅ Store user details in session
    req.session.user = results[0];
    console.log(req.session.user);
    res.json({ message: "Login successful", user: req.session.user });
  });
});

// ✅ Check Login Status
router.get("/session", (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});

router.post("/update", (req, res) => {
  const { date_of_trip } = req.body;

  if (!req.session.user) {
    return res.status(401).json({ success: false, error: "User not logged in" });
  }

  const user_name = req.session.user.user_name;

  // ✅ Ensure date is saved without timezone issues
  const formattedDate = new Date(date_of_trip).toISOString().split("T")[0];

  const sql = "UPDATE users SET date_of_trip = ? WHERE user_name = ?";
  db.query(sql, [formattedDate, user_name], (err, result) => {
    if (err) return res.status(500).json({ success: false, error: err.message });

    // ✅ Update session to avoid mismatch after saving
    req.session.user.date_of_trip = formattedDate;

    res.json({ success: true, message: "Date updated successfully", updatedDate: formattedDate });
  });
});




// ✅ Logout Route
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: "Logout failed" });
    res.json({ message: "Logged out successfully" });
  });
});

module.exports = router;
