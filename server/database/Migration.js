const sqlite = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");
const db_path = path.resolve(__dirname,"sqlite.db");

fs.writeFileSync(db_path,"");

const db = new sqlite.Database(db_path, sqlite.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
    console.log("Connection successful!");
})

const sql1 = `CREATE TABLE users(id integer primary key,email,first_name,last_name,password)`;

const sql2 = `CREATE TABLE messages(id integer primary key,from_user,to_user,subject,content,read, 
	CONSTRAINT fk_from
    FOREIGN KEY (from_user)
    REFERENCES users(id),
	CONSTRAINT fk_to
    FOREIGN KEY (to_user)
    REFERENCES users(id))`;

(async function() {
    db.run(sql1);
    db.run(sql2);
    db.close();
})();