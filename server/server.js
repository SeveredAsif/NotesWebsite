const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 4000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors()); // Enable CORS

// Connect to the SQLite database
const db = new sqlite3.Database("./notes.db", (err) => {
  if (err) {
    console.error("Error connecting to database: " + err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

// Example route to get all users
app.get("/notes", (req, res) => {
  const sql = "SELECT * FROM notes";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// Example route to add a user
app.post("/notes", (req, res) => {
  const { note } = req.body;
  const sql = "INSERT INTO notes (note, time) VALUES (?, ?)";
  const params = [note, Math.floor(Date.now() / 1000)];
  db.run(sql, params, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: { id: this.lastID },
    });
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running on port ${port}!`);
});
