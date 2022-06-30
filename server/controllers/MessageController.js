const MessageModel = require("../models/MessageModel");
const UserModel = require("../models/UserModel");

async function getAll(req,res){
    if (!req.session.user) {res.send({error:"Not logged in!"}); return;}
    let messages = await MessageModel.GetAllMessages(req.session.user.id);
    res.status(200).send(JSON.stringify(messages));
}

async function getUnread(req,res){
    if (!req.session.user) {res.send({error:"Not logged in!"}); return;}
    let messages = await MessageModel.GetAllUnreadMessages(req.session.user.id);
    res.status(200).send(JSON.stringify(messages));
}

async function countUnread(req,res){
    if (!req.session.user) {res.send({error:"Not logged in!"}); return;}
    let count = await MessageModel.CountUnreadMessages(req.session.user.id);
    res.status(200).send({count});
}

async function read(req,res){
    if (!req.session.user) {res.send({error:"Not logged in!"}); return;}
    let data = req.body;
    let message = await MessageModel.find(data.id);
    if (message.to_user !== req.session.user.id) {res.send({error:"Not your message to read!"}); return;}
    MessageModel.ReadMessage(data.id);
    res.status(200).send({success:true});
}

async function send(req,res){
    if (!req.session.user) {res.send({error:"Not logged in!"}); return;}
    let data = req.body;
    let user = await UserModel.find(data.to);
    if (!user) { res.send({error:"Recipient not found!"}); return;}
    MessageModel.SendMessage(req.session.user.id,user.id,data.subject,data.content);
    res.status(200).send({success:true});
}

module.exports = {getAll,getUnread,countUnread,read,send};