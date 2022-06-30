const sqlite = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite.Database(path.resolve(__dirname, "sqlite.db"), sqlite.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
    console.log("Connection successful!");
});

module.exports = db;