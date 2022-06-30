const db = require("../database/Database");

function GetAllMessages(id){
    return new Promise ((resolve, reject) => {
        db.all(`select email,subject,first_name,last_name,messages.id as message_id,content,read from messages join users on messages.from_user = users.id where to_user = ? order by messages.id desc`,[id],(err,rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}
function GetAllUnreadMessages(id){
    return new Promise ((resolve, reject) => {
        db.all(`select email,subject,first_name,last_name,messages.id as message_id,content,read from messages join users on messages.from_user = users.id where read = false and to_user = ? order by messages.id desc`,[id],(err,rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}

function CountUnreadMessages(id){
    return new Promise ((resolve, reject) => {
        db.get(`select count(*) as amount from messages where read = false and to_user = ?`,[id],(err,row) => {
            if (err) return reject(err);
            resolve(row.amount);
        });
    });
}

function ReadMessage(id){
    db.run('update messages set read = true where id = ?', [id]);
}

function SendMessage(from,to,subject,content){
    db.run("insert into messages (from_user,to_user,subject,content,read) values (?,?,?,?,false)", [from,to,subject,content]);
}

function find(id){
    return new Promise ((resolve, reject) => {
        db.get(`select * from messages where id = ?`,[id],(err,row) => {
            if (err) return reject(err);
            resolve(row);
        });
    });
}

module.exports = {GetAllMessages,GetAllUnreadMessages,CountUnreadMessages,ReadMessage,SendMessage,find};