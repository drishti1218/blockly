const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

let vehicleData = JSON.parse(fs.readFileSync('vehicleData.json', 'utf8'));
let currentIndex = 0;

app.use(express.static('public'));

app.get('/api/vehicle-data', (req, res) => {
  const currentData = vehicleData[currentIndex];
  currentIndex = (currentIndex + 1) % vehicleData.length;
  res.json(currentData);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});