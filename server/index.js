// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection using environment variables
const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306, // Fallback to 3306 if DB_PORT is not defined
});

con.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    return;
  }
  console.log('Connected to MySQL');

  // Create table for form submissions
  con.query(
    `CREATE TABLE IF NOT EXISTS messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      author VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    (err, results) => {
      if (err) {
        console.error('Error creating table:', err.message);
        return;
      }
      console.error('Inserting data:', results);
      console.log('Table "messages" created or already exists');
    }
  );
});

// API Endpoint to handle form submissions
app.post('/api/messages', (req, res) => {
  const { title, author, content } = req.body;

  if (!title || !author || !content) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const query = 'INSERT INTO messages (title, author, content) VALUES (?, ?, ?)';
  con.query(query, [title, author, content], (err, results) => {
    if (err) {
      console.error('Error saving message:', err.message);
      return res.status(500).json({ error: 'Failed to save message' });
    }
    console.log('Insert result:', results);
    res.status(200).json({ message: 'Message saved successfully' });
  });
});

// Start the server
const PORT = 3307;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});