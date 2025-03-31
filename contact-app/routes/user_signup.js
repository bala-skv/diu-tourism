const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
    const { user_name,user_id , user_password} = req.body;
    
    if (!user_name || !user_id || !user_password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const sql = 'INSERT INTO users (user_name, user_id, user_password) VALUES (?, ?, ?)';
    db.query(sql, [user_name, user_id, user_password], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'User added successfully', userId: result.insertId });
    });
});

module.exports = router;