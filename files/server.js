const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Folder to store text files
const folderPath = path.join(__dirname, 'files');

// Ensure the folder exists
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
}

// API endpoint to create a text file with the current timestamp
app.get('/create-file', (req, res) => {
  const timestamp = new Date().toISOString();
  const filename = `${new Date().toISOString().replace(/[:.]/g, '-')}.txt`;
  const filePath = path.join(folderPath, filename);

  fs.writeFile(filePath, timestamp, (err) => {
    if (err) {
      return res.status(500).send('Error creating file');
    }
    res.send(`File created: ${filename}`);
  });
});

// API endpoint to retrieve all text files in the folder
app.get('/get-files', (req, res) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return res.status(500).send('Error reading files');
    }
    // Filter to only include .txt files
    const textFiles = files.filter(file => file.endsWith('.txt'));
    res.json(textFiles);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
