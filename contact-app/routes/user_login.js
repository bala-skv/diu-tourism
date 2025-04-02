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

// ✅ Logout Route
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: "Logout failed" });
    res.json({ message: "Logged out successfully" });
  });
});

module.exports = router;
