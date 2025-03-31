const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/', (req, res) => {
    db.query('SELECT * FROM local_buses', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});


router.post('/', (req, res) => {
    const { from_location, to_location, bus_time, travels, cost } = req.body;
    if (!from_location || !to_location || !bus_time || !travels || !cost) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    db.query('INSERT INTO local_buses (from_location, to_location, bus_time, travels, cost) VALUES (?, ?, ?, ?, ?)',
        [from_location, to_location, bus_time, travels, cost],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Local bus added successfully', busId: result.insertId });
        });
});

module.exports = router;
