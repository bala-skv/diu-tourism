// const express = require("express");
// const router = express.Router();
// const db = require("../db");

// router.get("/feedback", (req, res) => {
//   db.query("SELECT * FROM nagoa_feedback", (err, result) => {
//     if (err) throw err;
//     res.json(result);
//   });
// });

// router.post("/feedback", (req, res) => {
//   const { feedback } = req.body;
//   const { user_name, user_id } = req.session.user;

//   if (req.session.user.LoggedIn === 'False') {
//     res.status(500).send("You have not logged in");
//   }
//   db.query("INSERT INTO nagoa_feedback (user_id, user_name, likes, dislikes, user_comment, d_ate) VALUES (?, 0, 0)", [feedback], (err, result) => {
//     if (err) throw err;
//     res.json({ userID: result.insertId, feedback, likes: 0, dislikes: 0 });
//   });
// });

// router.post("/feedback/:userID/like", (req, res) => {
//   db.query("UPDATE nagoa_feedback SET likes = likes + 1 WHERE user_ID = ?", [req.params.userID], (err) => {
//     if (err) throw err;
//     res.send("Liked");
//   });
// });

// router.post("/feedback/:userID/dislike", (req, res) => {
//   db.query("UPDATE nagoa_feedback SET dislikes = dislikes + 1 WHERE user_ID = ?", [req.params.userID], (err) => {
//     if (err) throw err;
//     res.send("Disliked");
//   });
// });

// router.get("/feedback/:userID/replies", (req, res) => {
//   const userID = req.params.userID.trim(); // Trim whitespace

//   if (!userID) {
//     return res.status(400).json({ error: "User ID is required" });
//   }

//   db.query("SELECT * FROM nagoa_replies WHERE user_id = ?", [userID], (err, result) => {
//     if (err) {
//       console.error("Database Error: ", err);
//       return res.status(500).json({ error: "Internal Server Error" });
//     }

//     if (result.length === 0) {
//       return res.status(404).json({ message: "No replies found for this user" });
//     }

//     res.json(result);
//   });
// });


// router.post("/feedback/:userID/reply", (req, res) => {
//   const { reply } = req.body;
//   db.query("INSERT INTO nagoa_replies (user_ID, replier_comment) VALUES (?, ?)", [req.params.userID, reply], (err) => {
//     if (err) throw err;
//     res.send("Reply added");
//   });
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const db = require("../db");

// ✅ Fetch all feedback for a specific place
router.get("/:placename/feedback", (req, res) => {
  const placename = req.params.placename;
  db.query(`SELECT * FROM ${placename}_feedback`, (err, result) => {
    if (err) {
      console.error("Database Error: ", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(result);
  });
});

// ✅ Post feedback for a specific place
router.post("/:placename/feedback", (req, res) => {
  const placename = req.params.placename;
  const { feedback } = req.body;

  if (!req.session.user) {
    return res.status(401).send("You have not logged in");
  }

  const { user_name, user_id } = req.session.user;

  db.query(
    `INSERT INTO ${placename}_feedback (user_id, user_name, likes, dislikes, user_comment, d_ate) VALUES (?, ?, 0, 0, ?, NOW())`,
    [user_id, user_name, feedback],
    (err, result) => {
      if (err) {
        console.error("Database Error: ", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.json({ userID: result.insertId, feedback, likes: 0, dislikes: 0 });
    }
  );
});

// ✅ Like a feedback for a specific place
router.post("/:placename/feedback/:userID/like", (req, res) => {
  const placename = req.params.placename;
  db.query(
    `UPDATE ${placename}_feedback SET likes = likes + 1 WHERE user_ID = ?`,
    [req.params.userID],
    (err) => {
      if (err) {
        console.error("Database Error: ", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.send("Liked");
    }
  );
});

// ✅ Dislike a feedback for a specific place
router.post("/:placename/feedback/:userID/dislike", (req, res) => {
  const placename = req.params.placename;
  db.query(
    `UPDATE ${placename}_feedback SET dislikes = dislikes + 1 WHERE user_ID = ?`,
    [req.params.userID],
    (err) => {
      if (err) {
        console.error("Database Error: ", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.send("Disliked");
    }
  );
});

// ✅ Get replies for a specific feedback
router.get("/:placename/feedback/:userID/replies", (req, res) => {
  const placename = req.params.placename;
  const userID = req.params.userID.trim(); // Trim whitespace

  if (!userID) {
    return res.status(400).json({ error: "User ID is required" });
  }

  db.query(
    `SELECT * FROM ${placename}_replies WHERE user_id = ?`,
    [userID],
    (err, result) => {
      if (err) {
        console.error("Database Error: ", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "No replies found for this user" });
      }

      res.json(result);
    }
  );
});

// ✅ Add a reply to a specific feedback
router.post("/:placename/feedback/:userID/reply", (req, res) => {
  const placename = req.params.placename;
  const { reply } = req.body;

  db.query(
    `INSERT INTO ${placename}_replies (user_ID, replier_comment) VALUES (?, ?)`,
    [req.params.userID, reply],
    (err) => {
      if (err) {
        console.error("Database Error: ", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.send("Reply added");
    }
  );
});

module.exports = router;
