const express = require('express');


const User = require('./models/userModel');
const userRoutes = require('./routes/userRoutes');
const mongoose = require('mongoose');
const app = express();
const port = 6003;


app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  next();
});
mongoose.connect('mongodb://localhost/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database!');
    app.listen(port, () => console.log(`Server listening on port ${port}`));
    loadData(); // Load data into database
  })
  .catch((err) => console.log(`Error connecting to database: ${err.message}`));

// Load data into database
const loadData = async () => {
  const users = require('./sample_data.json');
  try {
    await User.deleteMany({});
    const inserted = await User.insertMany(users);
    console.log(`Data imported successfully! ${inserted.length} documents inserted.`);
  } catch (err) {
    console.log(`Error while importing data: ${err.message}`);
  }
};






app.use('/api/users', userRoutes);

