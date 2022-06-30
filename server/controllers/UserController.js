const UserModel = require("../models/UserModel");

async function login(req,res){
    let {email,password} = req.body;
    let result = await UserModel.login(email,password);    
    if (result){
        delete result.password;
        req.session.user = result;
        req.session.save();
        res.send(result);  
    }
    else res.send({error:"User doesn't exist!"});
}

async function register(req,res){
    let data = req.body;
    if (await UserModel.exists(data.email)){
        res.send({error:"User already exists!"});
        return;
    }
    UserModel.register(data);
    res.status(200).send({success:true});
}

function logout(req,res){
    req.session.user = null;
    req.session.save();
    res.status(200).send({success:true});
}

function loggedIn(req,res){
    res.send({logged_in: req.session.user != undefined, user: req.session.user});
}

module.exports = {login,register,logout,loggedIn};