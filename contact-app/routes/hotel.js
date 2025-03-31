const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    db.query('SELECT * FROM hotels', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});


router.post('/', (req, res) => {
    const { hotel_name, hotel_link, location, phone_number } = req.body;
    if (!hotel_name || !hotel_link || !location || !phone_number) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    db.query('INSERT INTO hotels (hotel_name, hotel_link, location, phone_number) VALUES (?, ?, ?, ?)',
        [hotel_name, hotel_link, location, phone_number],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Hotel added successfully', hotelId: result.insertId });
        });
});

module.exports = router;
