const db = require("../database/Database");
const bcrypt = require("bcrypt");

function login(email,password){
    return new Promise((resolve,reject) => {
        db.get("select id,email,first_name,last_name,password from users where email = ?", [email], (err,row)=> {
            if (err) return reject(err.message);
            if (!row) return resolve(undefined);
            if (bcrypt.compareSync(password,row.password))
                return resolve(row);
            resolve(undefined);
        })
    })
    
}

function exists(email){
    return new Promise((resolve,reject) => {
        db.get("select email from users where email = ?", [email], (err,row) => {
            if (err) return reject(err.message);
            resolve(row?.email === email);
        });
    });
}

function find(email){
    return new Promise((resolve,reject) => {
        db.get("select * from users where email = ?", [email], (err,row) => {
            if (err) return reject(err.message);
            resolve(row);
        });
    });
}

function register({email,first_name,last_name,password}){
    return new Promise((resolve,reject) => {
        db.run("insert into users (email,first_name,last_name,password) values (?,?,?,?)", 
            [email,first_name,last_name,bcrypt.hashSync(password, 10)], (err,res) => {
                if (err) return reject(err.message);
                resolve(res);
            });
    });
}

module.exports = {login,exists,register,find};