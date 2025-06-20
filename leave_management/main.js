const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/leave_routes.js');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', routes); 
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/api`);
});

mongoose.connect('mongodb+srv://sainithish271002:nithishmongodb@cluster0.mongodb.net/leave_management?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connected to MongoDB Atlas');
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});
