const express = require('express');
const mongoose = require('mongoose');
const movieRoutes = require('./routes/movieRoute.js');

const app = express();

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Welcome to the Movie API');
});

// Replace with your MongoDB Atlas URI
const MONGO_URI = 'mongodb+srv://sainithish271002:nithishmongodb@cluster0.oyguvzd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
  app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
})
.catch(err => console.error('MongoDB connection failed:', err));

app.use('/route', movieRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
