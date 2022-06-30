import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CountUnreadMessages } from "../API/Messages";
import { useGlobalContext } from "../GlobalContext";

export default function Home(){
    const [value,setValue] = useGlobalContext();
    const [count,setCount] = useState(0);
    useEffect(()=>{
        (async()=>{
            let response = await CountUnreadMessages();
            if (response && response.count)
                setCount(response.count);
        })();
    },[]);

    const handleClick = () =>{
        setValue({...value,page:"1", unread:true});
    }
    return (
    <>
        <div style={{padding:"8em", zIndex: 110}}>
            <Typography variant="h2">Welcome</Typography>
            <Typography variant="h3">{`${value.user.first_name} ${value.user.last_name}`}</Typography>
            <br />
            <Button onClick={handleClick} variant="text">You have {count} new messages!</Button>
        </div>
    </>
    
    )
} 