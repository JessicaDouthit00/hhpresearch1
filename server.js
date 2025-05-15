// server.js (PostgreSQL version)
const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
//const { Pool } = require('pg');
const app = express();
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;

app.post('/info', (req, res) => {
  const { name, email, comments } = req.body;
  const row = `"${name}","${email}","${comments || ''}"\n`;
  const filePath = path.join(__dirname, 'info_signups.csv');

  fs.appendFile(filePath, row, (err) => {
    if (err) {
      console.error('Error writing to CSV:', err);
      res.status(500).send('Something went wrong.');
    } else {
      res.send('<h2>Thanks! We will send you more information soon.</h2>');
    }
  });
});

// Route to handle participant signups
app.post('/participate', (req, res) => {
  const { name, email, phone, availability } = req.body;
  const row = `"${name}","${email}","${phone || ''}","${availability || ''}"\n`;
  const filePath = path.join(__dirname, 'participant_signups.csv');

  fs.appendFile(filePath, row, (err) => {
    if (err) {
      console.error('Error writing to CSV:', err);
      res.status(500).send('Something went wrong.');
    } else {
      res.send('<h2>Thank you for signing up! We\'ll be in touch.</h2>');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
