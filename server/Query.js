const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./notes.db", (err) => {
  if (err) {
    console.error("Error opening database " + err.message);
  } else {
    // Correct SQL parameter binding
    const sql = `INSERT INTO notes (note, time) VALUES (?, ?)`;
    const params = ["I am making this website", Math.floor(Date.now() / 1000)];

    db.run(sql, params, (err) => {
      if (err) {
        console.error("Error inserting data " + err.message);
      } else {
        console.log("Data inserted successfully");
      }
    });
  }
});
