import { Tab, Tabs, List } from "@mui/material";
import { useEffect, useState } from "react";
import { GetAllMessages, GetUnreadMessages } from "../API/Messages";
import MessageItem from "../Components/MessageItem";
import { useGlobalContext } from "../GlobalContext";



export default function Inbox(props){
    const [value, setValue] = useState(props.unread ? "1":"0");
    const [global,setGlobal] = useGlobalContext();
    const [emails, setEmails] = useState([]);

    useEffect(() => {
        setGlobal({...global, unread:false, updateEmails});
        updateEmails();
    }, [value]);

    const updateEmails = async () => {
        let response = value === "0" ? await GetAllMessages():await GetUnreadMessages();
        if (response && Array.isArray(response))
            setEmails(response);
    }

    const handleChange = (e,v) => {
        setValue(v);
    }
    return (
        <>
            <Tabs
                value={value}
                onChange={handleChange}
                sx={{backgroundColor:"#eeeeee", width: "100%"}}
            >
                <Tab value="0" label="All Mail"/>
                <Tab value="1" label="Unread" />
            </Tabs>
            <List
             sx={{ width: '100%', bgcolor: 'background.paper', height:"100%", overflowY:"scroll" }} >
                {emails.filter(e=>{
                    if (value == "1" && e.read) return false;
                    return true;
                }).map((e,i) => {
                    return <MessageItem key={i} email={e} />;
                })}
            </List>
        </>
    )
}