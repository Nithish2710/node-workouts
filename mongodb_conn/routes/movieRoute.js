const express = require('express');
const router = express.Router();
const Movie = require('../models/movie.js'); // <-- Import Mongoose model

const movies = [
  { id: 1, title: 'Inception' },
  { id: 2, title: 'The Matrix' },
];

// GET 
router.get('/getmovies', async (req, res) => {
  try {
    const movies = await Movie.find(); // Fetch all movies from MongoDB
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new movie
router.post('/addmovies', async (req, res) => {
  try {
    const movie = new Movie({ title: req.body.title });
    const savedMovie = await movie.save();
    res.status(201).json(savedMovie);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/test', async (req, res) => {
  try {
    const count = await Movie.countDocuments();
    res.send(`🎬 Total movies in DB: ${count}`);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;