const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(bodyParser.json()); // Use the body-parser middleware to parse JSON data
app.use(cors()); // Enable CORS

// Array to store all the submitted responses
let responses = [];

app.get('/', (req, res) => {
  res.send('Server is up and running');
});

app.post('/api/save-data', (req, res) => {
  const jsonData = req.body; // JSON data sent from the client

  // Add the current response to the array
  responses.push(jsonData);

  // Save the array to a file
  fs.writeFile('responses.json', JSON.stringify(responses), (err) => {
    if (err) {
      console.error('Error writing file:', err);
      res.status(500).json({ error: 'Failed to save data' });
    } else {
      res.status(200).json({ message: 'Data received and saved successfully' });
    }
  });
});

const port = 3000; // Choose an appropriate port number
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
