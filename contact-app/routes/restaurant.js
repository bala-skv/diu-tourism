const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    db.query('SELECT * FROM restaurants', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});


router.post('/', (req, res) => {
    const { name, phone_number, location, cuisine } = req.body;
    if (!name || !phone_number || !location || !cuisine) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    db.query('INSERT INTO restaurants (name, phone_number, location, cuisine) VALUES (?, ?, ?, ?)',
        [name, phone_number, location, cuisine],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Restaurant added successfully', restaurantId: result.insertId });
        });
});

module.exports = router;
