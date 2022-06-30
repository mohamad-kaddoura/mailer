import request from "./Fetch";

const CountUnreadMessages = async () => {
    return await request("get", "message/unread/count");
}

const GetUnreadMessages = async () => {
    return await request("get", "message/unread");
}

const GetAllMessages = async () => {
    return await request("get", "message/all");
}

const ReadMessage = async (id) => {
    return await request("post", "message/read", {id});
}

const SendMessage = async (email, subject, content) => {
    return await request("post", "message/send", {to: email, subject, content});
}

export {CountUnreadMessages,GetUnreadMessages,GetAllMessages,ReadMessage,SendMessage};