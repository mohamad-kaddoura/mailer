import request from "./Fetch";

const Login = async (email,password) => {
    return await request("post", "user/login",{email,password});
}
const Register = async (email,first_name,last_name,password) => {
    return await request("post", "user/register",{email,first_name,last_name,password});
}
const Logout = async () => {
    return await request("post", "user/logout");
}

const LoggedIn = async () => {
    return await request("get", "user/logged_in");
}

export {Login,Register,Logout,LoggedIn}