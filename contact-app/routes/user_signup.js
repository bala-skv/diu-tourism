const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
    const { user_name, user_id, user_password } = req.body;
    
    if (!user_name || !user_id || !user_password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Insert user into `users` table
    const sql = 'INSERT INTO users (user_name, user_id, user_password) VALUES (?, ?, ?)';
    db.query(sql, [user_name, user_id, user_password], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Create a new event plan table for the user
        const tableName = `event_plan_${user_name}`; // Dynamically setting table name
        const sql2 = `CREATE TABLE \`${tableName}\` (
                        activity VARCHAR(20),
                        column_name VARCHAR(20)
                      )`;

        db.query(sql2, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            // Insert default rows into the new table
            const insertQuery = `INSERT INTO \`${tableName}\` (activity, column_name) VALUES 
                                ('Nagoa', 'todo'), 
                                ('ghogla', 'todo'), 
                                ('diu fort', 'todo')`;

            db.query(insertQuery, (err, result) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                res.status(201).json({ message: 'User and event table created successfully with default activities', userId: result.insertId });
            });
        });
    });
});

module.exports = router;
