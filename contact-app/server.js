const express = require("express");
const cors = require("cors");
const path = require("path");
const session = require("express-session"); // ✅ Import session
require("dotenv").config();
const db = require("./routes/db"); // ✅ Import database connection

const app = express();

// ✅ Configure CORS properly
app.use(cors({
  origin: /^http:\/\/localhost:\d+$/, // Allow requests from any localhost port
  credentials: true // Allow sending cookies/session data
}));

app.use(express.json());

// ✅ Configure session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecuresecret", // Ensure a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 } // 1-day expiration
  })
);

// Importing route files
const admin = require("./routes/admin");
const flight = require("./routes/flight");
const hotel = require("./routes/hotel");
const localbus = require("./routes/localbus");
const statebus = require("./routes/statebus");
const restaurant = require("./routes/restaurant");
const feedback = require("./routes/feedback");
const user_login = require("./routes/user_login");
const user_signup = require("./routes/user_signup");

// ✅ Corrected Route Mappings
app.use("/login", user_login);
app.use("/signup", user_signup);
app.use("/flight", flight);
app.use("/hotel", hotel);
app.use("/localbus", localbus);
app.use("/restaurant", restaurant);
app.use("/statebus", statebus);
app.use("/admin", admin);
app.use("/msg", feedback); // ✅ Handles dynamic `placename` inside `feedback.js`

// ✅ Login Route (Set Session)
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username) {
    req.session.user = { username }; // Store user in session
    res.json({ success: true, message: "User logged in" });
  } else {
    res.status(400).json({ success: false, message: "Invalid credentials" });
  }
});

// ✅ Logout Route (Destroy Session)
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ success: false, message: "Logout failed" });
    res.json({ success: true, message: "Logged out successfully" });
  });
});

// ✅ Check Login Status
app.get("/session", (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});

// ✅ Serve React App (for Production)
app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
